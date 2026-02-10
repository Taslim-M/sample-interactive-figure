# Vite + React + TypeScript Site

A static site built with Vite, React, TypeScript, and Tailwind CSS — configured for GitHub Pages deployment.

## Deploy to GitHub Pages

1. **Create a GitHub repo** and push this code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Enable GitHub Pages** in your repo:
   - Go to **Settings → Pages**
   - Under **Source**, select **GitHub Actions**

3. The workflow will automatically build and deploy on every push to `main`.

Your site will be live at: `https://YOUR_USERNAME.github.io/YOUR_REPO/`

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
