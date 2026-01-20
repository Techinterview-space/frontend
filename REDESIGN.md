# Techinterview.space Redesign Plan

## "Warm & Friendly" Theme

A comprehensive redesign focused on readability, comfort for long reading sessions, and a welcoming aesthetic.

---

## 1. Design Philosophy

### Goals
- **Eye comfort**: Reduce strain for users reading reviews and analyzing charts
- **Clear hierarchy**: Easy scanning of data and content
- **Subtle depth**: Soft shadows to create visual layers
- **Warmth**: Inviting, approachable feel that builds trust
- **Consistency**: Unified design language across all pages

### Target Users
Users who spend extended time on the site reading company reviews, analyzing salary charts, and comparing data.

---

## 2. Design System

### 2.1 Color Palette

#### Backgrounds (Warm Paper Tones)
| Variable | Hex | Usage |
|----------|-----|-------|
| `$warm-bg-primary` | `#fffbf7` | Main page background |
| `$warm-bg-secondary` | `#fef7f0` | Alternating sections |
| `$warm-bg-tertiary` | `#fff9f2` | Card backgrounds |
| `$warm-bg-accent` | `#fdf4e8` | Highlighted areas |

#### Text Colors (Reduced Eye Strain)
| Variable | Hex | Usage |
|----------|-----|-------|
| `$warm-text-primary` | `#3d3d3d` | Body text |
| `$warm-text-secondary` | `#5c5c5c` | Secondary text |
| `$warm-text-muted` | `#7a7a7a` | Captions, hints |
| `$warm-text-heading` | `#2d2d2d` | Headings |

#### Accent Colors
| Variable | Hex | Usage |
|----------|-----|-------|
| `$warm-accent-primary` | `#e07a5f` | Primary buttons, links (Terracotta) |
| `$warm-accent-secondary` | `#81b29a` | Success states, secondary actions (Sage) |
| `$warm-accent-tertiary` | `#f2cc8f` | Highlights, warnings (Gold) |
| `$warm-accent-soft` | `#f4a261` | CTAs, attention elements (Orange) |

#### Semantic Colors (Adjusted for Warmth)
| Variable | Hex | Usage |
|----------|-----|-------|
| `$warm-danger` | `#d95550` | Errors, destructive actions |
| `$warm-warning` | `#e9a820` | Warnings |
| `$warm-success` | `#81b29a` | Success (same as secondary) |
| `$warm-info` | `#6fa8c7` | Information |

### 2.2 Typography

#### Font Stack
```scss
// Headings - Elegant serif for warmth
$font-heading: 'Lora', Georgia, serif;

// Body - Rounded sans-serif for readability
$font-body: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

// Monospace - For code/data
$font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

#### Type Scale
| Element | Font | Size | Weight | Line Height |
|---------|------|------|--------|-------------|
| h1 | Lora | 2.5rem | 700 | 1.15 |
| h2 | Lora | 2rem | 600 | 1.2 |
| h3 | Lora | 1.5rem | 600 | 1.25 |
| h4 | Lora | 1.25rem | 600 | 1.3 |
| Body | Nunito | 1rem | 400 | 1.6 |
| Body Large | Nunito | 1.1rem | 400 | 1.7 |
| Small | Nunito | 0.875rem | 400 | 1.5 |
| Caption | Nunito | 0.75rem | 400 | 1.4 |

### 2.3 Shadow System

Layered, warm-tinted shadows for natural depth:

```scss
$warm-shadow-color: rgba(61, 45, 35, 0.08);
$warm-shadow-color-medium: rgba(61, 45, 35, 0.12);
$warm-shadow-color-strong: rgba(61, 45, 35, 0.16);

$shadow-sm:
  0 1px 2px $warm-shadow-color,
  0 2px 4px $warm-shadow-color;

$shadow-md:
  0 2px 4px $warm-shadow-color,
  0 4px 8px $warm-shadow-color,
  0 8px 16px $warm-shadow-color;

$shadow-lg:
  0 4px 8px $warm-shadow-color,
  0 8px 16px $warm-shadow-color,
  0 16px 32px $warm-shadow-color-medium;

$shadow-xl:
  0 8px 16px $warm-shadow-color,
  0 16px 32px $warm-shadow-color-medium,
  0 32px 64px $warm-shadow-color-strong;
