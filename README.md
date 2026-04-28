# AIvion ERP

## Local development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy to GitHub Pages

This project is deployed with a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that publishes the `dist` folder to Pages.

1. Push to the `main` branch.
2. In GitHub: **Settings → Pages → Source → GitHub Actions**.
3. Wait for the **Deploy to GitHub Pages** workflow to finish.

> Do not use **Deploy from a branch** for this Vite app, because branch deployment serves source files (for example `/src/main.tsx`) instead of the built assets from `dist`.
