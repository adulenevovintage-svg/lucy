# LUCY AGRICULTURE CORP

> Direct Farm-to-Consumer Fresh Crops & Grocery Errand Delivery Platform.
> 100% of product pricing goes directly to local family farmers with strictly $0.00 middleman commission. Supported direct Ethiopian settlements: Telebirr, Commercial Bank of Ethiopia (CBE), and Bank of Abyssinia (BOA).

---

## 🚀 Flawless Vercel Deployment Guide

This project is pre-configured for a zero-configuration, 1-click deployment on [Vercel](https://vercel.com).

### Deployment Settings in Vercel Dashboard:
- **Framework Preset**: `Vite` (Vercel will automatically detect `vercel.json` and `vite.config.ts`)
- **Root Directory**: `./` (Default root)
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`
- **Node.js Version**: `20.x` or `22.x` (Recommended)

### Included Vercel Configuration Files:
1. **`vercel.json`**:
   - Handles SPA single-page routing (`rewrites` to `/index.html`), preventing 404 errors on browser page reloads or deep links.
   - Sets cache-control headers for static build assets (`/assets/*`).
2. **`.vercelignore`**:
   - Ensures local files, logs, and `node_modules` are ignored for swift uploads.
3. **`vite.config.ts`**:
   - ESM-safe path resolution with `fileURLToPath` and `import.meta.url`.
   - Chunk size limit optimized for clean, warning-free minification.

---

## 🛠️ Local Development & Build Commands

```bash
# 1. Install dependencies
npm install

# 2. Run local development server (Port 3000)
npm run dev

# 3. Compile for production (Creates /dist bundle)
npm run build

# 4. Preview the compiled production build locally
npm run preview

# 5. Type-check codebase
npm run lint
```

---

## 🌿 Core Features
- **Direct Ethiopian Settlements**: Instant payouts via Telebirr mobile wallet, Commercial Bank of Ethiopia (CBE), and Bank of Abyssinia (BOA).
- **Dual Currency**: Instant 1-click switcher between Ethiopian Birr (**ETB**) and US Dollars (**USD**).
- **Real-Time GPS Errand Tracking**: Satellite telematics, moving route map, insulated box thermometer, live ETA countdown, and runner checkpoints.
- **Farmer Registration & Management Hub**: Onboarding for family farms with acreage, organic certifications, and direct bank routing.
- **0% Middleman Manifesto & Impact Calculator**: Side-by-side interactive comparison demonstrating 100% direct payouts vs. traditional supermarket 82% markups.
- **Secure Encrypted Payment Modal**: Telebirr QR/USSD, CBE Direct Wire, BOA P2P, International Card, and Cash on Errand Arrival.
