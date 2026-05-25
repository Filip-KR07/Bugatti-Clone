# Bugatti Clone

Replica of the official BUGATTI website (https://www.bugatti.com) — built with vanilla HTML, CSS and JavaScript. No build step required.

## Structure

```
Bugatti-Clone/
├── index.html      # Single-page site
├── css/style.css   # All styles (design system, components, responsive)
├── js/script.js    # Header scroll, menu overlay, scroll reveal, parallax
└── img/            # Local image assets (currently uses Unsplash CDN placeholders)
```

## Sections

1. Header (sticky, transparent → solid on scroll)
2. Hero "F.K.P. Hommage" with parallax bg
3. Hero "Solitaire" (script logo)
4. La Maison Bugatti (3-card grid)
5. Handwritten quote
6. Our Hyper Sports Cars (6-card grid)
7. Bugatti Sur Mesure
8. Instagram feed (6 posts)
9. Footer (4 columns + legal)
10. Background watermark

## Local preview

Just open `index.html` in a browser — no server required.

## Notes

- Images are CDN placeholders (Unsplash). For production, swap with licensed Bugatti imagery.
- Fonts: Inter + Space Mono + Allura (Google Fonts).
- Designed for desktop ≥1024px, responsive down to 480px.
