# Cybersecurity Portfolio — Complete AI Agent Guide
> Stack: React.js (Vite) + Tailwind CSS + Spline + Framer Motion  
> Developer: Based in Sri Lanka | Frontend: Flutter, React JS, React Native  
> Reference: "JACKAI" dark cybersecurity portfolio  
> Spline Scene URL: `https://prod.spline.design/MjJDbl-AohsHLMCw/scene.splinecode`

---

## Table of Contents
1. [Design System](#1-design-system)
2. [Project Setup](#2-project-setup)
3. [File Structure](#3-file-structure)
4. [Spline Integration](#4-spline-integration)
5. [Spline Test Page (HTML — no build needed)](#5-spline-test-page-html--no-build-needed)
6. [Shared Motion Config](#6-shared-motion-config)
7. [Hooks](#7-hooks)
8. [App.jsx](#8-appjsx)
9. [Navbar Component](#9-navbar-component)
10. [Hero Section Component](#10-hero-section-component)
11. [Projects Section Component](#11-projects-section-component)
12. [About Section Component](#12-about-section-component)
13. [Contact Section Component](#13-contact-section-component)
14. [Tailwind Config](#14-tailwind-config)
15. [Key CSS Patterns](#15-key-css-patterns)
16. [Animation Reference](#16-animation-reference)
17. [Deployment](#17-deployment)
18. [Common Mistakes](#18-common-mistakes)
19. [Reference Screenshots Description](#19-reference-screenshots-description)

---

## 1. Design System

### Color Tokens
| Name | Value | Usage |
|------|-------|-------|
| Page background | `#0A0A0A` | `<body>` and all section backgrounds |
| Surface | `#111111` | Cards, panels |
| Surface elevated | `#1a1a1a` | Mockup areas, inputs inside cards |
| Accent orange | `#E8593C` | CTA button, one accent word, primary social icon |
| Border default | `rgba(255,255,255,0.10)` | All card/panel borders |
| Border hover | `rgba(255,255,255,0.20)` | Hover state borders |
| Glass background | `rgba(255,255,255,0.07)` | Frosted glass cards |
| Glass border | `rgba(255,255,255,0.12)` | Frosted glass borders |
| Text primary | `#ffffff` | Headings |
| Text secondary | `rgba(255,255,255,0.50)` | Body text, descriptions |
| Text muted | `rgba(255,255,255,0.30)` | Labels, hints, bottom bar |
| Text hint | `rgba(255,255,255,0.25)` | Placeholder text |

### Typography
- **Display font:** Clash Display (from Fontshare — free) or Bebas Neue (Google Fonts)
- **Body font:** System UI / Segoe UI fallback
- **Mono font:** System monospace (for hex labels like `0X7A`)
- Hero name: `clamp(80px, 18vw, 260px)`, `font-weight: 900`
- Tagline: `clamp(28px, 4.5vw, 62px)`, `font-weight: 900`
- Section bg text: `clamp(80px, 18vw, 220px)`, `opacity: 0.06`
- Card title: `16px`, `font-weight: 600`
- Body/description: `14px`, `font-weight: 400`, `line-height: 1.6`
- Tags/labels: `11px`, uppercase, `letter-spacing: 0.08em`

### Z-index System (Hero Section)
```
z-0   → Giant name text (position: absolute, pointer-events: none)
z-1   → Orange radial glow overlay
z-9   → Loading spinner (removed after Spline loads)
z-10  → Spline 3D scene (position: absolute, fills full section)
z-20  → Floating UI: tagline, contact card, bottom bar
z-50  → Navbar (position: fixed)
```

### Accent Rule
Orange (`#E8593C`) appears in exactly **3 places**:
1. "View Projects" CTA button in navbar
2. One word in the tagline ("Systems")
3. The primary social icon (LinkedIn) in the contact card

Do not add orange anywhere else. Restraint is what makes it pop.

---

## 2. Project Setup

### Install (Vite + React)
```bash
npm create vite@latest my-portfolio -- --template react
cd my-portfolio
npm install
npm install tailwindcss @tailwindcss/vite
npm install framer-motion
npm install @splinetool/react-spline @splinetool/runtime
npm install react-router-dom
```

### vite.config.js
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

### src/index.css
```css
@import "tailwindcss";

@import url('https://api.fontshare.com/v2/css?f[]=clash-display@700,600,500&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #0A0A0A;
  color: #ffffff;
  font-family: 'Clash Display', system-ui, sans-serif;
  overflow-x: hidden;
}

/* Hide scrollbar for horizontal scroll sections */
.scrollbar-none {
  scrollbar-width: none;
  -ms-overflow-style: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
```

---

## 3. File Structure

```
my-portfolio/
├── public/
│   └── hero-fallback.png        ← static PNG shown on mobile instead of Spline
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── ProjectsSection.jsx
│   │   ├── AboutSection.jsx
│   │   └── ContactSection.jsx
│   ├── motion/
│   │   └── variants.js          ← all Framer Motion variants in one place
│   ├── hooks/
│   │   └── useLiveTime.js       ← live clock for Sri Lanka timezone
│   ├── data/
│   │   └── projects.js          ← project data array
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── vite.config.js
└── package.json
```

---

## 4. Spline Integration

### The Scene
- **Scene URL:** `https://prod.spline.design/MjJDbl-AohsHLMCw/scene.splinecode`
- **Model:** Custom humanoid robot
- **Background:** Transparent (set in Spline editor: Environment → Background opacity → 0)
- **Lighting:** Warm orange-brown point light from behind the model

### IMPORTANT: Correct Import for Vite + React
```jsx
// ✅ CORRECT for Vite + React
import Spline from '@splinetool/react-spline'

// ❌ WRONG — /next suffix is only for Next.js (disables SSR)
import Spline from '@splinetool/react-spline/next'
```

### React Embed Pattern (with lazy loading)
```jsx
import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

function SplineScene() {
  return (
    <Suspense fallback={<SplineFallback />}>
      {!isMobile ? (
        <Spline
          scene="https://prod.spline.design/MjJDbl-AohsHLMCw/scene.splinecode"
          className="w-full h-full"
        />
      ) : (
        <img
          src="/hero-fallback.png"
          alt="Hero visual"
          className="w-full h-full object-cover object-center"
        />
      )}
    </Suspense>
  )
}

function SplineFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#E8593C] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
```

### Performance Rules
- Always wrap in `React.lazy` + `Suspense` — Spline scenes are 1–5 MB
- Show a static PNG fallback on `window.innerWidth < 768`
- Only embed Spline in the Hero section — never in other sections
- In Spline editor: reduce polygon count, use max 2–3 lights, disable unused physics
- The scene streams from Spline's CDN — you do not host it yourself

### Plain HTML Embed (no React — for testing)
```html
<script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js"></script>

<spline-viewer
  url="https://prod.spline.design/MjJDbl-AohsHLMCw/scene.splinecode"
  loading-anim-type="none"
></spline-viewer>
```

---

## 5. Spline Test Page (HTML — no build needed)

This is a **complete single-file HTML page** to verify the Spline scene works before building the React app. Open directly in any browser — no npm, no build step required.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Spline Robot — Test</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      background: #0A0A0A;
      color: #fff;
      font-family: 'Segoe UI', system-ui, sans-serif;
      min-height: 100vh;
      overflow-x: hidden;
    }

    nav {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 50;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px 40px;
    }

    .nav-left {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .pill-btn {
      display: flex;
      align-items: center;
      gap: 8px;
      border: 1px solid rgba(255,255,255,0.2);
      border-radius: 999px;
      padding: 8px 18px;
      font-size: 13px;
      color: #fff;
      background: transparent;
      cursor: pointer;
      transition: background .15s;
    }
    .pill-btn:hover { background: rgba(255,255,255,0.07); }

    .pill-orange {
      background: #E8593C;
      border-color: #E8593C;
      color: #fff;
      font-weight: 500;
    }
    .pill-orange:hover { filter: brightness(1.1); background: #E8593C; }

    .nav-location {
      font-size: 13px;
      color: rgba(255,255,255,0.35);
    }

    .hero {
      position: relative;
      height: 100vh;
      width: 100%;
      overflow: hidden;
    }

    .hero-name {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 0;
      pointer-events: none;
      user-select: none;
    }
    .hero-name span {
      font-size: clamp(80px, 18vw, 260px);
      font-weight: 900;
      letter-spacing: -0.04em;
      line-height: 1;
      color: #fff;
      text-align: center;
    }

    .hero-glow {
      position: absolute;
      inset: 0;
      z-index: 1;
      pointer-events: none;
      background: radial-gradient(ellipse 55% 65% at 50% 50%,
        rgba(180, 60, 20, 0.45) 0%,
        rgba(140, 40, 10, 0.2) 40%,
        transparent 70%);
    }

    .spline-wrap {
      position: absolute;
      inset: 0;
      z-index: 10;
    }

    spline-viewer {
      width: 100%;
      height: 100%;
    }

    .spline-loader {
      position: absolute;
      inset: 0;
      z-index: 9;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 14px;
      pointer-events: none;
      transition: opacity 0.5s;
    }
    .spline-loader.hidden { opacity: 0; }

    .spinner {
      width: 32px; height: 32px;
      border: 2px solid rgba(232, 89, 60, 0.3);
      border-top-color: #E8593C;
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    .loader-text {
      font-size: 12px;
      color: rgba(255,255,255,0.35);
      letter-spacing: 0.1em;
      text-transform: uppercase;
    }

    .scene-status {
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 20;
      font-size: 11px;
      font-family: monospace;
      color: rgba(255,255,255,0.3);
      letter-spacing: 0.15em;
      pointer-events: none;
    }

    .hero-ui {
      position: absolute;
      inset: 0;
      z-index: 20;
      pointer-events: none;
    }

    .tagline {
      position: absolute;
      bottom: 70px;
      left: 40px;
      pointer-events: auto;
    }
    .tagline h2 {
      font-size: clamp(28px, 4.5vw, 62px);
      font-weight: 900;
      line-height: 1.05;
      letter-spacing: -0.02em;
    }
    .tagline .strike {
      text-decoration: line-through;
      color: rgba(255,255,255,0.3);
      animation: glitch 3.5s ease-in-out infinite;
    }
    .tagline .accent { color: #E8593C; }

    @keyframes glitch {
      0%, 88% { opacity: 1; }
      89% { opacity: 0; }
      90% { opacity: 1; }
      94% { opacity: 0; }
      95%, 100% { opacity: 1; }
    }

    .pills {
      display: flex;
      gap: 8px;
      margin-top: 20px;
    }
    .stat-pill {
      border: 1px solid rgba(255,255,255,0.15);
      border-radius: 999px;
      padding: 6px 14px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .pill-label {
      font-size: 8px;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: rgba(255,255,255,0.35);
      margin-bottom: 1px;
    }
    .pill-value {
      font-size: 12px;
      font-weight: 600;
      color: #fff;
    }

    .contact-card {
      position: absolute;
      bottom: 70px;
      right: 40px;
      width: 280px;
      pointer-events: auto;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 20px;
      padding: 20px;
    }
    .contact-card h3 {
      font-size: 15px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    .contact-card p {
      font-size: 12px;
      color: rgba(255,255,255,0.45);
      margin-bottom: 16px;
    }
    .social-icons {
      display: flex;
      gap: 8px;
      margin-bottom: 14px;
    }
    .icon-btn {
      width: 36px; height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      cursor: pointer;
      transition: all .15s;
      border: 1px solid rgba(255,255,255,0.12);
      background: rgba(255,255,255,0.08);
      color: rgba(255,255,255,0.6);
    }
    .icon-btn:hover { background: rgba(255,255,255,0.18); }
    .icon-btn.orange { background: #E8593C; border-color: #E8593C; color: #fff; }

    .email-row {
      display: flex;
      gap: 8px;
    }
    .email-input {
      flex: 1;
      background: rgba(255,255,255,0.07);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 12px;
      padding: 10px 14px;
      font-size: 13px;
      color: #fff;
      outline: none;
      transition: border-color .15s;
    }
    .email-input::placeholder { color: rgba(255,255,255,0.25); }
    .email-input:focus { border-color: rgba(255,255,255,0.28); }

    .send-btn {
      width: 40px; height: 40px;
      background: #E8593C;
      border: none;
      border-radius: 50%;
      color: #fff;
      font-size: 16px;
      cursor: pointer;
      transition: filter .15s;
      flex-shrink: 0;
    }
    .send-btn:hover { filter: brightness(1.15); }

    .bottom-bar {
      position: absolute;
      bottom: 18px;
      left: 40px; right: 40px;
      z-index: 20;
      display: flex;
      justify-content: space-between;
      align-items: center;
      pointer-events: none;
    }
    .bottom-bar span {
      font-size: 11px;
      color: rgba(255,255,255,0.25);
    }

    .test-badge {
      position: fixed;
      top: 18px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 100;
      background: rgba(232, 89, 60, 0.15);
      border: 1px solid rgba(232, 89, 60, 0.35);
      border-radius: 999px;
      padding: 5px 14px;
      font-size: 11px;
      color: #E8593C;
      letter-spacing: 0.08em;
      font-weight: 500;
      pointer-events: none;
    }
  </style>
</head>
<body>

  <div class="test-badge">● SPLINE TEST PAGE</div>

  <nav>
    <div class="nav-left">
      <button class="pill-btn">☰ &nbsp; Menu</button>
      <span class="nav-location">/ &nbsp; Sri Lanka – <span id="clock">--:-- --</span></span>
    </div>
    <div style="display:flex;gap:10px">
      <button class="pill-btn">Bug Bounty &nbsp; ›</button>
      <button class="pill-btn pill-orange">View Projects</button>
    </div>
  </nav>

  <section class="hero">

    <div class="hero-name">
      <span>YOUR NAME</span>
    </div>

    <div class="hero-glow"></div>

    <div class="spline-loader" id="loader">
      <div class="spinner"></div>
      <span class="loader-text">Loading 3D scene…</span>
    </div>

    <div class="spline-wrap">
      <spline-viewer
        id="spline"
        url="https://prod.spline.design/MjJDbl-AohsHLMCw/scene.splinecode"
        loading-anim-type="none"
      ></spline-viewer>
    </div>

    <div class="scene-status">0X7A</div>

    <div class="hero-ui">

      <div class="tagline">
        <h2>
          Breaking<br>
          <span class="strike">Web</span> <span class="accent">Systems</span><br>
          Responsibly
        </h2>
        <div class="pills">
          <div class="stat-pill">
            <span class="pill-label">Status</span>
            <span class="pill-value">Active</span>
          </div>
          <div class="stat-pill">
            <span class="pill-label">Focus</span>
            <span class="pill-value">WebSec</span>
          </div>
          <div class="stat-pill">
            <span class="pill-label">THM</span>
            <span class="pill-value">Top 2%</span>
          </div>
        </div>
      </div>

      <div class="contact-card">
        <h3>Contact by Email</h3>
        <p>Enter your email and I will get back to you.</p>
        <div class="social-icons">
          <button class="icon-btn orange" title="LinkedIn">in</button>
          <button class="icon-btn" title="GitHub">gh</button>
          <button class="icon-btn" title="Twitter">tw</button>
          <button class="icon-btn" title="Discord">dc</button>
        </div>
        <div class="email-row">
          <input class="email-input" type="email" placeholder="Your Email" />
          <button class="send-btn">→</button>
        </div>
      </div>

    </div>

    <div class="bottom-bar">
      <span>Built with purpose. Crafted with precision.</span>
      <span>↓ &nbsp; Scroll to explore</span>
    </div>

  </section>

  <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.96/build/spline-viewer.js"></script>

  <script>
    function updateClock() {
      const t = new Date().toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit'
      })
      document.getElementById('clock').textContent = t
    }
    updateClock()
    setInterval(updateClock, 1000)

    const viewer = document.getElementById('spline')
    const loader = document.getElementById('loader')

    viewer.addEventListener('load', () => {
      loader.classList.add('hidden')
      setTimeout(() => loader.remove(), 600)
    })

    setTimeout(() => loader.classList.add('hidden'), 12000)
  </script>

</body>
</html>
```

**How to use this file:**
1. Save as `spline-test.html`
2. Double-click to open in Chrome or Edge
3. If the robot appears → scene URL works → safe to use in React
4. If blank / broken → check browser console for CORS or network errors

---

## 6. Shared Motion Config

**`src/motion/variants.js`**

```js
export const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
}

export const slideInLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const cardItem = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}
```

---

## 7. Hooks

**`src/hooks/useLiveTime.js`**

```js
import { useState, useEffect } from 'react'

export function useLiveTime(timezone = 'Asia/Colombo') {
  const [time, setTime] = useState('')

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString('en-US', {
          timeZone: timezone,
          hour: '2-digit',
          minute: '2-digit',
        })
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [timezone])

  return time
}
```

---

## 8. App.jsx

```jsx
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import ProjectsSection from './components/ProjectsSection'
import AboutSection from './components/AboutSection'
import ContactSection from './components/ContactSection'

export default function App() {
  return (
    <main className="bg-[#0A0A0A] text-white overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <AboutSection />
      <ContactSection />
    </main>
  )
}
```

---

## 9. Navbar Component

**`src/components/Navbar.jsx`**

```jsx
import { useLiveTime } from '../hooks/useLiveTime'

export default function Navbar() {
  const time = useLiveTime('Asia/Colombo')

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5">

      {/* Left: menu + location/time */}
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">
          <span>☰</span>
          Menu
        </button>
        <span className="text-white/35 text-sm hidden md:block">
          / &nbsp; Sri Lanka – {time}
        </span>
      </div>

      {/* Right: Bug Bounty pill + CTA */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 border border-white/20 rounded-full px-4 py-2 text-sm text-white hover:bg-white/5 transition-colors">
          Bug Bounty
          <span className="text-white/40">›</span>
        </button>
        <button className="bg-[#E8593C] text-white rounded-full px-5 py-2 text-sm font-medium hover:brightness-110 transition-all">
          View Projects
        </button>
      </div>

    </nav>
  )
}
```

---

## 10. Hero Section Component

**`src/components/HeroSection.jsx`**

```jsx
import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { fadeUp, slideInLeft } from '../motion/variants'

const Spline = lazy(() => import('@splinetool/react-spline'))

const SPLINE_SCENE = 'https://prod.spline.design/MjJDbl-AohsHLMCw/scene.splinecode'
const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-[#0A0A0A]">

      {/* z-0: Giant name text — behind everything */}
      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none select-none">
        <h1
          className="font-black text-white leading-none tracking-tighter text-center"
          style={{ fontSize: 'clamp(80px, 18vw, 260px)' }}
        >
          YOUR NAME
        </h1>
      </div>

      {/* z-1: Orange radial glow */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 55% 65% at 50% 50%, rgba(180,60,20,0.45) 0%, rgba(140,40,10,0.2) 40%, transparent 70%)'
        }}
      />

      {/* z-10: Spline 3D scene */}
      <div className="absolute inset-0 z-10">
        {!isMobile ? (
          <Suspense fallback={<SplineFallback />}>
            <Spline
              scene={SPLINE_SCENE}
              className="w-full h-full"
            />
          </Suspense>
        ) : (
          <img
            src="/hero-fallback.png"
            alt="Hero visual"
            className="w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* z-20: Hex label */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 z-20 pointer-events-none">
        <span className="font-mono text-[11px] text-white/25 tracking-[0.15em]">0X7A</span>
      </div>

      {/* z-20: Floating UI layer */}
      <div className="absolute inset-0 z-20 pointer-events-none">

        {/* Tagline — bottom left */}
        <motion.div
          className="absolute bottom-16 left-10 pointer-events-auto"
          variants={slideInLeft}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.3 }}
        >
          <h2
            className="font-black text-white leading-[1.05] tracking-tight"
            style={{ fontSize: 'clamp(28px, 4.5vw, 62px)' }}
          >
            Breaking<br />
            <span
              className="text-white/30 line-through"
              style={{ animation: 'glitch 3.5s ease-in-out infinite' }}
            >
              Web
            </span>
            {' '}
            <span className="text-[#E8593C]">Systems</span>
            <br />
            Responsibly
          </h2>

          {/* Status pills */}
          <div className="flex gap-2 mt-5">
            {[
              { label: 'STATUS', value: 'Active' },
              { label: 'FOCUS',  value: 'WebSec' },
              { label: 'THM',    value: 'Top 2%' },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="border border-white/15 rounded-full px-3 py-1.5 flex flex-col items-center"
              >
                <span className="text-[8px] font-semibold tracking-widest uppercase text-white/35 mb-0.5">
                  {label}
                </span>
                <span className="text-xs font-semibold text-white">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Contact card — bottom right */}
        <motion.div
          className="absolute bottom-16 right-10 w-72 pointer-events-auto"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.5 }}
        >
          <ContactCard />
        </motion.div>

      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-5 left-10 right-10 z-20 flex justify-between pointer-events-none">
        <span className="text-[11px] text-white/25">Built with purpose. Crafted with precision.</span>
        <span className="text-[11px] text-white/25 flex items-center gap-1.5">↓ Scroll to explore</span>
      </div>

      {/* Glitch keyframe */}
      <style>{`
        @keyframes glitch {
          0%, 88% { opacity: 1; }
          89%      { opacity: 0; }
          90%      { opacity: 1; }
          94%      { opacity: 0; }
          95%, 100%{ opacity: 1; }
        }
      `}</style>

    </section>
  )
}

function ContactCard() {
  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <h3 className="text-white font-semibold text-[15px] mb-1">Contact by Email</h3>
      <p className="text-white/45 text-xs mb-4">Enter your email and I will get back to you.</p>

      {/* Social icons */}
      <div className="flex gap-2 mb-4">
        {[
          { label: 'in',  orange: true  },
          { label: 'gh',  orange: false },
          { label: 'tw',  orange: false },
          { label: 'dc',  orange: false },
        ].map(({ label, orange }) => (
          <button
            key={label}
            className={`w-9 h-9 rounded-full text-sm font-medium transition-all flex items-center justify-center
              ${orange
                ? 'bg-[#E8593C] text-white border-[#E8593C] border'
                : 'bg-white/8 text-white/60 border border-white/12 hover:bg-white/15'
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Email input row */}
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="Your Email"
          className="flex-1 rounded-xl px-4 py-2.5 text-sm text-white outline-none transition-colors"
          style={{
            background: 'rgba(255,255,255,0.07)',
            border: '1px solid rgba(255,255,255,0.10)',
          }}
          onFocus={e => e.target.style.borderColor = 'rgba(255,255,255,0.28)'}
          onBlur={e  => e.target.style.borderColor = 'rgba(255,255,255,0.10)'}
        />
        <button className="w-10 h-10 bg-[#E8593C] rounded-full text-white text-base hover:brightness-110 transition-all flex-shrink-0 flex items-center justify-center">
          →
        </button>
      </div>
    </div>
  )
}

function SplineFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#E8593C] border-t-transparent rounded-full animate-spin" />
    </div>
  )
}
```

---

## 11. Projects Section Component

**`src/components/ProjectsSection.jsx`**

```jsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, cardItem } from '../motion/variants'

const projects = [
  {
    id: 1,
    title: 'Jmap – JS & Endpoint Discovery',
    description: 'Browser extension and dashboard for web recon that captures JS files, discovers endpoints in real time, and scans for exposed secrets and API keys.',
    tags: ['Browser Extension', 'Recon', 'JavaScript', 'Web Security'],
    github: 'https://github.com/yourusername/jmap',
    mockupImg: null, // replace with: '/mockups/jmap.png'
  },
  {
    id: 2,
    title: 'Keylogger Malware',
    description: 'Windows keylogger built for offensive security research that captures keystrokes and delivers logs to a Discord webhook after inactivity.',
    tags: ['Windows', 'Malware', 'OffSec', 'Python'],
    github: 'https://github.com/yourusername/keylogger',
    mockupImg: null,
  },
  {
    id: 3,
    title: 'CyberSage – Security Scanner',
    description: 'AI-powered web application designed to analyze server logs and identify potential security threats and suspicious activity.',
    tags: ['AI', 'Security', 'Logs', 'Web App'],
    github: 'https://github.com/yourusername/cybersage',
    mockupImg: null,
  },
]

export default function ProjectsSection() {
  return (
    <section className="relative py-24 overflow-hidden">

      {/* Giant background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span
          className="font-black text-white leading-none tracking-tighter"
          style={{ fontSize: 'clamp(80px, 18vw, 220px)', opacity: 0.06 }}
        >
          PROJECTS
        </span>
      </div>

      <div className="relative z-10 px-10">

        {/* Section label */}
        <motion.p
          className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/35 mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Showcase
        </motion.p>

        {/* Horizontal scroll cards */}
        <motion.div
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardItem}
              className="flex-shrink-0 w-[320px] md:w-[360px] snap-start rounded-2xl p-5 flex flex-col gap-4 transition-colors"
              style={{
                background: '#111111',
                border: '1px solid rgba(255,255,255,0.10)',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.20)'}
              onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.10)'}
            >
              {/* Mockup area */}
              <div
                className="w-full h-44 rounded-xl overflow-hidden flex items-center justify-center"
                style={{ background: '#1a1a1a' }}
              >
                {project.mockupImg ? (
                  <img
                    src={project.mockupImg}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-white/20 text-xs tracking-widest uppercase">Preview</span>
                )}
              </div>

              {/* Title + description */}
              <div className="flex-1">
                <h3 className="text-white font-semibold text-base leading-snug mb-2">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags + GitHub icon */}
              <div className="flex items-end justify-between gap-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] text-white/50 rounded-full px-2.5 py-0.5"
                      style={{ border: '1px solid rgba(255,255,255,0.15)' }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white/50 text-xs font-mono transition-all hover:text-white"
                  style={{
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.12)',
                  }}
                  aria-label="GitHub"
                >
                  gh
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
```

---

## 12. About Section Component

**`src/components/AboutSection.jsx`**

```jsx
import { motion } from 'framer-motion'
import { fadeUp, staggerContainer, cardItem } from '../motion/variants'

const stats = [
  { value: '50+',  label: 'CVEs Found'     },
  { value: '12+',  label: 'Bug Bounties'   },
  { value: 'Top 2%', label: 'TryHackMe'   },
  { value: '3+',   label: 'Years Active'   },
]

const skills = [
  'Web Recon', 'XSS', 'SQLi', 'SSRF', 'API Security',
  'Python', 'JavaScript', 'Burp Suite', 'Nmap', 'OSINT',
]

export default function AboutSection() {
  return (
    <section className="relative py-24 px-10">

      <motion.p
        className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/35 mb-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        About
      </motion.p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

        {/* Left: bio */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2
            className="font-black text-white leading-tight tracking-tight mb-6"
            style={{ fontSize: 'clamp(28px, 4vw, 52px)' }}
          >
            Focused on breaking<br />
            <span className="text-[#E8593C]">web systems</span><br />
            responsibly.
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Security researcher and frontend developer based in Sri Lanka.
            Focused on web security, bug bounty hunting, and hands-on
            vulnerability research through continuous learning and practice.
          </p>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-xs text-white/60 rounded-full px-3 py-1"
                style={{ border: '1px solid rgba(255,255,255,0.15)' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Right: stats */}
        <motion.div
          className="grid grid-cols-2 gap-4"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map(({ value, label }) => (
            <motion.div
              key={label}
              variants={cardItem}
              className="rounded-2xl p-6"
              style={{ background: '#111111', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div
                className="font-black text-white mb-1"
                style={{ fontSize: 'clamp(28px, 3.5vw, 44px)' }}
              >
                {value}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest">{label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
```

---

## 13. Contact Section Component

**`src/components/ContactSection.jsx`**

```jsx
import { motion } from 'framer-motion'
import { fadeUp } from '../motion/variants'

export default function ContactSection() {
  return (
    <section className="relative py-24 px-10">

      <motion.p
        className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/35 mb-10"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Contact
      </motion.p>

      <div className="max-w-xl">
        <motion.h2
          className="font-black text-white leading-tight tracking-tight mb-4"
          style={{ fontSize: 'clamp(32px, 5vw, 64px)' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Let's work<br />
          <span className="text-[#E8593C]">together.</span>
        </motion.h2>

        <motion.p
          className="text-white/50 text-sm leading-relaxed mb-8"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          Open to bug bounty collaborations, security consulting, and frontend projects.
        </motion.p>

        <motion.a
          href="mailto:your@email.com"
          className="inline-flex items-center gap-3 bg-[#E8593C] text-white rounded-full px-8 py-4 font-medium text-sm hover:brightness-110 transition-all"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          Send a message →
        </motion.a>
      </div>

      {/* Footer */}
      <div className="mt-24 pt-8 flex justify-between items-center" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <span className="text-xs text-white/25">© 2025 Your Name. All rights reserved.</span>
        <span className="text-xs text-white/25">Built with React + Spline</span>
      </div>

    </section>
  )
}
```

---

## 14. Tailwind Config

**`tailwind.config.js`** (only needed if you want custom tokens — Tailwind v4 works without this)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        accent:  '#E8593C',
        surface: '#111111',
        dark:    '#0A0A0A',
      },
      fontFamily: {
        display: ['Clash Display', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

---

## 15. Key CSS Patterns

### Frosted glass card
```css
backdrop-filter: blur(16px);
-webkit-backdrop-filter: blur(16px);
background: rgba(255, 255, 255, 0.07);
border: 1px solid rgba(255, 255, 255, 0.10);
border-radius: 20px;
```

### Orange radial glow behind Spline
```css
background: radial-gradient(
  ellipse 55% 65% at 50% 50%,
  rgba(180, 60, 20, 0.45) 0%,
  rgba(140, 40, 10, 0.20) 40%,
  transparent 70%
);
```

### Full-bleed responsive text (clamp)
```css
font-size: clamp(80px, 18vw, 260px);   /* hero name */
font-size: clamp(28px, 4.5vw, 62px);   /* tagline   */
font-size: clamp(80px, 18vw, 220px);   /* bg section text (+ opacity: 0.06) */
```

### Glitch animation
```css
@keyframes glitch {
  0%, 88% { opacity: 1; }
  89%      { opacity: 0; }
  90%      { opacity: 1; }
  94%      { opacity: 0; }
  95%, 100%{ opacity: 1; }
}
```

### Horizontal scroll cards (no scrollbar)
```css
display: flex;
gap: 24px;
overflow-x: auto;
scroll-snap-type: x mandatory;
scrollbar-width: none;           /* Firefox */
-ms-overflow-style: none;        /* IE */
```
```css
/* Each card child */
flex-shrink: 0;
width: 340px;
scroll-snap-align: start;
```

---

## 16. Animation Reference

### Only 3 animation types used — don't add more
| Type | Where used | Framer Motion pattern |
|------|-----------|----------------------|
| Fade-up | Every section on scroll | `whileInView` + `fadeUp` variant |
| Stagger | Project cards | `staggerContainer` parent + `cardItem` children |
| Glitch | "Web" strikethrough text | CSS `@keyframes` only — no Framer needed |

### whileInView pattern (copy-paste ready)
```jsx
<motion.div
  variants={fadeUp}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
>
  {/* content */}
</motion.div>
```

### Stagger pattern (copy-paste ready)
```jsx
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, amount: 0.2 }}
>
  {items.map((item) => (
    <motion.div key={item.id} variants={cardItem}>
      {/* card */}
    </motion.div>
  ))}
</motion.div>
```

### Hero entrance (runs on mount — no scroll trigger)
```jsx
<motion.div
  variants={slideInLeft}
  initial="hidden"
  animate="visible"
  transition={{ delay: 0.3 }}
>
```

---

## 17. Deployment

```bash
# Build for production
npm run build
# Output goes to /dist folder

# Deploy to Vercel (recommended — free, instant, GitHub connected)
npm install -g vercel
vercel

# Or: drag the /dist folder to vercel.com/new
```

Vercel auto-detects Vite. Zero config needed. Auto-deploys on every push to `main`.

---

## 18. Common Mistakes

| Mistake | Correct approach |
|---------|-----------------|
| Using `/next` suffix on Spline import | `import Spline from '@splinetool/react-spline'` — no `/next` suffix in Vite |
| Spline blocking page load | Always use `React.lazy` + `Suspense` |
| Spline visible on mobile (slow/broken) | Detect `window.innerWidth < 768`, render `<img>` fallback instead |
| Using orange on too many elements | Orange only on: CTA button, one tagline word, one social icon |
| Too many animations | Only 3 types: fade-up on scroll, card stagger, glitch CSS text |
| Hardcoded px for hero text | Always use `clamp(minpx, vw%, maxpx)` for responsive scaling |
| Spline background not transparent | In Spline editor → Environment → Background → set opacity to 0 |
| Cards overflowing horizontal scroll | Add `flex-shrink-0` and explicit `width` (e.g. `w-[340px]`) to every card |
| `position: fixed` on contact card | Use `position: absolute` — fixed breaks the z-index sandwich |
| Forgetting `pointer-events: none` on bg layers | Name/glow layers at z-0/z-1 must have `pointer-events-none` or they block Spline interaction |

---

## 19. Reference Screenshots Description

### Screenshot 1 — Projects section
- Full-bleed dark section with giant "PROJECTS" text at ~6% opacity behind everything
- 3D robot Spline scene visible in background through the section
- 3 dark cards in horizontal scroll: `bg-[#111111]`, `border-white/10`, `rounded-2xl`
- Each card: mockup screenshot area (dark rectangle top), project title, description paragraph, tag pills (border-only, no fill), GitHub icon button (bottom-right of card)
- Small "SHOWCASE" uppercase label above the cards

### Screenshot 2 — Hero section
- Near-black `#0A0A0A` background
- Warm orange-brown radial glow centered behind the robot
- Giant white "JACKAI" text spans full viewport width — behind everything (z-0)
- Full-body humanoid robot at center — this is the Spline scene (z-10)
- Bottom-left: "Breaking / Web Systems / Responsibly" tagline — "Web" has strikethrough glitch animation, "Systems" is `#E8593C` orange. Below it: 3 status pills (Active / WebSec / Top 2%)
- Bottom-right: frosted glass contact card — title, subtitle, 4 social icon circles (LinkedIn is orange), email input + orange send button
- Navbar (top): left = hamburger + "Sri Lanka – 12:22 PM", right = "Bug Bounty" pill + orange "View Projects" button
- Small "0X7A" monospace hex label centered below the navbar
- Bottom bar: "Built with purpose. Crafted with precision." (left) and "↓ Scroll to explore" (right)

---

*Generated: May 2026 | Stack: React 19 + Vite + Tailwind v4 + Framer Motion 11 + Spline react-spline 2.x*
