# MCS · UILS prototype portal

A lightweight, responsive prototype for the 32 member Moot Court Society, University Institute of Legal Studies, Panjab University. It is intentionally static. There are no student accounts, databases, payments, or confidential records.

## Run locally

```bash
npm install
npm run dev
```

## Edit content

- `src/data/notices.json` - notices and important updates
- `src/data/committee.json` - faculty and student committee roster
- `src/data/siteData.js` - competitions, event archive, guests, resources, training modules, and source links
- `public/assets/` - supplied MCS, UILS, and Panjab University logos

Every non-official item should retain a `Prototype` or `Demo` label. Official UILS/MCS notifications always prevail.

## Published archive media

Event photographs for the Satish Chander Narang competition and Lex Novus are reproduced from the linked SCC Times event reports. Arguendo visuals are reproduced from the linked public competition announcements. Each use links back to its source and should be reviewed for continued permission before an official launch.

## Deploy on Vercel

Import this folder into Vercel. The included `vercel.json` handles single-page routes; the default Vite build command (`npm run build`) and output directory (`dist`) are sufficient.