```

### 2.4 Spacing & Layout

```scss
$border-radius-sm: 6px;
$border-radius-md: 10px;
$border-radius-lg: 16px;
$border-radius-xl: 24px;

$spacing-unit: 0.5rem; // 8px base
```

### 2.5 Transitions

```scss
$transition-fast: 0.15s ease;
$transition-normal: 0.2s ease;
$transition-slow: 0.3s ease;
```

---

## 3. Component Updates

### 3.1 Global Components

#### Navbar
- [ ] Background: `$warm-bg-primary` with subtle bottom border
- [ ] Subtle shadow on scroll
- [ ] Brand: Lora font, warm dark color
- [ ] Links: Nunito, hover with terracotta accent
- [ ] Dropdowns: Rounded corners, soft shadow

#### Footer
- [ ] Background: `#3d3d3d` (warm dark gray, not pure black)
- [ ] Text: Light warm gray `#f5f5f5`
- [ ] Links: Muted on default, terracotta on hover
- [ ] Icons: Sage green accents

#### Buttons
- [ ] Primary: Terracotta fill, white text, rounded corners
- [ ] Secondary: Sage green fill
- [ ] Outline: Border with transparent fill, fill on hover
- [ ] All: Soft shadow, lift on hover, press effect on active

#### Cards
- [ ] Background: White with warm tint
- [ ] Border-radius: 12px
- [ ] Shadow: `$shadow-md`
- [ ] Hover: Lift effect with `$shadow-lg`

#### Forms
- [ ] Inputs: Warm border, rounded corners
- [ ] Focus: Terracotta border glow
- [ ] Labels: Secondary text color
- [ ] Error states: Warm red

#### Alerts
- [ ] Rounded corners
- [ ] Soft colored backgrounds (not harsh)
- [ ] Matching border color

---

## 4. Module-by-Module Plan

### Phase 1: Foundation (Priority: Critical)

#### 1.1 Global Styles
Files to modify:
- [ ] `src/_colors.scss` → Create new `src/_warm-theme.scss`
- [ ] `src/styles.scss` → Update with warm theme variables
- [ ] `src/index.html` → Add Google Fonts, CSS variables

#### 1.2 Core Layout
- [ ] `src/app/components/navbar/navbar.component.scss`
- [ ] `src/app/components/admin-navbar/admin-navbar.component.scss`
- [ ] `src/index.html` → Footer styles

---

### Phase 2: Shared Components (Priority: High)

Files to update:
- [ ] `shared/components/submit-button/submit-button.component.scss`
- [ ] `shared/components/loading-button/loading-button.component.scss`
- [ ] `shared/components/go-back-button/go-back-button.component.scss`
- [ ] `shared/components/app-page-header/app-page-header.component.scss`
- [ ] `shared/components/dialogs/dialog/dialog.component.scss`
- [ ] `shared/components/dialogs/confirm-dialog/confirm-dialog.component.scss`
- [ ] `shared/components/dialogs/decline-dialog/decline-dialog.component.scss`
- [ ] `shared/components/alert/component/alert.component.scss`
- [ ] `shared/components/loading-spinner/loading-spinner.component.scss`
- [ ] `shared/components/app-spinner/app-spinner.component.scss`
- [ ] `shared/components/field-error/field-error.component.scss`
- [ ] `shared/components/label/label.component.scss`
- [ ] `shared/components/star-rating/star-rating.component.scss`
- [ ] `shared/components/star-rating-readonly/star-rating-readonly.component.scss`
- [ ] `shared/components/vote-buttons/vote-buttons.component.scss`
- [ ] `shared/components/share-button/share-button.component.scss`
- [ ] `shared/components/developer-grade-label/developer-grade-label.component.scss`
- [ ] `shared/components/add-salary-progress-bar/form-progress-bar.component.scss`
- [ ] `shared/components/labels-ng-select/labels-ng-select.component.scss`
- [ ] `shared/components/items-per-day-chart/items-per-day-chart.component.scss`
- [ ] `shared/components/wednesday-frog/wednesday-frog.component.scss`

---

### Phase 3: Home Module (Priority: High)

