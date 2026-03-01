# Deployment Guide: System The Hack

This guide walks you through deploying both the **frontend** (Vercel) and **backend** (Render) to production.

---

## Architecture Overview

| Component | Technology | Host |
|-----------|------------|------|
| **Frontend** | React + Vite (main app) + scenario-page (static HTML) | Vercel |
| **Backend** | Express.js (Node.js) API | Render |

---

## Part 1: Deploy Backend to Render

1. **Sign up** at [render.com](https://render.com) (free tier available).

2. **Create a New Web Service**
   - Click **New** → **Web Service**
   - Connect your GitHub/GitLab repo (or push to Git first)
   - **Important:** Set **Root Directory** to `scenario-page/backend`

3. **Configure the service**
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Runtime:** Node

4. **Add environment variables** in Render dashboard:
   | Key | Value | Notes |
   |-----|-------|-------|
   | `GROQ_API_KEY` | Your Groq API key | Required for AI interventions |
   | `FRONTEND_URL` | `https://YOUR-APP.vercel.app` | Your Vercel frontend URL (no trailing slash) |

5. Click **Create Web Service**. Render will build and deploy. Copy the URL (e.g. `https://scenario-api-xxxx.onrender.com`).

---

## Part 2: Deploy Frontend to Vercel

1. **Sign up** at [vercel.com](https://vercel.com) (free tier available).

2. **Import your project**
   - Click **Add New** → **Project**
   - Import from GitHub/GitLab or upload
   - Vercel auto-detects Vite

3. **Configure build** (usually auto-filled)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Framework Preset:** Vite

4. **Add environment variables** (if you use any in the frontend):
   - e.g. `VITE_GEMINI_API_KEY` for the main React app’s AI features

5. Click **Deploy**. Copy your Vercel URL (e.g. `https://system-the-hack-xxx.vercel.app`).

---

## Part 3: Connect Frontend & Backend

1. **Update the backend CORS** (or use `FRONTEND_URL`):
   - In Render, set `FRONTEND_URL` = `https://YOUR-VERCEL-APP.vercel.app` (no trailing slash)
   - The backend `server.js` uses this for CORS.

2. **Update the frontend API URL** in `scenario-page/index.html`:
   - Find `API_BASE` (around line 1198)
   - Set it to your Render backend URL:
     ```js
     const API_BASE = "https://YOUR-RENDER-SERVICE.onrender.com";
     ```

3. **Redeploy** both frontend and backend so changes take effect.

---

## Part 4: Quick Checklist

- [ ] Backend deployed on Render with `GROQ_API_KEY` and `FRONTEND_URL`
- [ ] Frontend deployed on Vercel
- [ ] `API_BASE` in `scenario-page/index.html` points to Render backend URL
- [ ] `FRONTEND_URL` in Render env vars points to Vercel frontend URL
- [ ] Scenario page loads at `https://your-app.vercel.app/scenario-page/index.html`

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| CORS errors | Ensure `FRONTEND_URL` in Render matches your Vercel URL exactly (no trailing slash) |
| 404 on scenario page | Confirm `vite-plugin-static-copy` is copying `scenario-page/index.html` to `dist/scenario-page/` |
| API returns 500 | Check Render logs; verify `GROQ_API_KEY` is set |
| Cold starts on Render free tier | First request after idle can take ~30s; subsequent requests are fast |
