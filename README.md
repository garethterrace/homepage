# garethterrace.co.uk

Source for my personal site: a minimal Jekyll blog, deployed to GitHub
Pages via GitHub Actions, with content editable through [Decap
CMS](https://decapcms.org/) at `/admin`.

## Stack

* **Jekyll** — static site generator
* **GitHub Pages** — hosting, deployed by the workflow in
  `.github/workflows/deploy.yml` on every push to `master`
* **Decap CMS** — a browser-based editor for posts and pages at `/admin`,
  authenticated against GitHub via a small OAuth relay — see
  `cms-oauth-worker/README.md` for how that's wired up

## Local development

```bash
bundle install
bundle exec jekyll serve --watch
```

Then visit [localhost:4000](http://localhost:4000).

To use the CMS at `/admin` locally, also run Decap's local proxy server
in a second terminal (needs Node.js installed):

```bash
npx decap-server
```

With both running, `/admin` on localhost talks to that proxy instead of
GitHub — no OAuth login needed, and edits are written straight to your
working copy on disk so you can see them picked up by `jekyll serve`
and commit them yourself. This only works on localhost; the deployed
site always uses the GitHub OAuth flow (see `cms-oauth-worker/README.md`).

## Deployment

Pushing to `master` triggers `.github/workflows/deploy.yml`, which builds
the site with Jekyll and publishes it via GitHub Pages. No manual build
step is required.

## Content editing

Visit `/admin` on the live site and log in with a GitHub account that has
write access to this repo. Posts live in `_posts/`, standalone pages in
`pages/`.
