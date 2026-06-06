# Website Starter

Eine schlanke, neutrale Startvorlage für neue Websites mit reinem HTML, CSS und
JavaScript — **kein Build-Schritt, kein Paketmanager**. Kopiere diesen Ordner an
den Anfang eines neuen Projekts und leg los.

## Schnellstart

1. Den Ordner `starter/` kopieren und z. B. in `mein-projekt/` umbenennen.
2. `index.html` im Browser öffnen — fertig.

Für einen lokalen Dev-Server (mit Auto-Reload über Browser-Tools):

```bash
python3 -m http.server 8080
# oder
npx serve .
```

## Struktur

```
starter/
├── index.html          # HTML-Boilerplate, bindet nur css/main.css + js/main.js ein
├── css/
│   ├── main.css        # Einstiegspunkt — importiert alle anderen CSS-Dateien
│   ├── tokens.css      # Design-Tokens (Farben, Fonts, Abstände) — HIER anpassen
│   ├── reset.css       # Moderner CSS-Reset
│   ├── typography.css  # Überschriften & Text-Utilities
│   ├── buttons.css     # Button-Varianten (.btn-primary / -outline / -ghost)
│   └── layout.css      # Header, Hero, Grid, Card, Footer, Reveal, Responsive
├── js/
│   └── main.js         # Header-Scroll, Menü-Toggle, Scroll-Reveal, Smooth-Scroll
└── README.md
```

## Anpassen

**Das Wichtigste zuerst:** Öffne `css/tokens.css` und ändere die Werte unter
`:root`. Alles andere liest aus diesen Variablen — eine Änderung hier wirkt
überall.

- **Farben:** `--bg`, `--text`, `--accent`, …
- **Fonts:** `--font-sans`, `--font-mono` (passe auch den Google-Fonts-Link in
  `index.html` an oder entferne ihn)
- **Layout:** `--max-w`, `--header-h`, `--section-pad`

Es gibt ein optionales helles Theme: `<html class="theme-light">` setzen.

## Komponenten-Spickzettel

| Element        | Klasse(n)                                            |
|----------------|------------------------------------------------------|
| Container      | `.container`                                         |
| Buttons        | `.btn` + `.btn-primary` / `.btn-outline` / `.btn-ghost` (`.btn-sm` / `.btn-lg`) |
| Karte          | `.card`                                              |
| Raster         | `.grid` (3 Spalten → 2 → 1 responsive)               |
| Überschrift    | `.section-title`, `.mono-title`, `.eyebrow`          |
| Scroll-Reveal  | `.reveal` (wird per JS zu `.visible`)                |

## JavaScript

`js/main.js` ist eine einzelne strict-mode IIFE und schaltet nur CSS-Klassen:

- `.scrolled` am Header ab `scrollY > 60`
- `.open` an `.nav` über den `.menu-toggle`-Button
- `.visible` an `.reveal`-Elementen via `IntersectionObserver`
- Smooth-Scroll für `a[href^="#"]` mit Header-Offset

Nicht benötigte Behaviours einfach löschen.
