# Moreno Advisory — Deployment Guide

## Stack Overview

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, SSG) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + Framer Motion |
| i18n | next-intl (EN + PT-BR) |
| Hosting | Google Cloud Run / Cloud Storage |
| Domain | morenoadvisory.com |
| Email | cemoreno@morenoadvisory.com |

---

## Local Development

```bash
# 1. Clone / copy the project folder to your machine
cd moreno-advisory

# 2. Install dependencies
npm install

# 3. Copy and fill environment variables
cp .env.example .env.local
# Edit .env.local with your real SMTP credentials

# 4. Run dev server
npm run dev
# Open http://localhost:3000  →  auto-redirects to /en
```

---

## Environment Variables

Create `.env.local` (never commit this file):

```env
# Email — required for contact form
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=cemoreno@morenoadvisory.com
SMTP_PASS=<Gmail App Password>
SMTP_FROM_EMAIL=cemoreno@morenoadvisory.com
CONTACT_EMAIL=cemoreno+faleconosco@morenoadvisory.com
NEWSLETTER_EMAIL=cemoreno+newsletter@morenoadvisory.com

# Site URL — set to your real domain in production
NEXT_PUBLIC_SITE_URL=https://morenoadvisory.com

# WhatsApp number (international format, digits only)
NEXT_PUBLIC_WHATSAPP_NUMBER=+13050000000

# Google Analytics (add when ready)
# NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Setting up Gmail App Password
1. Enable 2-Factor Authentication on your Google account
2. Go to Google Account → Security → App Passwords
3. Create a password for "Mail" on "Other (custom name)"
4. Use that 16-character password as `SMTP_PASS`

---

## Production Build

```bash
npm run build       # Compile and export
npm run start       # Preview production locally on :3000
npm run type-check  # Run TypeScript checks without building
npm run lint        # Run ESLint
```

---

## Deploy to Google Cloud Run

### Prerequisites
```bash
# Install Google Cloud CLI
# https://cloud.google.com/sdk/docs/install

gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### Option A — Cloud Run (recommended, supports API routes)

```bash
# 1. Build Docker image
docker build -t gcr.io/YOUR_PROJECT_ID/moreno-advisory .

# 2. Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/moreno-advisory

# 3. Deploy to Cloud Run
gcloud run deploy moreno-advisory \
  --image gcr.io/YOUR_PROJECT_ID/moreno-advisory \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars "NEXT_PUBLIC_SITE_URL=https://morenoadvisory.com" \
  --set-env-vars "NEXT_PUBLIC_WHATSAPP_NUMBER=5511910685040" \
  --set-env-vars "SMTP_FROM_EMAIL=cemoreno@morenoadvisory.com" \
  --set-env-vars "CONTACT_EMAIL=cemoreno+faleconosco@morenoadvisory.com" \
  --set-env-vars "NEWSLETTER_EMAIL=cemoreno+newsletter@morenoadvisory.com" \
  --set-secrets "SMTP_HOST=smtp-host:latest,SMTP_PORT=smtp-port:latest,SMTP_SECURE=smtp-secure:latest,SMTP_USER=smtp-user:latest,SMTP_PASS=smtp-pass:latest"

# 4. Map custom domain in Cloud Run > Manage Custom Domains
```

### Setup dos secrets do Google Workspace

Antes do deploy, rode:

```bash
bash setup-gcp-secrets.sh
```

Esse script cria ou atualiza:

- `smtp-host`
- `smtp-port`
- `smtp-secure`
- `smtp-user`
- `smtp-pass`

Use a senha de app do Google Workspace no `smtp-pass`.

### Dockerfile (create at project root)
```dockerfile
FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production

FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=8080
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 8080
CMD ["node", "server.js"]
```

Add to `next.config.ts`:
```ts
output: "standalone",
```

### Option B — Cloud Storage (static export, no API routes)

```bash
# Add to next.config.ts: output: "export"
npm run build

# Upload to Cloud Storage bucket
gsutil -m cp -r .next/static/* gs://morenoadvisory.com/
gsutil web set -m index.html -e 404.html gs://morenoadvisory.com
```
> **Note:** Static export disables the `/api/contact` and `/api/newsletter` routes.
> Use an external email service (EmailJS, Formspree, or SendGrid) instead.

---

## Option C — Vercel (Zero-Config, Easiest)

```bash
npm install -g vercel
vercel --prod
# Follow prompts — add env vars in the Vercel dashboard
```

---

## Custom Domain Setup

### Google Cloud Run
1. Cloud Console → Cloud Run → Manage Custom Domains
2. Add `morenoadvisory.com` and `www.morenoadvisory.com`
3. Follow DNS verification steps (add TXT/CNAME records at your registrar)
4. SSL is provisioned automatically

### DNS Records (at your registrar)
```
A     @       [Cloud Run Load Balancer IP]
CNAME www     ghs.googlehosted.com
TXT   @       google-site-verification=...
```

---

## Post-Deployment Checklist

