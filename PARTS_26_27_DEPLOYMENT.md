# Parts 26 & 27 — Testing, Production Build & CI/CD Deployment
### FB-Site · Kaduna Multi-Brand Family Business

---

## PART 26 — PRE-FLIGHT VALIDATION ENGINE
### Local Production Builds & Linting Scripts

---

### Step 1 · Install / Sync Dependencies

Always start from a clean install so local and CI environments match exactly.

```bash
# From the project root /workspaces/FB-Site
npm ci
```

`npm ci` is stricter than `npm install`: it reads `package-lock.json` exactly and
errors if it is out of sync with `package.json`. Never use `npm install` for build
validation.

---

### Step 2 · Lint (Syntactic & Style Errors)

```bash
npm run lint
```

What this does:
- Runs ESLint with the `eslint-config-next/core-web-vitals` + TypeScript ruleset
  defined in `eslint.config.mjs`.
- Catches React Hook rule violations, unused imports, `<img>` instead of
  `<Image>`, missing `key` props, and 30+ Next.js-specific anti-patterns.
- Exit code `0` = clean. Any non-zero exit blocks the CI pipeline.

Common fix pattern:

```bash
# See every violation with its rule name
npm run lint -- --format=verbose
```

---

### Step 3 · Type-Check (Strict TypeScript Validation)

```bash
npm run type-check
```

What this does:
- Runs `tsc --noEmit` against `tsconfig.json`.
- `strict: true` is enabled, so this catches: missing return types, unsafe `any`
  casts, null/undefined access, incorrect prop shapes, and type mismatches across
  all `*.ts` / `*.tsx` files under `src/`.
- `--noEmit` means no files are written — it is pure validation.
- The `incremental` flag in `tsconfig.json` caches results in
  `tsconfig.tsbuildinfo`, making re-runs fast.

If errors appear, the output format is:

```
src/components/booking-form.tsx(42,7): error TS2345: Argument of type ...
```

File path → line → column → error code → message. Fix each before proceeding.

---

### Step 4 · Production Build

```bash
npm run build
```

Next.js 16 compilation stages (in order):

| Stage | What happens |
|---|---|
| Route collection | Scans `src/app/**/page.tsx` — finds all 9 routes |
| Static Analysis | Detects which pages can be pre-rendered (SSG) vs dynamic |
| SSG Pre-render | Statically generates `/about`, `/services`, `/testimonials`, `/thank-you`, `/tigernut-mill`, `/city-chops` and sub-routes at build time |
| Image optimisation | Registers all `<Image>` components for on-demand WebP/AVIF conversion via the built-in `/\_next/image` route |
| Code splitting | Creates per-route JS chunks — visitors only download code for the page they land on |
| Bundle minification | Terser minifies JS; CSS is purged and minified by Tailwind v4's Lightning CSS engine |
| Route manifest | Writes `.next/server/app-paths-manifest.json` — Vercel reads this at deploy time |

Successful output ends with:

```
✓ Compiled successfully
✓ Linting and checking validity of types
Route (app)                Size     First Load JS
┌ ○ /                      ...
...
○  (Static)   prerendered as static content
```

Any `⚠ Warning` or `✗ Error` line must be resolved before deployment.

---

### Step 5 · Local Production Server (Edge-Case Simulation)

After a clean build, start the production server locally:

```bash
npm run start
# Listening on http://localhost:3000
```

**Critical difference from `npm run dev`:**
- No hot-reload, no source maps, no React dev warnings.
- Serves the exact compiled `.next/` output that Vercel will serve.
- `useOperationalStatus` runs in the browser against real WAT time
  (`Africa/Lagos` timezone) — not mocked.

#### Testing `useOperationalStatus` Locally

The hook polls every 60 s and reads actual system time via:
```ts
new Date().toLocaleString("en-US", { timeZone: "Africa/Lagos" })
```

To simulate the boundary conditions without waiting for real clock time, temporarily
patch `OPEN_HOUR` / `CLOSE_HOUR` in
`src/hooks/useOperationalStatus.ts`, rebuild, and restart:

```bash
# Example: force "closing soon" state
# Edit OPEN_HOUR = 0 and CLOSE_HOUR = (current WAT hour + 1)
npm run build && npm run start
```

Visit `http://localhost:3000` and verify:
- The status badge reflects the correct open/closed label.
- WhatsApp order buttons are active only when `canOrder === true`.
- The booking form on `/city-chops/catering` submits to Web3Forms with
  `NEXT_PUBLIC_WEB3FORMS_KEY` present in `.env.local`.

#### `.env.local` Setup for Local Production Testing

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:
```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WEB3FORMS_KEY=your_real_web3forms_key
NEXT_PUBLIC_WHATSAPP_NUMBER=2348012345678
```

`npm run build` must be re-run after any `.env.local` change — env vars are
baked into the static output at build time.

---

### Full Local Pre-Flight Sequence (Copy-Paste)

```bash
npm ci
npm run lint
npm run type-check
npm run build
npm run start
```

All five commands must exit with code `0` before pushing to `main`.

---

---

## PART 27 — CI/CD INFRASTRUCTURE PIPELINE
### GitHub Synchronisation & Edge Deployment

---

### Step 1 · Initialise Git and Push to GitHub

#### A. Create the GitHub repository

