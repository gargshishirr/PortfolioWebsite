# Portfolio website — guide

Shishir's personal site: who he is, his projects as an interactive constellation, and how to reach him.
Live at **https://gargshishirr.github.io/PortfolioWebsite/**.

## Features

- Intro, about, and a timeline of work and education.
- Featured projects plus a constellation map of all of them. Click one for screenshots, highlights and links
  (live demo and code).
- **Command palette:** press ⌘K (Ctrl+K on Windows) to jump anywhere.
- **Hidden terminal:** press the backtick key (`) and type `help`.
- Contact by email and a résumé link.
- Works on phones, and with a keyboard or a screen reader.

## How to change the content

Everything you'd want to change lives in `src/data/`:

- `profile.js` — name, role, intro, email, résumé link, social links.
- `projects.js` — the project cards: title, summary, highlights, links (`live`, `repo`) and screenshots.
- `experience.js` — jobs and education.

Screenshots go in `src/assets/projects/` (WebP, about 1600 px wide). Import them at the top of `projects.js`,
then use them in the project's `images`.

To see your change before publishing:

```bash
cd ~/PortfolioWebsite
npm install      # first time only
npm run dev      # then open the address it prints
```

## How to publish

1. Run `npm run lint && npm run build` (the repo keeps a copy of the built site in `dist/`).
2. Commit and push to `main`.

GitHub Actions checks the code, builds it and publishes it to the `gh-pages` branch. The live site updates in
about a minute.

## How to maintain

- Every few months, update packages: `npm outdated`, then `npm update`, then lint and build again.
- Check that the live-demo links still work. Demos on Render's free plan sleep, so their first visit takes
  about a minute.
- Keep the résumé link up to date.

## Security & privacy

- It's a static site: no server, no database, no cookies and no tracking.
- Nothing secret is in the code. The email address is public on purpose.
- The published pages carry a Content Security Policy, so only the site's own scripts can run. It's added at
  build time (in `vite.config.js`), so `npm run dev` is unaffected.

## Troubleshooting

- **The site didn't update.** Open the repo's Actions tab: if the run failed, fix the error it shows and push
  again. If it passed, wait a minute and reload with ⌘⇧R.
- **A new screenshot doesn't show.** Import it at the top of `projects.js` and use that imported name.
- **Something is blocked after a change** (a console message about "Content Security Policy"). The site only
  loads its own files. Bundle the file with the site instead of linking it from another website.
