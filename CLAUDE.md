# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static replica of the official BUGATTI website built with vanilla HTML, CSS, and JavaScript. There is no build step, no package manager, and no test suite — the entire site is three files.

## Running the site

Open `index.html` directly in a browser. No server is required.

For a local dev server (enables hot-reload via browser tools):

```bash
python3 -m http.server 8080
# or
npx serve .
```

## Architecture

The project is intentionally minimal:

- **`index.html`** — single HTML file containing all markup, section structure, and inline background-image URLs (Unsplash CDN placeholders)
- **`css/style.css`** — all styles in one file, ordered: design tokens → reset → typography → buttons → header → menu → hero → sections → footer → animations → responsive
- **`js/script.js`** — single IIFE with four behaviours: header scroll effect, fullscreen menu overlay, scroll-reveal via `IntersectionObserver`, and parallax on the first hero

## CSS design system

All design tokens live in `:root` at the top of `style.css`:

- **Colors**: `--bg` (#000), `--bg-card`, `--bg-soft`, `--text`, `--text-muted`, `--text-dim`, `--accent` (#BB0A30 — Bugatti red), `--border`, `--border-strong`
- **Fonts**: `--font-mono` (Space Mono), `--font-sans` (Inter), `--font-script` (Allura)
- **Layout**: `--header-h` (72px), `--max-w` (1440px), `--pad-x` (fluid clamp)

Typography classes map to fonts: `.section-title` → mono, `.script-title` → script (Allura, used for car model names), `.mono-title` → mono uppercase.

## JavaScript patterns

`js/script.js` is a single strict-mode IIFE. State is driven entirely by CSS classes toggled from JS:

- `.scrolled` added to `#siteHeader` once `scrollY > 60`
- `.open` / `aria-hidden` toggled on `#menuOverlay`
- `.visible` added to `.reveal` elements by `IntersectionObserver` (threshold 0.12, fires once then unobserves)

Scroll listeners use `{ passive: true }`. Smooth anchor scrolling manually offsets by `--header-h` to account for the fixed header.

## Responsive breakpoints

| Breakpoint | Key changes |
|---|---|
| ≤ 1024px | 3-col grids drop to 2-col; Sur Mesure grid goes single column |
| ≤ 768px | Header collapses labels; most grids go single column; `--header-h` → 60px |
| ≤ 480px | Button and logo font sizes reduced |

## Images

All images are Unsplash CDN URLs (`images.unsplash.com`). For production, replace with licensed Bugatti imagery. The hero background is set via `.hero-fkp .hero-bg { background: url(...) }` in CSS; all other images are inline `style="background-image:url(...)"` on their respective elements in HTML.