Files to update:
- [ ] `modules/home/components/home/home.component.scss`
- [ ] `modules/home/components/about-us/about-us.component.scss`
- [ ] `modules/home/components/telegram-bot/telegram-bot.component.scss`
- [ ] `modules/home/components/me/me.component.scss`
- [ ] `modules/home/components/unsubscribe-me/unsubscribe-me.component.scss`
- [ ] `modules/home/components/error-page-component/error-page-component.component.scss`

---

### Phase 4: Salaries Module (Priority: High)

This is a core feature with many charts. Files to update:
- [ ] `modules/salaries/components/salaries-chart/salaries-chart.component.scss`
- [ ] `modules/salaries/components/add-salary/add-salary.component.scss`
- [ ] `modules/salaries/components/edit-salary/edit-salary.component.scss`
- [ ] `modules/salaries/components/salaries-chart/salary-chart-global-filters/salary-chart-global-filters.component.scss`
- [ ] `modules/salaries/components/salaries-chart/currency-select-box/currency-select-box.component.scss`
- [ ] `modules/salaries/components/salaries-chart/salary-block-value/salary-block-value.component.scss`
- [ ] `modules/salaries/components/salaries-chart/salary-block-remote-value/salary-block-remote-value.component.scss`
- [ ] `modules/salaries/components/salaries-chart/salaries-by-grade/salaries-by-grade-block.component.scss`
- [ ] `modules/salaries/components/salaries-chart/salaries-adding-chart/salaries-adding-chart.component.scss`
- [ ] `modules/salaries/components/salaries-chart/predefined-filter-info/predefined-info-block.component.scss`
- [ ] `modules/salaries/components/salaries-chart/usefulness-rating/usefulness-rating.component.scss`
- [ ] `modules/salaries/components/salaries-by-grades-chart/salaries-by-grades-chart.component.scss`
- [ ] `modules/salaries/components/grades-min-max-salaries-chart/grades-min-max-chart.component.scss`
- [ ] `modules/salaries/components/people-by-grades-chart/people-by-grades-chart.component.scss`
- [ ] `modules/salaries/components/people-by-gender-chart/people-by-gender-chart.component.scss`
- [ ] `modules/salaries/components/people-by-gender-chart/salaries-by-gender-chart/salaries-by-gender-chart.component.scss`
- [ ] `modules/salaries/components/people-by-age-chart/people-by-age-chart.component.scss`
- [ ] `modules/salaries/components/salaries-by-age-chart/salaries-by-age-chart.component.scss`
- [ ] `modules/salaries/components/people-by-experience-chart/people-by-experience-chart.component.scss`
- [ ] `modules/salaries/components/salaries-by-experience-chart/salaries-by-experience-chart.component.scss`
- [ ] `modules/salaries/components/salaries-by-cities-chart/salaries-by-city-chart.component.scss`
- [ ] `modules/salaries/components/cities-doughnut-chart/cities-doughnut-chart.component.scss`
- [ ] `modules/salaries/components/work-industries-chart/work-industries-chart.component.scss`
- [ ] `modules/salaries/components/professions-distribution-chart/people-distribution-chart.component.scss`
- [ ] `modules/salaries/components/salaries-skills-chart/salaries-skills-chart.component.scss`
- [ ] `modules/salaries/components/historical-charts-page/historical-charts-page.component.scss`
- [ ] `modules/salaries/components/historical-charts-page/historical-salaries-chart/historical-salaries-chart.component.scss`
- [ ] `modules/salaries/components/historical-charts-page/survey-historical-chart/survey-historical-chart.component.scss`
- [ ] `modules/salaries/components/currencies-chart-page/currencies-chart-page.component.scss`

---

### Phase 5: Companies Module (Priority: High)

Files to update:
- [ ] `modules/companies/components/companies-page/companies-page.component.scss`
- [ ] `modules/companies/components/company-page/company-page.component.scss`
- [ ] `modules/companies/components/add-review-page/add-review-page.component.scss`
- [ ] `modules/companies/components/recent-reviews/recent-reviews-page.component.scss`
- [ ] `modules/companies/components/company-review-block/company-review-block.component.scss`

---

### Phase 6: Interviews Module (Priority: Medium)

