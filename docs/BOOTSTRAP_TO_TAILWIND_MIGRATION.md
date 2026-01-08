# Practical Bootstrap to Tailwind Migration Plan

## Overview

A hybrid approach where AI handles setup, creates migration patterns, and tackles complex components, while you replicate patterns across similar files. Estimated AI token usage: 50-100k tokens instead of 1M+.

## Approach

Split work between AI (complex/setup tasks) and You (repetitive pattern application). This reduces token usage by ~90% while maintaining quality.

---

## Phase 1: Setup & Configuration

### AI Tasks (Cursor will do)

1. Install and configure Tailwind CSS for Angular
2. Create `tailwind.config.js` with your custom color palette from `_colors.scss`
3. Update `angular.json` build configuration
4. Create base Tailwind styles in `styles.scss`

### Your Tasks

- Review and approve configuration changes
- Run `npm install` and verify build works

**Estimated tokens:** ~10,000

---

## Phase 2: Create Migration Reference Guide

### AI Tasks (Cursor will do)

1. Create a **Bootstrap-to-Tailwind class mapping document** covering:
   - Grid system (`container`, `row`, `col-*` → Tailwind equivalents)
   - Spacing utilities (`mt-3`, `mb-5`, `px-4` → Tailwind equivalents)
   - Flexbox utilities (`d-flex`, `justify-content-center` → Tailwind)
   - Text utilities (`text-muted`, `fst-italic` → Tailwind)
   - Common components (buttons, cards, alerts, badges)

2. Document responsive breakpoint differences:
   - Bootstrap: `sm: 576px`, `md: 768px`, `lg: 992px`
   - Tailwind: `sm: 640px`, `md: 768px`, `lg: 1024px`

### Your Tasks

- Save this reference guide for use during manual migration
- Bookmark it for quick lookup

**Estimated tokens:** ~8,000

---

## Phase 3: Migrate Shared Components (Templates)

### AI Tasks (Cursor will do)

Migrate these **template components** that are reused everywhere:

| Component | File | Why AI |
|-----------|------|--------|
| Button | `shared/components/submit-button/` | Base pattern for all buttons |
| Loading Button | `shared/components/loading-button/` | Spinner + button combo |
| Alert | `shared/components/alert/component/` | Used across all modules |
| Dialog/Modal | `shared/components/dialogs/dialog/` | Complex, Bootstrap JS dependent |
| Confirm Dialog | `shared/components/dialogs/confirm-dialog/` | Modal variant |
| Card (create) | New utility class or component | Pattern for card usage |
| Spinner | `shared/components/app-spinner/` | Loading states |
| Pagination | `shared/components/pagination-buttons/` | Complex UI |
| Field Error | `shared/components/field-error/` | Form validation styling |

### Your Tasks

- Review each migrated component
- Test in browser that styling looks correct
- Apply similar patterns to remaining shared components:
  - `go-back-button/`
  - `loading-spinner/`
  - `label/`
  - `status-label/`
  - `star-rating/`, `star-rating-readonly/`
  - `vote-buttons/`
  - Others in `shared/components/`

**Estimated tokens:** ~25,000

---

## Phase 4: Migrate Navbar (Bootstrap JS Replacement)

### AI Tasks (Cursor will do)

1. Rewrite `navbar.component.html` with Tailwind classes
2. Create Angular-native mobile menu toggle (replace Bootstrap collapse JS)
3. Create Angular-native dropdown component (replace Bootstrap dropdown JS)
4. Update `navbar.component.ts` with toggle logic
5. Update `navbar.component.scss`

### Your Tasks

- Test mobile responsiveness
- Test dropdown functionality
- Apply same pattern to `admin-navbar.component.html`

**Estimated tokens:** ~15,000

---

## Phase 5: Migrate One Representative Page Per Module

### AI Tasks (Cursor will do)

Migrate one complex page from each module as a reference:

| Module | Page to Migrate | Why This One |
|--------|-----------------|--------------|
| Home | `home.component.html` | Landing page, uses many patterns |
| Salaries | `salaries-chart.component.html` | Most complex, 500+ lines |
| Companies | `company-page.component.html` | Cards, reviews layout |
| Interviews | `interview-page.component.html` | Forms, markdown modal |
| Admin | `admin-start-page.component.html` | Admin layout pattern |

### Your Tasks

Using the migrated pages as reference, migrate remaining pages:

**Salaries module** (~31 templates):
- `add-salary/`, `edit-salary/`
- All chart components (`*-chart.component.html`)
- `salaries-paginated-table/`

**Companies module** (~5 templates):
- `companies-page/`, `add-review-page/`
- `company-review-block/`, `recent-reviews/`

**Interviews module** (~10 templates):
- `my-interviews/`, `my-interview-templates/`
- `interview-template-page/`, `interview-edit-page/`
- `public-interview-templates/`

