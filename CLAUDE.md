# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal blog/homepage for Gareth Terrace (garethterrace.co.uk). Jekyll 4.4 static site using
the vendored Centrarium theme (`_layouts`/`_includes`/`_sass`), deployed to GitHub Pages via
GitHub Actions, content editable via Decap CMS at `/admin`.

## Local development

```
bundle install
bundle exec jekyll serve --watch
```
Site runs at http://localhost:4000. To edit content locally through the CMS UI, also run
`npx decap-server` in a second terminal — it writes edits straight to disk, bypassing OAuth.

## Deployment gotcha

`Gemfile.lock` is committed from a Windows dev machine and only lists the
`x64-mingw-ucrt` platform. The GitHub Actions workflow (`.github/workflows/deploy.yml`) runs on
`ubuntu-latest`, so it runs `bundle lock --add-platform x86_64-linux` before `bundle install` to
avoid the platform mismatch breaking CI. Don't remove that step, and be aware `bundle install`
locally may re-lock platforms in a way that needs reconciling before pushing.

## Decap CMS

`admin/config.yml` — production backend is `github` (repo `garethterrace/homepage`, branch
`master`), authenticating through the `cms-oauth-worker` Cloudflare Worker
(`base_url: https://decap-cms-oauth.garethterrace.workers.dev`). `publish_mode: editorial_workflow`
(drafts). Collections: `post` (front matter: layout, title, author, date, categories, tags, cover,
body) and `page` (individual files like `about.md`, `posts.md`).

## cms-oauth-worker

The root-level `package.json`, `package-lock.json`, and `node_modules/` exist solely to develop
and deploy `cms-oauth-worker/` (a Cloudflare Worker handling GitHub OAuth for Decap CMS) — they
are unrelated to the Jekyll site itself and are not yet gitignored.