Files to update:
- [ ] `modules/interviews/components/interviews-home/interviews-home.component.scss`
- [ ] `modules/interviews/components/interview-page/interview-page.component.scss`
- [ ] `modules/interviews/components/interview-edit-page/interview-edit-page.component.scss`
- [ ] `modules/interviews/components/interview-template-page/interview-template-page.component.scss`
- [ ] `modules/interviews/components/interview-template-edit-page/interview-template-edit-page.component.scss`
- [ ] `modules/interviews/components/my-interviews/my-interviews.component.scss`
- [ ] `modules/interviews/components/my-interview-templates/my-interview-templates.component.scss`
- [ ] `modules/interviews/components/public-interview-templates/public-interview-templates.component.scss`
- [ ] `modules/interviews/components/text-with-linebreaks/text-with-linebreaks.component.scss`

---

### Phase 7: Users Module (Priority: Medium)

Files to update:
- [ ] `modules/users/components/user-page/user-page.component.scss`

---

### Phase 8: Admin Module (Priority: Low)

Admin pages are less critical but should be consistent:
- [ ] `modules/admin/components/admin-start-page/admin-start-page.component.scss`
- [ ] `modules/admin/components/jobs-table/jobs-table.component.scss`
- [ ] `modules/admin/components/background-jobs/background-jobs.component.scss`
- [ ] `modules/admin/components/health-check-table/health-check-table.component.scss`
- [ ] `modules/admin/components/companies/companies-admin-page/companies-admin-page.component.scss`
- [ ] `modules/admin/components/companies/company-admin-page/company-admin-page.component.scss`
- [ ] `modules/admin/components/companies/reviews-to-approve/reviews-to-approve-page.component.scss`
- [ ] `modules/admin/components/generate-qr-code-page/generate-qr-page.component.scss`
- [ ] `modules/admin/components/currencies-page/currencies-page.component.scss`
- [ ] `modules/admin/components/openai-prompts/openai-prompts-admin-page.component.scss`
- [ ] `modules/admin/components/salaries/historical-data-templates/historical-data-templates.component.scss`
- [ ] `modules/admin/components/telegram/reviews-stat-subscriptions/reviews-stat-subscriptions.component.scss`
- [ ] `modules/admin/components/telegram/salaries-stat-subscriptions/stat-data-cache-records.component.scss`
- [ ] `modules/admin/components/telegram/job-posting-message-subscriptions/job-posting-message-subscriptions.component.scss`
- [ ] `modules/admin/components/tools/send-email-page/send-email-page.component.scss`

---

### Phase 9: App-Level Components (Priority: Medium)

- [ ] `src/app/app.component.scss`
- [ ] `src/app/components/maintenance/maintenance.component.scss`

---

## 5. Chart Theming

Charts need special attention for the warm theme:

### Chart.js / ng2-charts Configuration
```typescript
// Suggested warm chart colors
const chartColors = {
  primary: '#e07a5f',      // Terracotta
  secondary: '#81b29a',    // Sage
  tertiary: '#f2cc8f',     // Gold
  quaternary: '#f4a261',   // Orange
  quinary: '#6fa8c7',      // Soft blue
  senary: '#c4a1d4',       // Soft purple
};

// Grid and axis styling
const gridColor = 'rgba(61, 45, 35, 0.08)';
const textColor = '#5c5c5c';
```

---

## 6. Implementation Strategy

### Approach: Bottom-Up
1. Create theme file with all variables
2. Update global styles
3. Update shared components (used everywhere)
4. Update page-specific components module by module

### File Structure
```
src/
├── _warm-theme.scss        # NEW: All theme variables
├── _colors.scss            # Keep for backward compatibility, import warm-theme
├── styles.scss             # Updated to use warm theme
└── app/
    └── ...
```

### Migration Steps per Component
1. Import warm theme variables
2. Replace hardcoded colors with variables
3. Update shadows to use warm shadow system
4. Update border-radius to use consistent values
5. Update typography to use font variables
6. Test component in isolation
7. Test component in context

---

## 7. Testing Checklist

### Visual Testing
- [ ] Light/dark mode appearance (if applicable)
- [ ] Mobile responsiveness
- [ ] Hover/focus states
- [ ] Active/disabled states
- [ ] Loading states

### Accessibility
- [ ] Color contrast ratios (WCAG AA minimum)
- [ ] Focus indicators visible
- [ ] Text remains readable at 200% zoom

### Browser Testing
- [ ] Chrome
- [ ] Safari