### Functional
- [ ] `/en` loads the English home page
- [ ] `/pt` loads the Portuguese home page
- [ ] Language switcher toggles between EN ↔ PT correctly
- [ ] All 8 service pages load (`/en/services/business-development`, etc.)
- [ ] Contact form submits and sends email to `cemoreno@morenoadvisory.com`
- [ ] Contact form submits and sends email to `cemoreno+faleconosco@morenoadvisory.com`
- [ ] WhatsApp floating button opens chat
- [ ] Newsletter form submits
- [ ] Newsletter form submits and sends email to `cemoreno+newsletter@morenoadvisory.com`
- [ ] Mobile navigation opens and closes
- [ ] Logo loads from `/assets/logo-main.png`

### Separar o Fale Conosco no Gmail / Google Workspace

Para receber em uma pasta separada, crie uma label no Gmail, por exemplo `Fale Conosco`, e um filtro com:

```text
to:(cemoreno+faleconosco@morenoadvisory.com)
```

Depois marque:

- `Apply the label` → `Fale Conosco`
- `Never send it to Spam`

Para newsletter, crie outra label com o filtro:

```text
to:(cemoreno+newsletter@morenoadvisory.com)
```

### SEO
- [ ] `https://morenoadvisory.com/sitemap.xml` returns valid XML
- [ ] `https://morenoadvisory.com/robots.txt` is accessible
- [ ] Open Graph tags appear when sharing on LinkedIn
- [ ] `hreflang` tags are present in `<head>` (`en` and `pt`)
- [ ] Submit sitemap to Google Search Console

### Performance
- [ ] Run Lighthouse audit (`chrome://` → Lighthouse tab)
- [ ] Target: Performance 95+, Accessibility 95+, SEO 95+
- [ ] Test on mobile (Chrome DevTools device emulation)

### Analytics (future)
1. Create Google Analytics 4 property
2. Add `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX` to env
3. Add GA script in `src/app/[locale]/layout.tsx`

---

## Future Integrations

### HubSpot CRM
```ts
// In src/app/api/contact/route.ts, add after email send:
await fetch('https://api.hsforms.com/submissions/v3/integration/submit/YOUR_PORTAL_ID/YOUR_FORM_GUID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ fields: [{ name: 'email', value: data.email }, ...] })
});
```

### Salesforce
Use Salesforce Web-to-Lead API endpoint from your Salesforce org settings.

### Google Search Console
1. Verify domain at search.google.com/search-console
2. Submit `https://morenoadvisory.com/sitemap.xml`

---

## Project Structure

```
moreno-advisory/
├── src/
│   ├── app/
│   │   ├── [locale]/          ← Localized pages (EN + PT)
│   │   │   ├── layout.tsx     ← Full layout with i18n context
│   │   │   ├── page.tsx       ← Home page
│   │   │   ├── about/         ← About page
│   │   │   ├── services/      ← Services index + 8 service pages
│   │   │   ├── industries/    ← Industries page
│   │   │   ├── contact/       ← Contact page
│   │   │   └── blog/          ← Blog index + article pages
│   │   ├── api/               ← API routes (not localized)
│   │   │   ├── contact/       ← Contact form handler
│   │   │   └── newsletter/    ← Newsletter subscription
│   │   ├── sitemap.ts         ← Dynamic sitemap
│   │   └── robots.ts          ← Robots.txt
│   ├── components/
│   │   ├── layout/            ← Header, Footer
│   │   ├── sections/          ← Page sections (Hero, Stats, etc.)
│   │   └── ui/                ← Reusable UI components
│   ├── i18n/
│   │   ├── routing.ts         ← Locale configuration
│   │   ├── request.ts         ← next-intl server config
│   │   └── messages/
│   │       ├── en.json        ← English translations
│   │       └── pt.json        ← Portuguese translations
│   ├── lib/
│   │   ├── constants.ts       ← All site content & data
│   │   ├── metadata.ts        ← SEO utilities
│   │   └── utils.ts           ← Helper functions
│   └── types/
│       └── index.ts           ← TypeScript interfaces
├── public/
│   └── assets/
│       └── logo-main.png      ← Main logo
├── .env.example               ← Environment variables template
├── .env.local                 ← Your secrets (DO NOT COMMIT)
├── next.config.ts             ← Next.js + next-intl config
├── tailwind.config.ts         ← Design tokens & theme
└── DEPLOY.md                  ← This file
```

---

## Adding Content

### New Blog Article
1. Add an entry to the `placeholderPosts` array in `src/app/blog/BlogPageContent.tsx`
2. Create `src/app/blog/[slug]/` with actual content
3. The URL will be `/en/blog/your-slug` and `/pt/blog/your-slug`

### New Service
1. Add to `SERVICES` array in `src/lib/constants.ts`
2. Create directory `src/app/[locale]/services/your-slug/page.tsx`
3. Add to `src/app/[locale]/layout.tsx` static params
4. Add translations to `en.json` and `pt.json`

### Adding a New Language
1. Add locale to `src/i18n/routing.ts` → `locales: ["en", "pt", "es"]`
2. Create `src/i18n/messages/es.json`
3. Update `LanguageSwitcher.tsx` to include the new button
4. Rebuild and deploy

---

## Maintenance

```bash
# Update dependencies
npm outdated          # Check what's outdated
npm update            # Update within semver ranges

# Check for vulnerabilities
npm audit
npm audit fix         # Auto-fix safe patches

# Type check
npm run type-check

# Lint
npm run lint
```

---

*Built by Moreno Advisory Development Team — 2026*
