# MitraAssist Portal - Demo

A clickable prototype of the MitraAssist Service Certificate Portal.
Built with Next.js 14, React, Tailwind CSS, and Lucid React.

## What's inside

- **Login screen** — toggle between Admin and Dealer/Agent
- **Admin panel** — dashboard, certificates table, users, pricing rules
- **Dealer panel** — "my certificates" view + new certificate wizard
- **Certificate preview** — styled to match the real MitraAssist PDF

> All data is in-memory only. Refreshing the page resets everything.
> This is a UI prototype, not a production system.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel (5 minutes)

1. Push this folder to a new GitHub repo
2. Go to [vercel.com](https://vercel.com), sign in with GitHub
3. Click **Add New Project**, import the repo
4. Click **Deploy** — defaults are fine
5. Vercel gives you a URL like `mitraassist-demo.vercel.app`

That's it. No environment variables, no build config. Every future
push to `main` auto-deploys.