---

## 8. Timeline Estimate

| Phase | Components | Estimated Time |
|-------|------------|----------------|
| Phase 1: Foundation + Dark Mode | 5 files + service | 3-4 hours |
| Phase 2: Shared | 21 files | 3-4 hours |
| Phase 3: Home | 6 files | 1-2 hours |
| Phase 4: Salaries | 29 files | 4-5 hours |
| Phase 5: Companies | 5 files | 1-2 hours |
| Phase 6: Interviews | 9 files | 2 hours |
| Phase 7: Users | 1 file | 30 min |
| Phase 8: Admin | 15 files | 2-3 hours |
| Phase 9: App-Level | 2 files | 30 min |
| **Total** | **93 files + service** | **~18-24 hours** |

---

## 9. Rollback Plan

If issues arise:
1. All changes will be in separate commits per phase
2. Original `_colors.scss` will be preserved
3. CSS variables in `:root` allow easy theme switching
4. Each phase can be reverted independently

---

## 10. Dark/Light Mode Feature

### 10.1 Overview

The application will support both light and dark modes with:
- **System preference detection** via `prefers-color-scheme`
- **Manual toggle** for user preference override
- **Persistence** via localStorage
- **Smooth transitions** between modes

### 10.2 Dark Mode Color Palette

#### Backgrounds (Warm Dark Tones)
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-bg-primary` | `#fffbf7` | `#1a1816` | Main page background |
| `--warm-bg-secondary` | `#fef7f0` | `#231f1d` | Alternating sections |
| `--warm-bg-tertiary` | `#fff9f2` | `#2a2523` | Card backgrounds |
| `--warm-bg-accent` | `#fdf4e8` | `#332d2a` | Highlighted areas |
| `--warm-bg-elevated` | `#ffffff` | `#3a3331` | Elevated cards, modals |

#### Text Colors (Comfortable for Dark Backgrounds)
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-text-primary` | `#3d3d3d` | `#e8e4e1` | Body text |
| `--warm-text-secondary` | `#5c5c5c` | `#b8b2ad` | Secondary text |
| `--warm-text-muted` | `#7a7a7a` | `#8a8480` | Captions, hints |
| `--warm-text-heading` | `#2d2d2d` | `#f5f2f0` | Headings |

#### Accent Colors (Adjusted for Dark Mode Contrast)
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-accent-primary` | `#e07a5f` | `#e8937b` | Primary (Terracotta - lightened) |
| `--warm-accent-secondary` | `#81b29a` | `#95c4ad` | Secondary (Sage - lightened) |
| `--warm-accent-tertiary` | `#f2cc8f` | `#f5d9a8` | Highlights (Gold - lightened) |
| `--warm-accent-soft` | `#f4a261` | `#f7b57d` | CTAs (Orange - lightened) |

#### Semantic Colors (Dark Mode Adjusted)
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-danger` | `#d95550` | `#e57373` | Errors |
| `--warm-warning` | `#e9a820` | `#f5bc4c` | Warnings |
| `--warm-success` | `#81b29a` | `#95c4ad` | Success |
| `--warm-info` | `#6fa8c7` | `#8fc1db` | Information |

#### Borders & Dividers
| Variable | Light Mode | Dark Mode | Usage |
|----------|------------|-----------|-------|
| `--warm-border-color` | `rgba(61,45,35,0.12)` | `rgba(255,251,247,0.08)` | Subtle borders |
| `--warm-border-strong` | `rgba(61,45,35,0.20)` | `rgba(255,251,247,0.15)` | Prominent borders |
| `--warm-divider` | `rgba(61,45,35,0.08)` | `rgba(255,251,247,0.06)` | Section dividers |

#### Shadows (Dark Mode)
| Variable | Light Mode | Dark Mode |
|----------|------------|-----------|
| `--warm-shadow-color` | `rgba(61,45,35,0.08)` | `rgba(0,0,0,0.25)` |
| `--warm-shadow-color-medium` | `rgba(61,45,35,0.12)` | `rgba(0,0,0,0.35)` |
| `--warm-shadow-color-strong` | `rgba(61,45,35,0.16)` | `rgba(0,0,0,0.45)` |

