# Decap CMS GitHub OAuth relay

GitHub Pages only serves static files, so the OAuth token exchange for
`/admin` (Decap CMS) needs somewhere to run. This is a small Cloudflare
Worker that does just that — nothing else touches it.

## One-time setup

1. **Create a GitHub OAuth App**
   GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: `https://garethterrace.co.uk`
   - Authorization callback URL: `https://<your-worker-subdomain>.workers.dev/callback`
     (update this once you know your Worker's URL from step 2)
   - Note the generated **Client ID** and **Client Secret**.

2. **Deploy the Worker** (requires a free Cloudflare account)
   ```bash
   cd cms-oauth-worker
   npx wrangler login
   npx wrangler deploy
   npx wrangler secret put GITHUB_CLIENT_ID
   npx wrangler secret put GITHUB_CLIENT_SECRET
   ```
   Wrangler will print the deployed URL, e.g.
   `https://decap-cms-oauth.<your-subdomain>.workers.dev`.

3. **Wire it up**
   - Update the OAuth App's callback URL (step 1) to match the real
     deployed Worker URL.
   - Update `admin/config.yml` → `backend.base_url` in the main site repo
     to the same Worker URL (already set to
     `https://decap-cms-oauth.garethterrace.workers.dev` — change this if
     your Worker ends up on a different subdomain).

4. **Log in**
   Visit `https://garethterrace.co.uk/admin/`, click "Login with GitHub".
   Any GitHub account with write access to the `homepage` repo can publish.

## Why not Netlify Identity?

Netlify Identity / Git Gateway only works for sites Netlify itself hosts.
Moving to GitHub Pages means the CMS talks to GitHub directly instead, which
is what this OAuth relay enables.
