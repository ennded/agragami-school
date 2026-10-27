import "dotenv/config";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import cors from "cors";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import jwt from "jsonwebtoken";
import multer from "multer";
import { createStore } from "./store.js";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const uploadsDir = path.join(root, "uploads");
const clientDist = path.join(root, "..", "dist");

const {
  PORT = 5000,
  MONGODB_URI = "",
  JWT_SECRET,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  CLIENT_ORIGIN = "",
  PUBLIC_URL = "",
  CLOUDINARY_CLOUD_NAME = "",
  CLOUDINARY_API_KEY = "",
  CLOUDINARY_API_SECRET = "",
} = process.env;

// Uploaded files go to Cloudinary when it's configured, so they survive
// redeploys (the host's local disk is wiped on every deploy). Without it,
// files are kept on local disk — handy for development, but on a host with
// a wiped disk, uploaded files will disappear the next time the app deploys.
const useCloudinary = Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_API_KEY && CLOUDINARY_API_SECRET);
if (useCloudinary) {
  cloudinary.config({
    cloud_name: CLOUDINARY_CLOUD_NAME,
    api_key: CLOUDINARY_API_KEY,
    api_secret: CLOUDINARY_API_SECRET,
  });
}

if (!JWT_SECRET || JWT_SECRET.startsWith("change-me") || JWT_SECRET.length < 16) {
  console.error("Set JWT_SECRET in server/.env to a long random text (16+ characters).");
  process.exit(1);
}

// Everything below needs to finish setting up before the server can accept
// requests, but it has to run inside a function rather than with top-level
// await — some hosts (e.g. Hostinger's Node.js app runner) load this file
// with require(), and Node refuses to require() an ESM file that uses
// top-level await.
main().catch((err) => {
  console.error(err);
  process.exit(1);
});