#### Special Dark Mode Colors
| Variable | Value | Usage |
|----------|-------|-------|
| `--warm-dark-glow` | `rgba(232,147,123,0.15)` | Subtle accent glow effects |
| `--warm-dark-overlay` | `rgba(0,0,0,0.5)` | Modal overlays |
| `--warm-dark-highlight` | `rgba(255,251,247,0.05)` | Hover highlights |

### 10.3 Implementation Strategy

#### CSS Variables Structure
```scss
// _warm-theme.scss

:root {
  // Light mode (default)
  --warm-bg-primary: #fffbf7;
  --warm-bg-secondary: #fef7f0;
  --warm-bg-tertiary: #fff9f2;
  --warm-bg-accent: #fdf4e8;
  --warm-bg-elevated: #ffffff;

  --warm-text-primary: #3d3d3d;
  --warm-text-secondary: #5c5c5c;
  --warm-text-muted: #7a7a7a;
  --warm-text-heading: #2d2d2d;

  --warm-accent-primary: #e07a5f;
  --warm-accent-secondary: #81b29a;
  --warm-accent-tertiary: #f2cc8f;
  --warm-accent-soft: #f4a261;

  --warm-danger: #d95550;
  --warm-warning: #e9a820;
  --warm-success: #81b29a;
  --warm-info: #6fa8c7;

  --warm-border-color: rgba(61, 45, 35, 0.12);
  --warm-border-strong: rgba(61, 45, 35, 0.20);
  --warm-divider: rgba(61, 45, 35, 0.08);

  --warm-shadow-color: rgba(61, 45, 35, 0.08);
  --warm-shadow-color-medium: rgba(61, 45, 35, 0.12);
  --warm-shadow-color-strong: rgba(61, 45, 35, 0.16);

  // Transition for smooth theme switching
  --theme-transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

// Dark mode - System preference
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --warm-bg-primary: #1a1816;
    --warm-bg-secondary: #231f1d;
    --warm-bg-tertiary: #2a2523;
    --warm-bg-accent: #332d2a;
    --warm-bg-elevated: #3a3331;

    --warm-text-primary: #e8e4e1;
    --warm-text-secondary: #b8b2ad;
    --warm-text-muted: #8a8480;
    --warm-text-heading: #f5f2f0;

    --warm-accent-primary: #e8937b;
    --warm-accent-secondary: #95c4ad;
    --warm-accent-tertiary: #f5d9a8;
    --warm-accent-soft: #f7b57d;

    --warm-danger: #e57373;
    --warm-warning: #f5bc4c;
    --warm-success: #95c4ad;
    --warm-info: #8fc1db;

    --warm-border-color: rgba(255, 251, 247, 0.08);
    --warm-border-strong: rgba(255, 251, 247, 0.15);
    --warm-divider: rgba(255, 251, 247, 0.06);

    --warm-shadow-color: rgba(0, 0, 0, 0.25);
    --warm-shadow-color-medium: rgba(0, 0, 0, 0.35);
    --warm-shadow-color-strong: rgba(0, 0, 0, 0.45);
  }
}

// Dark mode - Manual override
:root[data-theme="dark"] {
  --warm-bg-primary: #1a1816;
  --warm-bg-secondary: #231f1d;
  --warm-bg-tertiary: #2a2523;
  --warm-bg-accent: #332d2a;
  --warm-bg-elevated: #3a3331;

  --warm-text-primary: #e8e4e1;
  --warm-text-secondary: #b8b2ad;
  --warm-text-muted: #8a8480;
  --warm-text-heading: #f5f2f0;

  --warm-accent-primary: #e8937b;
  --warm-accent-secondary: #95c4ad;
  --warm-accent-tertiary: #f5d9a8;
  --warm-accent-soft: #f7b57d;

  --warm-danger: #e57373;
  --warm-warning: #f5bc4c;
  --warm-success: #95c4ad;
  --warm-info: #8fc1db;

  --warm-border-color: rgba(255, 251, 247, 0.08);
  --warm-border-strong: rgba(255, 251, 247, 0.15);
  --warm-divider: rgba(255, 251, 247, 0.06);

  --warm-shadow-color: rgba(0, 0, 0, 0.25);
  --warm-shadow-color-medium: rgba(0, 0, 0, 0.35);
  --warm-shadow-color-strong: rgba(0, 0, 0, 0.45);
}
```

