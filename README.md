# Portfolio Site

Static portfolio website built with vanilla HTML, CSS, and JavaScript.

## File Structure

```
portfolio/
├── index.html              # Main HTML entry point
├── css/
│   ├── reset.css           # Reset & base styles
│   ├── theme.css           # CSS custom properties, dark/light theme
│   ├── animations.css      # Keyframes, fade-in, float, pulse
│   ├── layout.css          # Header, hero, sections, footer, grid
│   ├── components.css      # Buttons, cards, modal, filters, timeline
│   └── responsive.css      # Media queries (768px, 480px)
├── js/
│   ├── data.js             # i18n translations, projects, skills, education data
│   ├── main.js             # Core: particles, theme, modal, language, shared namespace
│   └── projects.js         # Render functions, filters, i18n UI updates
└── README.md
```

## Sections

- **Hero** — name, title, bio, CTA buttons
- **Projects** — project cards with tech tags, filters, and modal detail views
- **Skills** — technology grid
- **Education & Certifications** — degree and cert cards
- **Contact** — email button + social links (GitHub, LinkedIn)

## Features

- 🌓 Dark/Light theme toggle (persisted in localStorage)
- 🌐 i18n EN/RU language switch (persisted in localStorage)
- 🎯 Project filtering by category
- 🖼️ Modal detail views for projects
- ✨ Particle system with mouse interaction
- 🖱️ Custom cursor glow
- 📜 Smooth scroll animations (Intersection Observer)
- 📱 Fully responsive

## Deploy to GitHub Pages

### Option 1: Deploy from `portfolio/` folder in existing repo

1. Push this repo to GitHub
2. Go to repo **Settings → Pages**
3. Under "Source", select **Deploy from a branch**
4. Branch: `main`, folder: `/portfolio`
5. Click **Save**
6. Your site will be live at `https://<username>.github.io/<repo>/`

### Option 2: Deploy as user/organization site

1. Create a repo named `<username>.github.io`
2. Copy `portfolio/` contents into the repo root
3. Push to `main` branch
4. Site will be live at `https://<username>.github.io/`

### Option 3: Deploy with Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the `portfolio/` directory
3. Follow the prompts

## Local Development

Just open `index.html` in your browser — no build step needed.

```bash
# Or serve locally with any static server
npx serve portfolio/
```

## Customization

- Edit [`js/data.js`](js/data.js) to add/remove projects, skills, education, or translations
- Update email and social links in [`index.html`](index.html)
- Tweak colors and fonts in [`css/theme.css`](css/theme.css) and [`css/components.css`](css/components.css)