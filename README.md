# Agragami Convent School site

React + Vite website with a small Node, Express and MongoDB backend.
One admin can log in at `/admin` and change the content.

## Run on your laptop

You need two terminals.

```bash
# 1. backend
cd server
cp .env.example .env      # then open .env and fill it in
npm install
npm run dev               # http://localhost:5000

# 2. website
npm install
npm run dev               # http://localhost:5173
```

Open `http://localhost:5173/admin` and log in with the `ADMIN_EMAIL` and
`ADMIN_PASSWORD` from `server/.env`.

If `MONGODB_URI` is empty, the server keeps data in `server/data/db.json`,
so you do not need MongoDB installed while developing.

## How the content works

- The website has built-in content in `src/data/site.js` and `src/data/pages.js`.
- When the admin saves a section, only that section is stored in the database.
- The website loads the stored sections and shows them in place of the built-in ones.
- "Reset to original" in the admin panel deletes the stored section again.
- If the server is down, the website still shows the built-in content.

## Where things are

- `src/content.jsx` : loads content and gives it to every component (`useContent()`)
- `src/admin/` : the admin panel. `schemas.js` lists what can be edited and with which fields
- `src/pages/`, `src/components/` : the public website
- `src/styles.css` : public styles, theme colors are at the top in `:root`
- `server/src/index.js` : login, content API, file uploads
- `server/src/store.js` : MongoDB storage, and the JSON file storage for development

## Putting it online

Build the website, then start the server. The server also serves the built
website, so everything runs on one address.

```bash
npm install && npm run build
cd server && npm install && npm start
```

On the host, set these (see `server/.env.example`): `MONGODB_URI`, `JWT_SECRET`,
`ADMIN_EMAIL`, `ADMIN_PASSWORD`.

Things the host must have:

- Node.js 18 or newer. Plain shared hosting made for PHP or WordPress usually cannot run this.
- A disk that keeps files. Uploaded PDFs and photos are saved in `server/uploads/`.
  On hosts that wipe the disk on every restart, uploads would be lost.
- Back up the MongoDB database and the `server/uploads/` folder regularly.

If the website and the server have to live on different addresses, build the
website with `VITE_API_URL=https://api.example.com npm run build`, and set
`CLIENT_ORIGIN` and `PUBLIC_URL` on the server.

## Still to do

- Add text for the empty pages (from the admin panel, or in `src/data/pages.js`)
- Save the school logo as `public/images/logo.png`, or upload it under School details
- Upload the PDFs for notices, downloads and certificates
- Add gallery photos and the Google Maps embed in `src/pages/Contact.jsx`
- Colors: for the old blue look, set `data-theme="blue"` on the `<html>` tag in `index.html`
