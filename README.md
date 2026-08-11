# Fortis Corporate Services — Website

Marketing website for Fortis Corporate Services (Pvt) Ltd, a Colombo-based corporate secretarial, legal and business services firm.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com), output as a fully static site (`astro build` → `dist/`) suitable for ordinary Hostinger shared/business hosting. Content (services, FAQ, guides, blog, compliance calendar) lives in Astro content collections under `src/content/` as Markdown/JSON, so future edits are localized and low-risk. The contact and resource-download forms are handled by a small PHP + PHPMailer script in `server/`, since this is a static site with no other backend. Content can also be edited without touching code via the Decap CMS panel at `/admin`.

## Local development

```bash
npm install
npm run dev
```

Visit `http://localhost:4321`.

```bash
npm run build    # type-checks and builds the static site into dist/
npm run preview  # serve the production build locally
```

The PHP contact form cannot be tested against `npm run dev` (Astro's dev server doesn't run PHP). To test it locally, run a PHP server against `server/` separately (e.g. `php -S localhost:8080 -t server`) after creating `server/config.php` (see below) and running `composer install` inside `server/`.

## Project structure

```
src/
  content/        # Content collections: services, faq, guides, blog, complianceDeadlines
  components/      # Shared Astro components (Header, Footer, SEO, CTA, ...)
  layouts/         # BaseLayout.astro
  pages/           # Routes — one file/folder per page
  lib/site.ts      # Firm details, nav links, domain — single source of truth
server/
  send.php         # Handles the enquiry form and resource-download form (SMTP via PHPMailer)
  config.example.php  # Template for server/config.php (see Deployment below)
  oauth/           # Minimal GitHub OAuth proxy so Decap CMS (at /admin) can authenticate
public/
  admin/           # Decap CMS admin panel (config.yml + index.html)
```

## How deploys work

Pushing to `main` triggers `.github/workflows/deploy.yml`, which:

1. Builds the Astro site (`npm ci && npm run build`) into `dist/`.
2. Runs `composer install` inside `server/` to vendor PHPMailer.
3. Deploys `dist/` to the Hostinger web root via FTP, using [`SamKirkland/FTP-Deploy-Action`](https://github.com/SamKirkland/FTP-Deploy-Action).
4. Deploys `server/` (the PHP handlers) to `/server/` on the host — **excluding `server/config.php`**, so the live SMTP/OAuth credentials on the server are never overwritten by a deploy.

### Required GitHub Actions secrets

Set these under **Settings → Secrets and variables → Actions** on the repository:

| Secret | Value |
| --- | --- |
| `FTP_SERVER` | Hostinger FTP hostname (hPanel → Files → FTP Accounts) |
| `FTP_USERNAME` | Hostinger FTP username |
| `FTP_PASSWORD` | Hostinger FTP password |

If your Hostinger FTP account's root directory isn't already your site's web root (`public_html`), adjust `server-dir` in `.github/workflows/deploy.yml` accordingly.

## One manual step required on a fresh server

The live SMTP (and Decap CMS OAuth) credentials are **never committed to git**. After the first deploy, you must create `server/config.php` directly on the server:

1. In Hostinger **hPanel → Files → File Manager**, navigate to `server/`.
2. Duplicate `config.example.php` and rename the copy to `config.php`.
3. Edit `config.php` and fill in:
   - Real SMTP host/port/username/password (Hostinger provides SMTP credentials under **hPanel → Emails**, or use a third-party SMTP provider).
   - The GitHub OAuth App `client_id`/`client_secret` (only needed if using the `/admin` content editor — see below).
4. Save. `server/config.php` is gitignored and will never be touched or overwritten by future deploys.

Without this step, the contact form and resource-download form will show a friendly "not configured yet" error instead of failing silently.

## Editing content without code (Decap CMS)

The site includes a git-based CMS admin panel at `/admin`, so content can be edited without touching code or running `git push` directly. It edits the same Markdown/JSON files in `src/content/` — saving a change in the CMS commits directly to the `main` branch, which triggers the same GitHub Actions deploy as any other push.

Because this site runs on plain Hostinger hosting (not Netlify), it can't use Netlify's built-in CMS authentication. Instead, `server/oauth/` implements a small GitHub OAuth proxy. One-time setup:

1. Create a GitHub OAuth App at <https://github.com/settings/developers>:
   - **Homepage URL**: `https://fortiscorporate.com` (or the confirmed production domain)
   - **Authorization callback URL**: `https://fortiscorporate.com/server/oauth/callback.php`
2. Add the generated Client ID and Client Secret to `server/config.php` under `github_oauth` (see `config.example.php` for the shape).
3. Visit `https://fortiscorporate.com/admin`, sign in with a GitHub account that has push access to this repository, and edit away.

## Open items before go-live

- **Domain**: `fortiscorporate.com` is used as a placeholder throughout the codebase (see `TODO: confirm domain` comments in `astro.config.mjs` and `src/lib/site.ts`). Update `SITE_URL` in `src/lib/site.ts` once the real domain is confirmed.
- **Compliance calendar dates**: the indicative deadlines in `src/content/complianceDeadlines/deadlines.json` (and shown on `/resources`) have **not** been verified against current Sri Lankan regulatory sources. Verify before publishing.
- **Calendly link**: `links.calendly` in `src/lib/site.ts` is a placeholder — replace with the firm's real scheduling link.
- **GA4 measurement ID**: `GA4_MEASUREMENT_ID` in `src/lib/site.ts` is a placeholder (`G-XXXXXXXXXX`) — replace with the real ID once supplied.
- **Logo**: the site currently uses a text wordmark ("FORTIS") as a placeholder — see `TODO: replace with real logo` comments in `Header.astro`, `favicon.svg` and `og-default.svg`.
- **OG share image**: `public/og-default.svg` is an SVG placeholder; some platforms (Facebook, LinkedIn) don't render SVG `og:image` tags reliably — replace with a real PNG/JPG once brand assets exist.
