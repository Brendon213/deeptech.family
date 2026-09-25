# Cloudflare staging deploy

This branch is prepared for a test deployment to Cloudflare Workers through OpenNext.

## Local preparation

Run from the project root while checked out on `staging/cloudflare-preview`:

```bash
npm install @opennextjs/cloudflare@latest
npm install -D wrangler@latest
```

Commit the resulting `package.json` and `package-lock.json`.

## Cloudflare build settings

- Git branch: `staging/cloudflare-preview`
- Build command: `npx opennextjs-cloudflare build`
- Deploy command: `npx wrangler deploy`
- Root directory: `/`

## Runtime variables / secrets

Add in Cloudflare:

- `TELEGRAM_BOT_TOKEN` — secret
- `TELEGRAM_CHAT_ID` — secret or variable
- `CONTACT_ALLOWED_HOSTS` — the staging hostname only, without protocol

Example:

```text
CONTACT_ALLOWED_HOSTS=deeptech-family-staging.<account-subdomain>.workers.dev
```

After the first deployment, copy the actual `*.workers.dev` hostname into `CONTACT_ALLOWED_HOSTS` and redeploy so the contact form origin guard accepts the staging URL.

## Smoke test

Check:

- `/`
- `/en`, `/es`, `/ar`, `/zh`
- `/legal.html`
- `/privacypolicy`
- contact form -> Telegram delivery
- mobile and desktop layout

Do not point the production `deeptech.family` domain to this Worker during staging.
