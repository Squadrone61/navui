# CLAUDE.md — navui

Portfolio site as a fake retro PC desktop. Files/folders instead of pages. CRT aesthetic.

## Commands

npm run dev      # Dev server (localhost:5173)
npm run build    # tsc + vite build
npm run preview  # Preview production build

## Tech Stack

- React 19 + TypeScript, Vite 7
- motion (v12) — `import { motion } from "motion/react"`
- Zustand v5 — `create<T>()(...)` double parens for TS
- Tailwind v4 — CSS-first config via `@theme` in index.css, no tailwind.config
- react-markdown

## Architecture

src/
  App.tsx                    # CRT turn-on + skew wrappers -> Desktop
  index.css                  # Tailwind + @theme tokens + CRT CSS + window animations
  types/index.ts             # Position, Size, WindowState, FileEntry, FileType
  store/windowStore.ts       # Window state (open/close/focus/drag/resize/z-order)
  data/fileSystem.ts         # Virtual file tree + helpers (getFileEntry, getDesktopIcons, etc.)
  hooks/                     # useClock, useOnlineStatus, useResize, useRetroDrag, useHashSync
  components/
    crt/CRTOverlay.tsx       # Scanlines + vignette + chromatic glitch
    desktop/                 # Desktop.tsx, Wallpaper.tsx, DesktopIcon.tsx, DesktopIconGrid.tsx, StatusBar.tsx
    window/                  # Window, WindowTitleBar, WindowControls, WindowContent, WindowManager
    renderers/               # MarkdownViewer, TextViewer, FileExplorer, LinkLauncher, PdfViewer
  icons/                     # Inline SVG pixel icons (16x16 viewBox, currentColor)
  content/                   # about-me.md, contact.txt, links.txt (loaded via ?raw imports)

## Key Systems

**Window Manager** (windowStore.ts): Zustand store tracking open windows, positions, sizes, z-order, focus. openWindow deduplicates. focusWindow bumps zIndex.

**Virtual File System** (fileSystem.ts): Static record of FileEntry objects. Types: markdown, text, folder, link, pdf. Content loaded via dynamic `import('...?raw')`.

**CRT Overlay** (CRTOverlay.tsx + index.css): Fixed viewport overlay. Scanlines, vignette, chromatic glitch, wave. Content-level skew + flicker applied via App.tsx wrapper. All pointer-events-none.

## Design Rules

- Desktop icons: Just icon + label. ALL icons are green (#33ff33).
- NO placeholders: every UI element must be functional or show real content
- Windows: sharp corners (no border-radius), 1px green border, inset bevel shadows
- Fonts: Press Start 2P (headings, labels), IBM Plex Mono (body, code)
- Colors: green #33ff33 (primary), amber #ffb000 (headings in markdown), cyan #00d4ff (links), bg #0a0a0a

## CRT Effect References

- Overall CRT technique: http://aleclownes.com/2017/02/01/crt-display.html
  - Scanlines
  - Screen-door RGB
  - Flicker
  - Color Seperation
- Overlay Scanlines pen: https://codepen.io/chris22smith/pen/YZPrjr

## Window Drag Behavior

Use a staggered/stepped movement like a low-end retro PC — the window follows the cursor but with visible lag, as if redrawing frame-by-frame. No elastic overshoot.