1. Go to https://github.com/new
2. Repository name: `FB-Site` (or your preferred name)
3. Visibility: **Private** (contains business logic and env variable names)
4. Do **not** initialise with README, .gitignore, or licence — the project already has these.
5. Click **Create repository**.

#### B. Link the local workspace to GitHub

```bash
# 1. Initialise git if not already done
git init

# 2. Stage everything (package.json, src/, public/, configs)
git add .

# 3. Verify nothing sensitive is staged — .env* is in .gitignore
git status

# 4. First commit
git commit -m "feat: initial production build"

# 5. Rename default branch to main
git branch -M main

# 6. Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/FB-Site.git

# 7. Push and set upstream tracking
git push -u origin main
```

After this, every subsequent push is just:

```bash
git push
```

---

### Step 2 · The CI Workflow (Already Created)

The file `.github/workflows/deploy.yml` is already committed in this project.
It runs automatically on every push or pull request to `main`.

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    name: Lint & Type-check
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Type-check
        run: npm run type-check

      - name: Build
        run: npm run build
        env:
          NEXT_PUBLIC_SITE_URL: ${{ secrets.NEXT_PUBLIC_SITE_URL }}
          NEXT_PUBLIC_WEB3FORMS_KEY: ${{ secrets.NEXT_PUBLIC_WEB3FORMS_KEY }}
          NEXT_PUBLIC_WHATSAPP_NUMBER: ${{ secrets.NEXT_PUBLIC_WHATSAPP_NUMBER }}
```

Pipeline stages:
1. **checkout** — clones the exact commit being tested.
2. **setup-node** — installs Node 20; `cache: npm` restores `node_modules`
   from cache using `package-lock.json` hash, cutting install time by ~80%.
3. **npm ci** — reproducible install identical to local.
4. **lint** — ESLint with Next.js rules; failure blocks merge.
5. **type-check** — `tsc --noEmit`; failure blocks merge.
6. **build** — full Next.js production compile with secrets injected.

#### Add GitHub Secrets

1. GitHub repo → **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret** for each:

| Secret name | Value |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com` |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Your Web3Forms access key |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `2348012345678` |

These are injected as environment variables during the CI build step only.
They are never written to logs or exposed in the repository.

---

### Step 3 · Vercel Deployment

#### Option A — Vercel Dashboard (Recommended for first deploy)

1. Go to https://vercel.com/new
2. Click **Import Git Repository** → connect GitHub → select `FB-Site`.
3. Vercel auto-detects Next.js. Confirm these settings match `vercel.json`:
   - Framework: **Next.js**
   - Build command: `npm run build`
   - Output directory: `.next`
4. Expand **Environment Variables** and add the same three secrets:
   ```
   NEXT_PUBLIC_SITE_URL       = https://your-domain.com
   NEXT_PUBLIC_WEB3FORMS_KEY  = your_web3forms_access_key
   NEXT_PUBLIC_WHATSAPP_NUMBER = 2348012345678
   ```
5. Click **Deploy**.

From this point forward, every `git push origin main` triggers:
- The GitHub Actions CI pipeline (lint + type-check + build).
- Vercel's own build pipeline in parallel (full edge deployment).

Both must pass. If CI fails, Vercel still deploys (they are independent) — which
is why the CI build step in the workflow duplicates Vercel's build.

#### Option B — Vercel CLI

```bash
# Install globally (one-time)
npm install -g vercel

# Login
vercel login

# Link this directory to a Vercel project (first time only)
vercel link

# Deploy to production
vercel --prod
```

`vercel link` creates a `.vercel/` directory. This is already in `.gitignore`
(`.vercel` entry) — do not commit it.

---

### Step 4 · Custom Domain (Optional)

1. Vercel dashboard → your project → **Settings** → **Domains**
2. Add your domain (e.g., `citychopsng.com`)
3. Vercel provides DNS records — add them at your registrar.
4. Update `NEXT_PUBLIC_SITE_URL` secret to `https://citychopsng.com`
5. Trigger a redeploy: `git commit --allow-empty -m "chore: update site url" && git push`

---

### Ongoing Development Workflow

```
Edit code locally
    ↓
npm run lint && npm run type-check   ← validate before committing
    ↓
git add . && git commit -m "feat: ..."
    ↓
git push origin main
    ↓
GitHub Actions runs: lint → type-check → build   ← automated gate
    ↓
Vercel builds and deploys to edge                ← automatic on push
    ↓
Live site updated in ~30 seconds
```

---

### Troubleshooting Reference

| Symptom | Cause | Fix |
|---|---|---|
| `tsc` errors after clean pull | Stale `.tsbuildinfo` | `rm tsconfig.tsbuildinfo && npm run type-check` |
| Build passes locally, fails in CI | Missing secret in GitHub | Add secret under repo Settings → Actions |
| Vercel build error: `NEXT_PUBLIC_*` undefined | Env var not set in Vercel dashboard | Settings → Environment Variables → add and redeploy |
| WhatsApp link opens wrong number | `NEXT_PUBLIC_WHATSAPP_NUMBER` mismatch | Verify value matches `BRANDS` in `src/data/content.ts` |
| `useOperationalStatus` shows wrong state | Browser timezone override | Hook uses `Africa/Lagos` explicitly — check system clock |
| ESLint `eslint.config.mjs` parse error | ESLint v9 flat config incompatibility | Ensure `eslint-config-next` version matches `next` version in `package.json` |
