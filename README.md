# garethterrace.co.uk

Source for my personal site: a Jekyll blog using the [Centrarium
theme](https://github.com/bencentra/centrarium), deployed to GitHub Pages
via GitHub Actions, with content editable through [Decap
CMS](https://decapcms.org/) at `/admin`.

## Stack

* **Jekyll** — static site generator
* **Centrarium** — the theme (`_layouts`, `_includes`, `_sass`), vendored
  in directly rather than as a gem — see `THIRD_PARTY_LICENSES.md` for
  attribution. Built on Bourbon/Neat/Bitters for styling, `jekyll-archives`
  for category/tag pages, `jekyll-paginate-v2` for the homepage, and
  `jekyll-sitemap`.
* **GitHub Pages** — hosting, deployed by the workflow in
  `.github/workflows/deploy.yml` on every push to `master`
* **Decap CMS** — a browser-based editor for posts and pages at `/admin`,
  authenticated against GitHub via a small OAuth relay — see
  `cms-oauth-worker/README.md` for how that's wired up

Posts take a `categories` (single value: `cycling`, `travel`, `tech`, or
`business`) and optional `tags`/`cover` image — see any file in `_posts/`
for the shape. Standalone pages (`about.md`, `posts.md`) show up in the
nav automatically when they have `main_nav: true` in their front matter.

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
write access to this repo. Posts live in `_posts/`; `about.md` and
`posts.md` are edited individually as top-level files.
