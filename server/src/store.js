// Where data is kept. Two options with the same functions:
//   - MongoDB (when MONGODB_URI is set), for the real site
//   - a JSON file in server/data/db.json, for working on your own laptop
import fs from "node:fs/promises";
import path from "node:path";
import mongoose from "mongoose";

async function mongoStore(uri) {
  await mongoose.connect(uri);

  const Admin = mongoose.model(
    "Admin",
    new mongoose.Schema({ email: { type: String, unique: true }, passwordHash: String })
  );
  const Content = mongoose.model(
    "Content",
    new mongoose.Schema(
      { key: { type: String, unique: true }, data: mongoose.Schema.Types.Mixed },
      { timestamps: true, minimize: false }
    )
  );

  return {
    kind: "MongoDB",
    async getAdmin() {
      return Admin.findOne().lean();
    },
    async saveAdmin({ email, passwordHash }) {
      await Admin.findOneAndUpdate({}, { email, passwordHash }, { upsert: true });
    },
    async getAllContent() {
      const docs = await Content.find().lean();
      return Object.fromEntries(docs.map((d) => [d.key, d.data]));
    },
    async setContent(key, data) {
      await Content.findOneAndUpdate({ key }, { data }, { upsert: true });
    },
    async deleteContent(key) {
      await Content.deleteOne({ key });
    },
  };
}

async function fileStore(file) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  let db = { admin: null, content: {} };
  try {
    db = JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    // first run, the file does not exist yet
  }
  // write to a temp file first so a crash cannot leave a half-written file
  const save = async () => {
    await fs.writeFile(file + ".tmp", JSON.stringify(db, null, 2));
    await fs.rename(file + ".tmp", file);
  };

  return {
    kind: "JSON file",
    async getAdmin() {
      return db.admin;
    },
    async saveAdmin(admin) {
      db.admin = admin;
      await save();
    },
    async getAllContent() {
      return db.content;
    },
    async setContent(key, data) {
      db.content[key] = data;
      await save();
    },
    async deleteContent(key) {
      delete db.content[key];
      await save();
    },
  };
}

export function createStore({ mongoUri, dataFile }) {
  return mongoUri ? mongoStore(mongoUri) : fileStore(dataFile);
}
