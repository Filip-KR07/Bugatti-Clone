# MTM Demo

Demo-Website für **MTM – Motoren Technik Mayer** (https://www.mtm-online.de) — Tuning und Individualisierung für Audi, VW, Bentley, Lamborghini und Porsche. Aufgebaut mit reinem HTML, CSS und JavaScript. Kein Build-Schritt nötig.

Die Seite teilt sich denselben Vanilla-Aufbau wie die ursprüngliche Bugatti-Vorlage (Header-Scroll, Fullscreen-Menü, Scroll-Reveal, Parallax-Hero).

## Struktur

```
Bugatti-Clone/
├── index.html        # MTM Demo (Single-Page)
├── css/style.css     # Alle Styles (Designsystem, Komponenten, Responsive)
├── js/script.js      # Header-Scroll, Menü-Overlay, Scroll-Reveal, Parallax
└── renault/          # Zweite Demo: Autohaus S+K (Renault & Dacia Hamburg-Harburg)
    ├── index.html
    ├── css/style.css
    ├── js/script.js
    └── IMG_*.jpeg/png # Lokale Fahrzeugbilder
```

## Demos

- **MTM** — im Projekt-Root, `index.html` direkt öffnen.
- **Renault (Autohaus S+K)** — `renault/index.html` öffnen.

Die Bugatti-Originalvorlage bleibt jederzeit in der Git-Historie erhalten (Commit `43f2033`).

## Lokale Vorschau

`index.html` (bzw. `renault/index.html`) einfach im Browser öffnen — kein Server nötig.

## Hinweise

- MTM-Bilder sind CDN-Platzhalter (Unsplash). Für die Produktion durch lizenzierte MTM-Aufnahmen ersetzen.
- Schriften: Inter + Space Mono + Oswald (Google Fonts), Akzentfarbe MTM-Rot `#E2001A`.
- Designt für Desktop ≥1024px, responsiv bis 480px.
