# Aquatag — marketing site

Static HTML/CSS/JS. No build step, no server. Every page is hand-authored and
references `assets/` for shared fonts, components, and imagery.

## Pages

| Path | Purpose |
|---|---|
| `index.html` | Landing page — hero, how it works, characters, screens, FAQ |
| `privacy.html` · `terms.html` | Legal |
| `404.html` | GitHub Pages serves this on missing paths |

## Deploy to GitHub Pages

### One-time setup

1. **Create a new GitHub repo** (public required on free plan — private Pages needs Pro).
2. **Push this folder.** From the project root:
   ```bash
   git init
   git add .
   git commit -m "Initial Aquatag site"
   git branch -M main
   git remote add origin git@github.com:<user>/<repo>.git
   git push -u origin main
   ```
3. **Enable Pages.** Repo → Settings → Pages → **Build and deployment**:
   - **Source:** *GitHub Actions*
   - The included workflow at `.github/workflows/pages.yml` takes over from here.
4. Wait ~30 seconds. Your site goes live at
   `https://<user>.github.io/<repo>/` and every push to `main` redeploys.

### Custom domain (optional)

1. Add a file called `CNAME` at the repo root containing *just* your domain,
   e.g. `aquatag.app` (no `https://`, no path).
2. At your DNS provider, add a CNAME record from `aquatag.app` (or `www`) to
   `<user>.github.io`.
3. Back in Settings → Pages, tick **Enforce HTTPS** once the cert provisions.

## Local preview

Any static server works:

```bash
# Python (built into macOS)
python3 -m http.server 4000

# Or, with Node
npx serve .
```

Then open `http://localhost:4000`.
