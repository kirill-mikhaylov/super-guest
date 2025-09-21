# super-guest

This repository is a Next.js project bootstrapped with `create-next-app`. It includes the app source under the `app/` directory and a standalone landing page demo at the project root.
# super-guest

This repository is a Next.js project bootstrapped with `create-next-app`. It contains the app in the `app/` directory.

## Development (Next.js app)

Install dependencies:

```bash
npm install
# or
pnpm install
```

Start the Next.js development server:

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
# or
bun dev
```

Open http://localhost:3000 in your browser to view the app. The main page is `app/page.tsx`.

## Standalone landing demo

Preview the quick landing demo (root `index.html`):

```bash
python3 -m http.server 8000
# then open http://localhost:8000/index.html
```

Notes:
- `index.html` is a portable demo with inline CSS and JS.
- The email capture form there is a frontend-only placeholder and does not POST to any backend.

## Learn more

- Next.js docs: https://nextjs.org/docs
- Learn Next.js interactive tutorial: https://nextjs.org/learn

## Deploy

Deploy the Next.js app to Vercel or any platform that supports Next.js. See the Next.js deployment docs for details.

---

If you'd like I can:

- Integrate the `index.html` demo into the Next.js app under `app/`.
- Add a serverless endpoint to accept email signups and wire the demo to it.

Tell me which you'd prefer and I'll implement it.
## Getting Started