async function main() {
  const store = await createStore({
    mongoUri: MONGODB_URI,
    dataFile: path.join(root, "data", "db.json"),
  });
  console.log(`Data is stored in: ${store.kind}`);

  // Create the single admin account on first start.
  if (!(await store.getAdmin())) {
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD || ADMIN_PASSWORD.length < 8) {
      console.error("Set ADMIN_EMAIL and ADMIN_PASSWORD (8+ characters) in server/.env.");
      process.exit(1);
    }
    await store.saveAdmin({
      email: ADMIN_EMAIL.toLowerCase().trim(),
      passwordHash: await bcrypt.hash(ADMIN_PASSWORD, 12),
    });
    console.log(`Admin account created for ${ADMIN_EMAIL}`);
  }

  fs.mkdirSync(uploadsDir, { recursive: true });

  const app = express();
  app.set("trust proxy", 1);
  app.use(
    helmet({
      contentSecurityPolicy: false, // the site loads Google Fonts
      crossOriginResourcePolicy: { policy: "cross-origin" }, // uploads are shown on the website
    })
  );
  if (CLIENT_ORIGIN) app.use(cors({ origin: CLIENT_ORIGIN.split(",").map((s) => s.trim()) }));
  app.use(express.json({ limit: "1mb" }));

  // ---------- login ----------
  function requireAuth(req, res, next) {
    const token = (req.headers.authorization || "").replace(/^Bearer /, "");
    try {
      req.admin = jwt.verify(token, JWT_SECRET);
      next();
    } catch {
      res.status(401).json({ error: "Please log in again." });
    }
  }

  const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    message: { error: "Too many login attempts. Try again in 15 minutes." },
  });

  app.post("/api/auth/login", loginLimiter, async (req, res) => {
    const { email = "", password = "" } = req.body || {};
    const admin = await store.getAdmin();
    const ok =
      admin &&
      String(email).toLowerCase().trim() === admin.email &&
      (await bcrypt.compare(String(password), admin.passwordHash));
    if (!ok) return res.status(401).json({ error: "Wrong email or password." });
    const token = jwt.sign({ email: admin.email }, JWT_SECRET, { expiresIn: "12h" });
    res.json({ token, email: admin.email });
  });

  app.get("/api/auth/me", requireAuth, (req, res) => res.json({ email: req.admin.email }));

  app.post("/api/auth/password", requireAuth, async (req, res) => {
    const { current = "", next = "" } = req.body || {};
    const admin = await store.getAdmin();
    if (!(await bcrypt.compare(String(current), admin.passwordHash))) {
      return res.status(400).json({ error: "The current password is wrong." });
    }
    if (String(next).length < 8) {
      return res.status(400).json({ error: "The new password needs at least 8 characters." });
    }
    await store.saveAdmin({ email: admin.email, passwordHash: await bcrypt.hash(String(next), 12) });
    res.json({ ok: true });
  });

  // ---------- content ----------
  // Only content the admin has changed is stored. The website has its own
  // built-in default text and uses it for anything that is not stored here.
  const KEY_PATTERN = /^[a-zA-Z][a-zA-Z0-9]*(:[a-z0-9-]+)?$/;

  app.get("/api/content", async (req, res) => {
    res.set("Cache-Control", "no-store");
    res.json({ content: await store.getAllContent() });
  });

  app.put("/api/content/:key", requireAuth, async (req, res) => {
    const { key } = req.params;
    if (!KEY_PATTERN.test(key) || key.length > 80) {
      return res.status(400).json({ error: "Unknown content section." });
    }
    if (!req.body || req.body.data === undefined) {
      return res.status(400).json({ error: "Nothing to save." });
    }
    await store.setContent(key, req.body.data);
    res.json({ ok: true });
  });

  // "Reset to original" in the admin panel removes the stored change.
  app.delete("/api/content/:key", requireAuth, async (req, res) => {
    await store.deleteContent(req.params.key);
    res.json({ ok: true });
  });

  // ---------- file uploads (PDFs and photos) ----------
  const ALLOWED = {
    "application/pdf": ".pdf",
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/webp": ".webp",
  };

  const upload = multer({
    storage: useCloudinary
      ? multer.memoryStorage()
      : multer.diskStorage({
          destination: uploadsDir,
          // a random name, so an uploaded file can never replace another file
          filename: (req, file, cb) =>
            cb(null, crypto.randomBytes(12).toString("hex") + ALLOWED[file.mimetype]),
        }),
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => cb(null, Boolean(ALLOWED[file.mimetype])),
  });

  app.post("/api/upload", requireAuth, (req, res) => {
    upload.single("file")(req, res, async (err) => {
      if (err) {
        const tooBig = err.code === "LIMIT_FILE_SIZE";
        return res.status(400).json({ error: tooBig ? "The file is larger than 10 MB." : "Upload failed." });
      }
      if (!req.file) {
        return res.status(400).json({ error: "Only PDF, JPG, PNG and WEBP files are allowed." });
      }

      if (useCloudinary) {
        try {
          const isPdf = req.file.mimetype === "application/pdf";
          const uploaded = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { resource_type: isPdf ? "raw" : "image", folder: "agragami" },
              (uploadErr, result) => (uploadErr ? reject(uploadErr) : resolve(result))
            );
            stream.end(req.file.buffer);
          });
          return res.json({ url: uploaded.secure_url });
        } catch (uploadErr) {
          console.error(uploadErr);
          return res.status(500).json({ error: "Upload failed." });
        }
      }

      res.json({ url: `${PUBLIC_URL.replace(/\/$/, "")}/uploads/${req.file.filename}` });
    });
  });

  app.use("/uploads", express.static(uploadsDir, { maxAge: "30d", index: false }));

  // ---------- the website itself ----------
  // If the built website (the "dist" folder) is next to the server, serve it too,
  // so the website, the admin panel and the API all run on one address.
  if (fs.existsSync(path.join(clientDist, "index.html"))) {
    app.use(express.static(clientDist));
    app.get(/^\/(?!api\/|uploads\/).*/, (req, res) => res.sendFile(path.join(clientDist, "index.html")));
    console.log("Serving the website from ../dist");
  }

  app.use("/api", (req, res) => res.status(404).json({ error: "Not found." }));
  app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.type === "entity.too.large" ? 413 : 500).json({
      error: err.type === "entity.too.large" ? "That is too much content for one section." : "Something went wrong on the server.",
    });
  });

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}