**Admin module** (~27 templates):
- All admin pages following the pattern from `admin-start-page`

**Home module** (~13 templates):
- `me/`, `about-us/`, `telegram-bot/`
- Error pages, auth pages

**Users module** (~2 templates):
- `user-page/`, `my-user-labels/`

**Estimated tokens:** ~30,000

---

## Phase 6: Replace Bootstrap Icons

### AI Tasks (Cursor will do)

1. Recommend icon library (Heroicons, Lucide, or keep Bootstrap Icons standalone)
2. Create icon replacement mapping for the 75 icon usages
3. Show installation and usage pattern

### Your Tasks

- Find/replace icon classes across all templates
- Or: keep `bootstrap-icons` package (it works independently of Bootstrap CSS)

**Estimated tokens:** ~5,000

---

## Phase 7: Form Styling & ng-select

### AI Tasks (Cursor will do)

1. Create Tailwind form styles (`form-control`, `form-select` equivalents)
2. Update ng-select theme configuration for Tailwind
3. Migrate form validation styling (`.is-valid`, `.is-invalid`)

### Your Tasks

- Apply form styles to all form templates
- Test form validation visual feedback

**Estimated tokens:** ~8,000

---

## Phase 8: Cleanup & Removal

### AI Tasks (Cursor will do)

1. Update `package.json` - remove bootstrap dependencies
2. Update `angular.json` - remove Bootstrap from scripts
3. Update `styles.scss` - remove Bootstrap imports
4. Verify build succeeds

### Your Tasks

- Run full application test
- Check all pages visually
- Fix any missed Bootstrap classes (search for `btn-`, `col-`, etc.)

**Estimated tokens:** ~3,000

---

## Quick Reference: Class Mapping Cheatsheet

| Bootstrap | Tailwind |
|-----------|----------|
| `container` | `container mx-auto px-4` |
| `row` | `flex flex-wrap` |
| `col-6` | `w-1/2` |
| `col-sm-6` | `sm:w-1/2` |
| `col-md-4` | `md:w-1/3` |
| `col-lg-3` | `lg:w-1/4` |
| `d-flex` | `flex` |
| `d-none` | `hidden` |
| `d-block` | `block` |
| `d-sm-none` | `sm:hidden` |
| `d-md-block` | `md:block` |
| `justify-content-center` | `justify-center` |
| `justify-content-between` | `justify-between` |
| `justify-content-end` | `justify-end` |
| `align-items-center` | `items-center` |
| `align-items-start` | `items-start` |
| `align-items-end` | `items-end` |
| `flex-column` | `flex-col` |
| `flex-wrap` | `flex-wrap` |
| `mt-1` | `mt-1` (same) |
| `mt-2` | `mt-2` (same) |
| `mt-3` | `mt-3` (same) |
| `mt-4` | `mt-4` (same) |
| `mt-5` | `mt-5` (same) |
| `mb-*` | `mb-*` (same) |
| `ms-*` | `ml-*` |
| `me-*` | `mr-*` |
| `p-3` | `p-3` (same) |
| `px-3` | `px-3` (same) |
| `py-3` | `py-3` (same) |
| `text-muted` | `text-gray-500` |
| `text-center` | `text-center` (same) |
| `text-start` | `text-left` |
| `text-end` | `text-right` |
| `fw-bold` | `font-bold` |
| `fst-italic` | `italic` |
| `bg-white` | `bg-white` (same) |
| `bg-light` | `bg-gray-100` |
| `bg-dark` | `bg-gray-900` |
| `border` | `border` (same) |
| `border-2` | `border-2` (same) |
| `rounded` | `rounded` (same) |
| `shadow` | `shadow` (same) |
| `w-100` | `w-full` |
| `w-50` | `w-1/2` |
| `h-100` | `h-full` |
| `img-fluid` | `max-w-full h-auto` |

### Component Classes

