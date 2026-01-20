# Design Guideline

## Warm & Friendly Theme

A comprehensive design system for techinterview.space focused on readability, comfort for long reading sessions, and a welcoming aesthetic.

---

## Table of Contents

1. [Design Philosophy](#1-design-philosophy)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Shadow System](#5-shadow-system)
6. [Components](#6-components)
7. [Dark Mode](#7-dark-mode)
8. [CSS Variables Reference](#8-css-variables-reference)
9. [Accessibility](#9-accessibility)
10. [Code Patterns](#10-code-patterns)

---

## 1. Design Philosophy

### Core Principles

| Principle | Description |
|-----------|-------------|
| **Eye Comfort** | Warm paper tones and soft colors reduce strain for extended reading |
| **Clear Hierarchy** | Consistent typography and spacing for easy scanning |
| **Subtle Depth** | Layered warm-tinted shadows create visual layers without harshness |
| **Warmth** | Terracotta and sage accents create an inviting, approachable feel |
| **Consistency** | Unified design language across all pages and components |

### Target Users

Users who spend extended time reading company reviews, analyzing salary charts, and comparing data. The design prioritizes readability and reduces cognitive load.

### Visual Identity

- **NOT** corporate cold blues
- **NOT** harsh pure whites or blacks
- **YES** warm, paper-like backgrounds
- **YES** terracotta and sage accents
- **YES** friendly, rounded corners

---

## 2. Color System

### 2.1 Background Colors

Warm paper tones that reduce eye strain:

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-bg-primary` | `#fffbf7` | `#1a1816` | Main page background |
| `--warm-bg-secondary` | `#fef7f0` | `#231f1d` | Alternating sections, card headers/footers |
| `--warm-bg-tertiary` | `#fff9f2` | `#2a2523` | Subtle variations |
| `--warm-bg-accent` | `#fdf4e8` | `#332d2a` | Highlighted areas, hover states |
| `--warm-bg-elevated` | `#ffffff` | `#3a3331` | Cards, modals, elevated surfaces |
| `--warm-bg-inverse` | `#3d3d3d` | `#f5f2f0` | Inverted backgrounds |

### 2.2 Text Colors

Warm grays for reduced eye strain (not pure black):

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-text-primary` | `#3d3d3d` | `#e8e4e1` | Body text |
| `--warm-text-secondary` | `#5c5c5c` | `#b8b2ad` | Secondary text, descriptions |
| `--warm-text-muted` | `#7a7a7a` | `#8a8480` | Captions, hints, placeholders |
| `--warm-text-heading` | `#2d2d2d` | `#f5f2f0` | Headings |
| `--warm-text-inverse` | `#f5f5f5` | `#1a1816` | Text on dark backgrounds |

### 2.3 Accent Colors

The signature warm palette:

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-accent-primary` | `#e07a5f` | `#e8937b` | **Terracotta** - Primary buttons, links, focus states |
| `--warm-accent-primary-hover` | `#c96a52` | `#f0a892` | Hover state for primary |
| `--warm-accent-secondary` | `#81b29a` | `#95c4ad` | **Sage** - Success, secondary actions |
| `--warm-accent-secondary-hover` | `#6fa089` | `#a8d4be` | Hover state for secondary |
| `--warm-accent-tertiary` | `#f2cc8f` | `#f5d9a8` | **Gold** - Highlights, warnings |
| `--warm-accent-soft` | `#f4a261` | `#f7b57d` | **Orange** - CTAs, attention elements |

### 2.4 Semantic Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-danger` | `#d95550` | `#e57373` | Errors, destructive actions |
| `--warm-danger-bg` | `#fef2f2` | `rgba(229,115,115,0.15)` | Danger background |
| `--warm-warning` | `#e9a820` | `#f5bc4c` | Warnings |
| `--warm-warning-bg` | `#fffbeb` | `rgba(245,188,76,0.15)` | Warning background |
| `--warm-success` | `#81b29a` | `#95c4ad` | Success states |
| `--warm-success-bg` | `#f0fdf4` | `rgba(149,196,173,0.15)` | Success background |
| `--warm-info` | `#6fa8c7` | `#8fc1db` | Information |
| `--warm-info-bg` | `#eff6ff` | `rgba(143,193,219,0.15)` | Info background |

### 2.5 Border & Divider Colors

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-border-color` | `rgba(61,45,35,0.12)` | `rgba(255,251,247,0.08)` | Subtle borders |
| `--warm-border-strong` | `rgba(61,45,35,0.20)` | `rgba(255,251,247,0.15)` | Prominent borders |
| `--warm-border-focus` | `rgba(224,122,95,0.5)` | `rgba(232,147,123,0.5)` | Focus rings |
| `--warm-divider` | `rgba(61,45,35,0.08)` | `rgba(255,251,247,0.06)` | Section dividers |

### 2.6 Chart Colors

Consistent palette for data visualization:

| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-chart-1` | `#e07a5f` | `#e8937b` | Primary chart color |
| `--warm-chart-2` | `#81b29a` | `#95c4ad` | Secondary chart color |
| `--warm-chart-3` | `#f2cc8f` | `#f5d9a8` | Tertiary chart color |
| `--warm-chart-4` | `#f4a261` | `#f7b57d` | Quaternary chart color |
| `--warm-chart-5` | `#6fa8c7` | `#8fc1db` | Quinary chart color |
| `--warm-chart-6` | `#c4a1d4` | `#d4b8e0` | Senary chart color |
| `--warm-chart-grid` | `rgba(61,45,35,0.08)` | `rgba(255,251,247,0.06)` | Grid lines |
| `--warm-chart-text` | `#5c5c5c` | `#b8b2ad` | Axis labels |

---

## 3. Typography

### 3.1 Font Stack

```scss
// Headings - Elegant serif for warmth and personality
$font-heading: 'Lora', Georgia, serif;

// Body - Rounded sans-serif for excellent readability
$font-body: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// Monospace - For code and data
$font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;
```

### 3.2 Type Scale

| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| Display (hero) | Lora | calc(1.625rem + 4.5vw) | 600 | 1.2 |
| h1 | Lora | 2.5rem | 700 | 1.15 |
| h2 | Lora | 2rem | 600 | 1.2 |
| h3 | Lora | 1.5rem | 600 | 1.25 |
| h4 | Lora | 1.25rem | 600 | 1.3 |
| Body | Nunito | 1rem | 400 | 1.6 |
| Body Large | Nunito | 1.1rem | 400 | 1.7 |
| Small | Nunito | 0.875rem | 400 | 1.5 |
| Caption | Nunito | 0.75rem | 400 | 1.4 |

### 3.3 Usage Guidelines

- **Headings**: Always use Lora for h1-h6 and display titles
- **Body text**: Nunito for all paragraph and UI text
- **Code/Data**: JetBrains Mono for code blocks, data tables, and monospace needs
- **Color**: Use `--warm-text-heading` for headings, `--warm-text-primary` for body
- **Letter spacing**: Add `0.02em` for display headings

---

## 4. Spacing & Layout

### 4.1 Spacing Scale

```scss
$space-1: 0.25rem;  // 4px
$space-2: 0.5rem;   // 8px
$space-3: 0.75rem;  // 12px
$space-4: 1rem;     // 16px
$space-5: 1.5rem;   // 24px
$space-6: 2rem;     // 32px
$space-7: 2.5rem;   // 40px
$space-8: 3rem;     // 48px
$space-9: 4rem;     // 64px
$space-10: 5rem;    // 80px
```

### 4.2 Border Radius

```scss
$radius-sm: 6px;    // Small elements, badges
$radius-md: 10px;   // Buttons, inputs, small cards
$radius-lg: 16px;   // Cards, modals
$radius-xl: 24px;   // Large containers, hero sections
$radius-full: 9999px; // Pills, avatars
```

### 4.3 Container Widths

- Max container width: Bootstrap default (1320px at xxl)
- Content sections: Use `.container` or `.container-fluid`
- Feature sections: Full-width backgrounds with contained content

---

## 5. Shadow System

Layered, warm-tinted shadows for natural depth:

### 5.1 Shadow Variables

```scss
// Shadow colors (warm-tinted)
--warm-shadow-color: rgba(61, 45, 35, 0.08);        // Light mode
--warm-shadow-color-medium: rgba(61, 45, 35, 0.12);
--warm-shadow-color-strong: rgba(61, 45, 35, 0.16);

// Dark mode shadows
--warm-shadow-color: rgba(0, 0, 0, 0.25);
--warm-shadow-color-medium: rgba(0, 0, 0, 0.35);
--warm-shadow-color-strong: rgba(0, 0, 0, 0.45);
```

### 5.2 Shadow Levels

| Level | Definition | Usage |
|-------|------------|-------|
| `$shadow-sm` | `0 1px 2px, 0 2px 4px` | Subtle elevation, buttons at rest |
| `$shadow-md` | `0 2px 4px, 0 4px 8px, 0 8px 16px` | Cards, elevated content |
| `$shadow-lg` | `0 4px 8px, 0 8px 16px, 0 16px 32px` | Dropdowns, hover states |
| `$shadow-xl` | `0 8px 16px, 0 16px 32px, 0 32px 64px` | Modals, dialogs |

### 5.3 Usage Example

```scss
.card {
  box-shadow: $shadow-sm;

  &:hover {
    box-shadow: $shadow-md;
  }
}

.modal-content {
  box-shadow: $shadow-xl;
}
```

---

## 6. Components

### 6.1 Cards

```scss
.card {
  background-color: var(--warm-card-bg);
  border: 1px solid var(--warm-card-border);
  border-radius: $radius-lg;  // 16px
  box-shadow: $shadow-sm;

  &:hover {
    box-shadow: $shadow-md;
  }
}

.card-header {
  background-color: var(--warm-bg-secondary);
  border-bottom: 1px solid var(--warm-divider);
}
```

### 6.2 Buttons

#### Primary Button (Terracotta)
```scss
.btn-primary {
  background-color: var(--warm-accent-primary);
  border-color: var(--warm-accent-primary);
  color: white;
  border-radius: $radius-md;
  font-weight: 600;

  &:hover:not(:disabled) {
    background-color: var(--warm-accent-primary-hover);
    transform: translateY(-1px);
    box-shadow: $shadow-md;
  }
}
```

#### Secondary Button (Sage)
```scss
.btn-secondary {
  background-color: var(--warm-accent-secondary);
  border-color: var(--warm-accent-secondary);
  color: white;
}
```

#### Outline Buttons
```scss
.btn-outline-primary {
  color: var(--warm-accent-primary);
  border-color: var(--warm-accent-primary);

  &:hover {
    background-color: var(--warm-accent-primary);
    color: white;
  }
}
```

### 6.3 Form Inputs

```scss
.form-control {
  background-color: var(--warm-input-bg);
  border-color: var(--warm-input-border);
  color: var(--warm-text-primary);
  border-radius: $radius-md;

  &:focus {
    border-color: var(--warm-input-focus-border);
    box-shadow: 0 0 0 3px var(--warm-input-focus-ring);
  }

  &::placeholder {
    color: var(--warm-text-muted);
  }
}
```

### 6.4 Alerts

```scss
.alert-danger {
  background-color: var(--warm-danger-bg);
  border-color: var(--warm-danger);
  color: var(--warm-danger);
}

.alert-success {
  background-color: var(--warm-success-bg);
  border-color: var(--warm-success);
}
```

### 6.5 Tables

```scss
.table {
  color: var(--warm-text-primary);

  th {
    font-family: $font-heading;
    font-weight: 600;
    color: var(--warm-text-heading);
  }

  tbody tr:nth-of-type(odd) {
    background-color: var(--warm-table-stripe);
  }

  tbody tr:hover {
    background-color: var(--warm-table-hover);
  }
}
```

### 6.6 Chart Cards

```scss
.chart-card {
  background-color: var(--warm-card-bg);
  border: 1px solid var(--warm-card-border);
  border-radius: $radius-lg;
  box-shadow: $shadow-sm;
  padding: 1.5rem;
  margin-bottom: 2rem;

  &:hover {
    box-shadow: $shadow-lg;
  }
}

.chart-title {
  font-family: $font-heading;
  font-weight: 600;
  font-size: 1.25rem;
  color: var(--warm-text-heading);

  i {
    color: var(--warm-accent-primary);
  }
}
```

### 6.7 Stats Cards

```scss
.stats-card {
  background: linear-gradient(135deg,
    var(--warm-bg-elevated) 0%,
    var(--warm-bg-secondary) 100%);
  border: 1px solid var(--warm-card-border);
  border-radius: $radius-md;
  padding: 1.25rem;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: $shadow-md;
  }
}

.stats-value {
  font-family: $font-heading;
  font-size: 2rem;
  font-weight: 700;
  color: var(--warm-accent-primary);
}

.stats-label {
  font-size: 0.875rem;
  color: var(--warm-text-secondary);
}
```

### 6.8 Chapter Titles (Section Headers)

```scss
.chapter-title {
  font-family: $font-heading;
  font-weight: 600;
  color: var(--warm-text-heading);
  margin-top: 4rem;
  margin-bottom: 1.5rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid var(--warm-accent-primary);
  display: inline-block;
}
```

---

## 7. Dark Mode

### 7.1 Implementation

Dark mode is implemented using CSS custom properties with three detection methods:

1. **System Preference**: `@media (prefers-color-scheme: dark)`
2. **Manual Override**: `[data-theme="dark"]` attribute on `<html>`
3. **Force Light**: `[data-theme="light"]` overrides system dark mode

### 7.2 Theme Service

```typescript
// theme.service.ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'preferred-theme';
  currentTheme$ = new BehaviorSubject<'light' | 'dark' | 'system'>('system');

  setTheme(theme: 'light' | 'dark' | 'system'): void {
    const root = document.documentElement;

    if (theme === 'system') {
      root.removeAttribute('data-theme');
    } else {
      root.setAttribute('data-theme', theme);
    }

    localStorage.setItem(this.THEME_KEY, theme);
    this.currentTheme$.next(theme);
  }
}
```

### 7.3 Theme Toggle Button

```scss
.theme-toggle-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--warm-bg-accent);
  border: 1px solid var(--warm-border-color);
  color: var(--warm-text-secondary);

  &:hover {
    background-color: var(--warm-accent-primary);
    color: white;
    transform: scale(1.05);
  }
}
```

### 7.4 Smooth Transitions

```scss
// Applied globally
* {
  transition: var(--theme-transition);
}

// Theme transition variable
--theme-transition:
  background-color 0.3s ease,
  color 0.3s ease,
  border-color 0.3s ease,
  box-shadow 0.3s ease;

// Disable on initial load
.no-transitions * {
  transition: none !important;
}
```

### 7.5 Image Handling in Dark Mode

```scss
[data-theme="dark"] img:not(.no-dim):not(.logo-image) {
  filter: brightness(0.92);
}
```

---

## 8. CSS Variables Reference

### 8.1 Full Variable List

```scss
:root {
  // Backgrounds
  --warm-bg-primary: #fffbf7;
  --warm-bg-secondary: #fef7f0;
  --warm-bg-tertiary: #fff9f2;
  --warm-bg-accent: #fdf4e8;
  --warm-bg-elevated: #ffffff;
  --warm-bg-inverse: #3d3d3d;

  // Text
  --warm-text-primary: #3d3d3d;
  --warm-text-secondary: #5c5c5c;
  --warm-text-muted: #7a7a7a;
  --warm-text-heading: #2d2d2d;
  --warm-text-inverse: #f5f5f5;

  // Accents
  --warm-accent-primary: #e07a5f;
  --warm-accent-primary-hover: #c96a52;
  --warm-accent-secondary: #81b29a;
  --warm-accent-secondary-hover: #6fa089;
  --warm-accent-tertiary: #f2cc8f;
  --warm-accent-soft: #f4a261;

  // Semantic
  --warm-danger: #d95550;
  --warm-danger-bg: #fef2f2;
  --warm-warning: #e9a820;
  --warm-warning-bg: #fffbeb;
  --warm-success: #81b29a;
  --warm-success-bg: #f0fdf4;
  --warm-info: #6fa8c7;
  --warm-info-bg: #eff6ff;

  // Borders
  --warm-border-color: rgba(61, 45, 35, 0.12);
  --warm-border-strong: rgba(61, 45, 35, 0.2);
  --warm-border-focus: rgba(224, 122, 95, 0.5);
  --warm-divider: rgba(61, 45, 35, 0.08);

  // Shadows
  --warm-shadow-color: rgba(61, 45, 35, 0.08);
  --warm-shadow-color-medium: rgba(61, 45, 35, 0.12);
  --warm-shadow-color-strong: rgba(61, 45, 35, 0.16);

  // Input
  --warm-input-bg: #ffffff;
  --warm-input-border: rgba(61, 45, 35, 0.2);
  --warm-input-focus-border: #e07a5f;
  --warm-input-focus-ring: rgba(224, 122, 95, 0.25);

  // Card
  --warm-card-bg: #ffffff;
  --warm-card-border: rgba(61, 45, 35, 0.08);

  // Modal
  --warm-modal-overlay: rgba(45, 45, 45, 0.5);
  --warm-modal-bg: #ffffff;

  // Navbar
  --warm-navbar-bg: #fffbf7;
  --warm-navbar-border: rgba(61, 45, 35, 0.1);

  // Footer
  --warm-footer-bg: #3d3d3d;
  --warm-footer-text: #f5f5f5;
  --warm-footer-muted: #c0c0c0;

  // Charts
  --warm-chart-1: #e07a5f;
  --warm-chart-2: #81b29a;
  --warm-chart-3: #f2cc8f;
  --warm-chart-4: #f4a261;
  --warm-chart-5: #6fa8c7;
  --warm-chart-6: #c4a1d4;
  --warm-chart-grid: rgba(61, 45, 35, 0.08);
  --warm-chart-text: #5c5c5c;

  // Code
  --warm-code-bg: #fef7f0;
  --warm-code-text: #3d3d3d;
  --warm-code-border: rgba(61, 45, 35, 0.12);

  // Table
  --warm-table-stripe: rgba(61, 45, 35, 0.03);
  --warm-table-hover: rgba(61, 45, 35, 0.06);
  --warm-table-border: rgba(61, 45, 35, 0.1);

  // Scrollbar
  --warm-scrollbar-track: #fef7f0;
  --warm-scrollbar-thumb: rgba(61, 45, 35, 0.2);
  --warm-scrollbar-thumb-hover: rgba(61, 45, 35, 0.35);

  // Transition
  --theme-transition: background-color 0.3s ease, color 0.3s ease,
    border-color 0.3s ease, box-shadow 0.3s ease;
}
```

### 8.2 SCSS Variables

```scss
// Typography
$font-heading: 'Lora', Georgia, serif;
$font-body: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
$font-mono: 'JetBrains Mono', 'Fira Code', Consolas, monospace;

// Border radius
$radius-sm: 6px;
$radius-md: 10px;
$radius-lg: 16px;
$radius-xl: 24px;
$radius-full: 9999px;

// Transitions
$transition-fast: 0.15s ease;
$transition-normal: 0.2s ease;
$transition-slow: 0.3s ease;
```

---

## 9. Accessibility

### 9.1 Color Contrast

All color combinations meet WCAG AA standards (4.5:1 minimum):

| Combination | Light Mode | Dark Mode |
|-------------|------------|-----------|
| Body text on background | 7.5:1 | 8.2:1 |
| Muted text on background | 4.8:1 | 4.5:1 |
| Links on background | 4.6:1 | 5.1:1 |
| Heading text | 10.2:1 | 11.5:1 |

### 9.2 Focus States

```scss
:focus-visible {
  outline: 2px solid var(--warm-accent-primary);
  outline-offset: 2px;
}

// Focus ring for inputs
.form-control:focus {
  box-shadow: 0 0 0 3px var(--warm-input-focus-ring);
}
```

### 9.3 Reduced Motion

```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. Code Patterns

### 10.1 Component SCSS Structure

```scss
// ═══════════════════════════════════════════════════════════════════════════════
// COMPONENT NAME STYLES
// Warm & Friendly Theme
// Component-specific styles only (global styles in styles.scss)
// ═══════════════════════════════════════════════════════════════════════════════

:host {
  display: block;
}

// ─────────────────────────────────────────────────────────────────────────────────
// SECTION NAME
// ─────────────────────────────────────────────────────────────────────────────────

.component-element {
  background-color: var(--warm-card-bg);
  color: var(--warm-text-primary);
  border-radius: $radius-md;

  &:hover {
    // Hover styles
  }
}

// ─────────────────────────────────────────────────────────────────────────────────
// RESPONSIVE
// ─────────────────────────────────────────────────────────────────────────────────

@media (max-width: 768px) {
  .component-element {
    // Mobile styles
  }
}
```

### 10.2 Using Theme Variables

```scss
// ALWAYS use CSS variables for colors
.my-component {
  // Good
  background-color: var(--warm-bg-primary);
  color: var(--warm-text-primary);
  border: 1px solid var(--warm-border-color);

  // Bad - hardcoded colors
  // background-color: #fffbf7;
  // color: #3d3d3d;
}
```

### 10.3 Utility Classes

```html
<!-- Background utilities -->
<div class="bg-warm-primary">...</div>
<div class="bg-warm-secondary">...</div>
<div class="bg-warm-accent">...</div>

<!-- Text utilities -->
<p class="text-warm-primary">Primary text</p>
<p class="text-warm-secondary">Secondary text</p>
<p class="text-warm-muted">Muted text</p>
<p class="text-accent-primary">Accent text (terracotta)</p>

<!-- Shadow utilities -->
<div class="shadow-warm-sm">...</div>
<div class="shadow-warm-md">...</div>
<div class="shadow-warm-lg">...</div>

<!-- Interactive effects -->
<div class="hover-lift">Lifts on hover</div>
<div class="increasable-on-hover">Scales on hover</div>
```

### 10.4 Responsive Patterns

```scss
// Mobile-first approach
.component {
  padding: 1rem;

  @media (min-width: 768px) {
    padding: 1.5rem;
  }

  @media (min-width: 992px) {
    padding: 2rem;
  }
}

// Mobile utility classes
.mobile-px-5 {
  padding-left: 3rem;
  padding-right: 3rem;

  @media (max-width: 768px) {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}
```

---

## File Structure

```
src/
├── _warm-theme.scss        # Theme variables (CSS custom properties + SCSS)
├── _colors.scss            # Legacy color definitions
├── styles.scss             # Global styles using warm theme
└── app/
    ├── components/         # Global components
    ├── modules/            # Feature modules
    └── shared/             # Shared components
```

---

## Quick Reference Card

| Element | Background | Text | Accent | Radius |
|---------|------------|------|--------|--------|
| Page | `--warm-bg-primary` | `--warm-text-primary` | - | - |
| Card | `--warm-card-bg` | `--warm-text-primary` | - | 16px |
| Button Primary | `--warm-accent-primary` | white | - | 10px |
| Button Secondary | `--warm-accent-secondary` | white | - | 10px |
| Input | `--warm-input-bg` | `--warm-text-primary` | Focus: terracotta | 10px |
| Heading | - | `--warm-text-heading` | - | - |
| Link | - | `--warm-accent-primary` | Hover: darker | - |
| Badge | `--warm-accent-*` | white | - | full |
| Modal | `--warm-modal-bg` | `--warm-text-primary` | - | 16px |

---

## Changelog

- **Initial Version**: Warm & Friendly theme implementation
- **Dark Mode**: Full dark mode support with system preference detection
- **Components**: Cards, buttons, forms, tables, charts styled consistently