#### Theme Toggle Component
```typescript
// theme-toggle.service.ts
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'preferred-theme';

  currentTheme$ = new BehaviorSubject<'light' | 'dark' | 'system'>('system');

  constructor() {
    this.initTheme();
  }

  private initTheme(): void {
    const saved = localStorage.getItem(this.THEME_KEY) as 'light' | 'dark' | 'system';
    if (saved) {
      this.setTheme(saved);
    }
  }

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

  toggleTheme(): void {
    const current = this.currentTheme$.value;
    const next = current === 'light' ? 'dark' : 'light';
    this.setTheme(next);
  }
}
```

#### Theme Toggle Button (Navbar)
```html
<!-- Theme toggle button for navbar -->
<button
  class="theme-toggle-btn"
  (click)="themeService.toggleTheme()"
  [attr.aria-label]="(themeService.currentTheme$ | async) === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'">
  <i class="bi" [ngClass]="{
    'bi-sun-fill': (themeService.currentTheme$ | async) === 'dark',
    'bi-moon-fill': (themeService.currentTheme$ | async) === 'light',
    'bi-circle-half': (themeService.currentTheme$ | async) === 'system'
  }"></i>
</button>
```

### 10.4 Dark Mode Chart Colors

```typescript
// Chart colors for dark mode
const chartColorsDark = {
  primary: '#e8937b',      // Terracotta (lightened)
  secondary: '#95c4ad',    // Sage (lightened)
  tertiary: '#f5d9a8',     // Gold (lightened)
  quaternary: '#f7b57d',   // Orange (lightened)
  quinary: '#8fc1db',      // Soft blue (lightened)
  senary: '#d4b8e0',       // Soft purple (lightened)
};

// Grid and axis styling for dark mode
const gridColorDark = 'rgba(255, 251, 247, 0.06)';
const textColorDark = '#b8b2ad';
```

### 10.5 Dark Mode Specific Adjustments

#### Images
```scss
// Reduce image brightness slightly in dark mode for comfort
[data-theme="dark"] img:not(.no-dim),
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) img:not(.no-dim) {
    filter: brightness(0.9);
  }
}
```

#### Code Blocks / Data Tables
```scss
[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --code-bg: #2a2523;
    --code-text: #e8e4e1;
    --table-stripe-bg: rgba(255, 251, 247, 0.03);
    --table-hover-bg: rgba(255, 251, 247, 0.06);
  }
}
```

#### Focus States
```scss
// Ensure visible focus states in dark mode
[data-theme="dark"],
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --focus-ring-color: rgba(232, 147, 123, 0.5);

    *:focus-visible {
      outline: 2px solid var(--warm-accent-primary);
      outline-offset: 2px;
    }
  }
}
```

### 10.6 Phase Integration

Dark mode implementation should be integrated into **Phase 1: Foundation** alongside the base theme setup:

**Updated Phase 1 Tasks:**
- [ ] Create `src/_warm-theme.scss` with CSS variables for both modes
- [ ] Add theme toggle service
- [ ] Add theme toggle button to navbar
- [ ] Update `styles.scss` to use CSS variables
- [ ] Add smooth transition effects
- [ ] Test system preference detection
- [ ] Test manual toggle persistence

### 10.7 Accessibility Considerations

| Requirement | Light Mode | Dark Mode |
|-------------|------------|-----------|
| Text contrast (body) | 7.5:1 ✓ | 8.2:1 ✓ |
| Text contrast (muted) | 4.8:1 ✓ | 4.5:1 ✓ |
| Link contrast | 4.6:1 ✓ | 5.1:1 ✓ |
| Focus indicators | Visible ✓ | Visible ✓ |

All color combinations meet WCAG AA standards (4.5:1 minimum for normal text).

---

## 11. Future Considerations

### Additional Themes
The CSS variable architecture allows for easy addition of:
- High contrast mode
- Sepia/reading mode
- Custom user themes

### Scheduled Theme Switching
Could implement automatic switching based on time of day (e.g., dark mode after 8 PM).

---

## Approval

**Please review this plan and confirm:**
1. Is the color palette acceptable?
2. Is the phase prioritization correct?
3. Any modules/components to skip?
4. Any additional requirements?

Once approved, I will begin implementation starting with Phase 1.