| Bootstrap | Tailwind |
|-----------|----------|
| `btn btn-primary` | `bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700` |
| `btn btn-secondary` | `bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700` |
| `btn btn-success` | `bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700` |
| `btn btn-danger` | `bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700` |
| `btn btn-warning` | `bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600` |
| `btn btn-outline-primary` | `border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50` |
| `btn btn-outline-secondary` | `border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100` |
| `btn btn-outline-dark` | `border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-100` |
| `btn btn-lg` | Add `text-lg px-6 py-3` |
| `btn btn-sm` | Add `text-sm px-2 py-1` |
| `card` | `bg-white rounded-lg shadow` |
| `card-body` | `p-6` |
| `card-header` | `px-6 py-4 border-b` |
| `card-footer` | `px-6 py-4 border-t` |
| `alert alert-warning` | `bg-yellow-50 border-l-4 border-yellow-400 p-4 text-yellow-800` |
| `alert alert-danger` | `bg-red-50 border-l-4 border-red-400 p-4 text-red-800` |
| `alert alert-success` | `bg-green-50 border-l-4 border-green-400 p-4 text-green-800` |
| `alert alert-info` | `bg-blue-50 border-l-4 border-blue-400 p-4 text-blue-800` |
| `badge bg-primary` | `inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded` |
| `form-control` | `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500` |
| `form-select` | `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500` |
| `form-label` | `block text-sm font-medium text-gray-700 mb-1` |
| `form-check` | `flex items-center` |
| `form-check-input` | `h-4 w-4 text-blue-600 border-gray-300 rounded` |
| `is-invalid` | `border-red-500 focus:ring-red-500` |
| `is-valid` | `border-green-500 focus:ring-green-500` |
| `invalid-feedback` | `text-red-600 text-sm mt-1` |
| `table` | `min-w-full divide-y divide-gray-200` |
| `table-striped` | Add `odd:bg-white even:bg-gray-50` to rows |
| `table-hover` | Add `hover:bg-gray-100` to rows |
| `modal` | `fixed inset-0 z-50 overflow-y-auto` |
| `modal-dialog` | `relative mx-auto max-w-lg` |
| `modal-content` | `bg-white rounded-lg shadow-xl` |
| `modal-header` | `flex items-center justify-between p-4 border-b` |
| `modal-body` | `p-4` |
| `modal-footer` | `flex justify-end p-4 border-t gap-2` |
| `navbar` | `flex items-center justify-between p-4` |
| `navbar-brand` | `text-xl font-bold` |
| `nav-link` | `px-3 py-2 hover:text-gray-900` |
| `dropdown-menu` | `absolute mt-2 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5` |
| `dropdown-item` | `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100` |
| `spinner-border` | `animate-spin rounded-full border-2 border-gray-300 border-t-blue-600` |

---

## Total Estimated Token Usage

| Phase | Tokens |
|-------|--------|
| Phase 1: Setup | 10,000 |
| Phase 2: Reference Guide | 8,000 |
| Phase 3: Shared Components | 25,000 |
| Phase 4: Navbar | 15,000 |
| Phase 5: Representative Pages | 30,000 |
| Phase 6: Icons | 5,000 |
| Phase 7: Forms | 8,000 |
| Phase 8: Cleanup | 3,000 |
| **Total** | **~104,000 tokens** |

---

## Timeline

| Week | AI Work | Your Work |
|------|---------|-----------|
| 1 | Phases 1-3 | Review, test shared components |
| 2 | Phases 4-5 | Migrate remaining module pages |
| 3 | Phases 6-7 | Icon replacement, form updates |
| 4 | Phase 8 | Full testing, bug fixes |

---

## Checklist

### Phase 1
- [ ] Tailwind CSS installed (YOU: run `npm install -D tailwindcss postcss autoprefixer`)
- [x] `tailwind.config.js` created with custom colors
- [x] `postcss.config.js` created
- [x] `styles.scss` updated with Tailwind directives and component layer
- [ ] Build succeeds with both Bootstrap and Tailwind (YOU: run `ng serve`)

### Phase 2
- [ ] Class mapping reference created
- [ ] Breakpoint differences documented

### Phase 3
- [ ] `submit-button` migrated
- [ ] `loading-button` migrated
- [ ] `alert` migrated
- [ ] `dialog` migrated
- [ ] `confirm-dialog` migrated
- [ ] `app-spinner` migrated
- [ ] `pagination-buttons` migrated
- [ ] `field-error` migrated
- [ ] Remaining shared components migrated (YOUR TASK)

### Phase 4
- [ ] `navbar` migrated with Angular-native toggle
- [ ] Dropdowns working without Bootstrap JS
- [ ] Mobile responsive
- [ ] `admin-navbar` migrated (YOUR TASK)

### Phase 5
- [ ] `home.component.html` migrated
- [ ] `salaries-chart.component.html` migrated
- [ ] `company-page.component.html` migrated
- [ ] `interview-page.component.html` migrated
- [ ] `admin-start-page.component.html` migrated
- [ ] Remaining ~80 templates migrated (YOUR TASK)

### Phase 6
- [ ] Icon strategy decided
- [ ] Icon mapping created
- [ ] Icons replaced (YOUR TASK)

### Phase 7
- [ ] Form classes created
- [ ] ng-select themed
- [ ] Validation styling working
- [ ] All forms updated (YOUR TASK)

### Phase 8
- [ ] Bootstrap removed from `package.json`
- [ ] Bootstrap removed from `angular.json`
- [ ] Bootstrap imports removed from `styles.scss`
- [ ] Build succeeds
- [ ] All pages visually tested (YOUR TASK)

---

## How to Start

When ready, tell Cursor: **"Start Phase 1"** and AI will begin with Tailwind setup and configuration.

