# Bootstrap to Tailwind CSS Class Reference Guide

Use this guide when migrating templates from Bootstrap to Tailwind CSS.

---

## Table of Contents

1. [Layout & Grid](#layout--grid)
2. [Flexbox](#flexbox)
3. [Spacing](#spacing)
4. [Typography](#typography)
5. [Colors & Backgrounds](#colors--backgrounds)
6. [Borders](#borders)
7. [Sizing](#sizing)
8. [Display & Visibility](#display--visibility)
9. [Position](#position)
10. [Buttons](#buttons)
11. [Cards](#cards)
12. [Alerts](#alerts)
13. [Forms](#forms)
14. [Tables](#tables)
15. [Modals](#modals)
16. [Navbar](#navbar)
17. [Dropdowns](#dropdowns)
18. [Badges & Labels](#badges--labels)
19. [Spinners](#spinners)
20. [Responsive Breakpoints](#responsive-breakpoints)

---

## Layout & Grid

### Container

| Bootstrap | Tailwind |
|-----------|----------|
| `container` | `container mx-auto px-4` |
| `container-fluid` | `w-full px-4` |
| `container-sm` | `container mx-auto max-w-screen-sm px-4` |
| `container-md` | `container mx-auto max-w-screen-md px-4` |
| `container-lg` | `container mx-auto max-w-screen-lg px-4` |
| `container-xl` | `container mx-auto max-w-screen-xl px-4` |

### Grid System

Bootstrap uses a 12-column grid. Tailwind uses fractional widths.

| Bootstrap | Tailwind | Notes |
|-----------|----------|-------|
| `row` | `flex flex-wrap` | Add `-mx-4` for gutters |
| `col` | `flex-1` | Equal width columns |
| `col-1` | `w-1/12` | 8.33% |
| `col-2` | `w-2/12` or `w-1/6` | 16.67% |
| `col-3` | `w-3/12` or `w-1/4` | 25% |
| `col-4` | `w-4/12` or `w-1/3` | 33.33% |
| `col-5` | `w-5/12` | 41.67% |
| `col-6` | `w-6/12` or `w-1/2` | 50% |
| `col-7` | `w-7/12` | 58.33% |
| `col-8` | `w-8/12` or `w-2/3` | 66.67% |
| `col-9` | `w-9/12` or `w-3/4` | 75% |
| `col-10` | `w-10/12` or `w-5/6` | 83.33% |
| `col-11` | `w-11/12` | 91.67% |
| `col-12` | `w-full` | 100% |

### Responsive Grid

| Bootstrap | Tailwind |
|-----------|----------|
| `col-sm-6` | `sm:w-1/2` |
| `col-md-4` | `md:w-1/3` |
| `col-lg-3` | `lg:w-1/4` |
| `col-xl-2` | `xl:w-1/6` |

### Gap/Gutters

| Bootstrap | Tailwind |
|-----------|----------|
| `g-0` | `gap-0` |
| `g-1` | `gap-1` |
| `g-2` | `gap-2` |
| `g-3` | `gap-3` |
| `g-4` | `gap-4` |
| `g-5` | `gap-5` |
| `gx-*` | `gap-x-*` |
| `gy-*` | `gap-y-*` |

---

## Flexbox

| Bootstrap | Tailwind |
|-----------|----------|
| `d-flex` | `flex` |
| `d-inline-flex` | `inline-flex` |
| `flex-row` | `flex-row` |
| `flex-row-reverse` | `flex-row-reverse` |
| `flex-column` | `flex-col` |
| `flex-column-reverse` | `flex-col-reverse` |
| `flex-wrap` | `flex-wrap` |
| `flex-nowrap` | `flex-nowrap` |
| `flex-wrap-reverse` | `flex-wrap-reverse` |
| `flex-fill` | `flex-1` |
| `flex-grow-0` | `grow-0` |
| `flex-grow-1` | `grow` |
| `flex-shrink-0` | `shrink-0` |
| `flex-shrink-1` | `shrink` |

### Justify Content

| Bootstrap | Tailwind |
|-----------|----------|
| `justify-content-start` | `justify-start` |
| `justify-content-end` | `justify-end` |
| `justify-content-center` | `justify-center` |
| `justify-content-between` | `justify-between` |
| `justify-content-around` | `justify-around` |
| `justify-content-evenly` | `justify-evenly` |

### Align Items

| Bootstrap | Tailwind |
|-----------|----------|
| `align-items-start` | `items-start` |
| `align-items-end` | `items-end` |
| `align-items-center` | `items-center` |
| `align-items-baseline` | `items-baseline` |
| `align-items-stretch` | `items-stretch` |

### Align Self

| Bootstrap | Tailwind |
|-----------|----------|
| `align-self-start` | `self-start` |
| `align-self-end` | `self-end` |
| `align-self-center` | `self-center` |
| `align-self-baseline` | `self-baseline` |
| `align-self-stretch` | `self-stretch` |

### Align Content

| Bootstrap | Tailwind |
|-----------|----------|
| `align-content-start` | `content-start` |
| `align-content-end` | `content-end` |
| `align-content-center` | `content-center` |
| `align-content-between` | `content-between` |
| `align-content-around` | `content-around` |
| `align-content-stretch` | `content-stretch` |

---

## Spacing

### Margin

| Bootstrap | Tailwind | Value |
|-----------|----------|-------|
| `m-0` | `m-0` | 0 |
| `m-1` | `m-1` | 0.25rem |
| `m-2` | `m-2` | 0.5rem |
| `m-3` | `m-3` | 0.75rem |
| `m-4` | `m-4` | 1rem |
| `m-5` | `m-5` | 1.25rem |
| `m-auto` | `m-auto` | auto |

### Margin Directions

| Bootstrap | Tailwind |
|-----------|----------|
| `mt-*` | `mt-*` | margin-top |
| `mb-*` | `mb-*` | margin-bottom |
| `ms-*` | `ml-*` | margin-left (start) |
| `me-*` | `mr-*` | margin-right (end) |
| `mx-*` | `mx-*` | margin left & right |
| `my-*` | `my-*` | margin top & bottom |

### Padding

| Bootstrap | Tailwind |
|-----------|----------|
| `p-0` | `p-0` |
| `p-1` | `p-1` |
| `p-2` | `p-2` |
| `p-3` | `p-3` |
| `p-4` | `p-4` |
| `p-5` | `p-5` |

### Padding Directions

| Bootstrap | Tailwind |
|-----------|----------|
| `pt-*` | `pt-*` |
| `pb-*` | `pb-*` |
| `ps-*` | `pl-*` |
| `pe-*` | `pr-*` |
| `px-*` | `px-*` |
| `py-*` | `py-*` |

### Negative Margins

| Bootstrap | Tailwind |
|-----------|----------|
| `mt-n1` | `-mt-1` |
| `mt-n2` | `-mt-2` |
| `mb-n3` | `-mb-3` |

---

## Typography

### Font Size

| Bootstrap | Tailwind |
|-----------|----------|
| `fs-1` | `text-4xl` |
| `fs-2` | `text-3xl` |
| `fs-3` | `text-2xl` |
| `fs-4` | `text-xl` |
| `fs-5` | `text-lg` |
| `fs-6` | `text-base` |
| `small` | `text-sm` |
| `display-1` | `text-display-1` (custom) |
| `display-2` | `text-display-2` (custom) |
| `display-3` | `text-display-3` (custom) |
| `display-4` | `text-display-4` (custom) |

### Font Weight

| Bootstrap | Tailwind |
|-----------|----------|
| `fw-bold` | `font-bold` |
| `fw-bolder` | `font-extrabold` |
| `fw-semibold` | `font-semibold` |
| `fw-medium` | `font-medium` |
| `fw-normal` | `font-normal` |
| `fw-light` | `font-light` |
| `fw-lighter` | `font-thin` |

### Font Style

| Bootstrap | Tailwind |
|-----------|----------|
| `fst-italic` | `italic` |
| `fst-normal` | `not-italic` |

### Text Alignment

| Bootstrap | Tailwind |
|-----------|----------|
| `text-start` | `text-left` |
| `text-center` | `text-center` |
| `text-end` | `text-right` |
| `text-justify` | `text-justify` |

### Text Transform

| Bootstrap | Tailwind |
|-----------|----------|
| `text-lowercase` | `lowercase` |
| `text-uppercase` | `uppercase` |
| `text-capitalize` | `capitalize` |

### Text Decoration

| Bootstrap | Tailwind |
|-----------|----------|
| `text-decoration-none` | `no-underline` |
| `text-decoration-underline` | `underline` |
| `text-decoration-line-through` | `line-through` |

### Line Height

| Bootstrap | Tailwind |
|-----------|----------|
| `lh-1` | `leading-none` |
| `lh-sm` | `leading-tight` |
| `lh-base` | `leading-normal` |
| `lh-lg` | `leading-relaxed` |

### Text Wrapping

| Bootstrap | Tailwind |
|-----------|----------|
| `text-wrap` | `text-wrap` |
| `text-nowrap` | `whitespace-nowrap` |
| `text-break` | `break-words` |
| `text-truncate` | `truncate` |

---

## Colors & Backgrounds

### Text Colors

| Bootstrap | Tailwind |
|-----------|----------|
| `text-primary` | `text-blue-600` |
| `text-secondary` | `text-gray-600` |
| `text-success` | `text-green-600` |
| `text-danger` | `text-red-600` |
| `text-warning` | `text-amber-600` |
| `text-info` | `text-cyan-500` |
| `text-light` | `text-gray-100` |
| `text-dark` | `text-gray-900` |
| `text-white` | `text-white` |
| `text-black` | `text-black` |
| `text-muted` | `text-gray-500` |
| `text-body` | `text-gray-900` |
| `text-body-secondary` | `text-gray-600` |

### Background Colors

| Bootstrap | Tailwind |
|-----------|----------|
| `bg-primary` | `bg-blue-600` |
| `bg-secondary` | `bg-gray-600` |
| `bg-success` | `bg-green-600` |
| `bg-danger` | `bg-red-600` |
| `bg-warning` | `bg-amber-500` |
| `bg-info` | `bg-cyan-500` |
| `bg-light` | `bg-gray-100` |
| `bg-dark` | `bg-gray-900` |
| `bg-white` | `bg-white` |
| `bg-black` | `bg-black` |
| `bg-transparent` | `bg-transparent` |

### Opacity

| Bootstrap | Tailwind |
|-----------|----------|
| `opacity-0` | `opacity-0` |
| `opacity-25` | `opacity-25` |
| `opacity-50` | `opacity-50` |
| `opacity-75` | `opacity-75` |
| `opacity-100` | `opacity-100` |

---

## Borders

### Border

| Bootstrap | Tailwind |
|-----------|----------|
| `border` | `border` |
| `border-0` | `border-0` |
| `border-top` | `border-t` |
| `border-end` | `border-r` |
| `border-bottom` | `border-b` |
| `border-start` | `border-l` |
| `border-top-0` | `border-t-0` |
| `border-end-0` | `border-r-0` |
| `border-bottom-0` | `border-b-0` |
| `border-start-0` | `border-l-0` |

### Border Width

| Bootstrap | Tailwind |
|-----------|----------|
| `border-1` | `border` |
| `border-2` | `border-2` |
| `border-3` | `border-4` |
| `border-4` | `border-4` |
| `border-5` | `border-8` |

### Border Color

| Bootstrap | Tailwind |
|-----------|----------|
| `border-primary` | `border-blue-600` |
| `border-secondary` | `border-gray-600` |
| `border-success` | `border-green-600` |
| `border-danger` | `border-red-600` |
| `border-warning` | `border-amber-500` |
| `border-info` | `border-cyan-500` |
| `border-light` | `border-gray-200` |
| `border-dark` | `border-gray-800` |
| `border-white` | `border-white` |

### Border Radius

| Bootstrap | Tailwind |
|-----------|----------|
| `rounded` | `rounded` |
| `rounded-0` | `rounded-none` |
| `rounded-1` | `rounded-sm` |
| `rounded-2` | `rounded` |
| `rounded-3` | `rounded-lg` |
| `rounded-4` | `rounded-xl` |
| `rounded-5` | `rounded-2xl` |
| `rounded-circle` | `rounded-full` |
| `rounded-pill` | `rounded-full` |
| `rounded-top` | `rounded-t` |
| `rounded-end` | `rounded-r` |
| `rounded-bottom` | `rounded-b` |
| `rounded-start` | `rounded-l` |

---

## Sizing

### Width

| Bootstrap | Tailwind |
|-----------|----------|
| `w-25` | `w-1/4` |
| `w-50` | `w-1/2` |
| `w-75` | `w-3/4` |
| `w-100` | `w-full` |
| `w-auto` | `w-auto` |
| `mw-100` | `max-w-full` |
| `vw-100` | `w-screen` |
| `min-vw-100` | `min-w-screen` |

### Height

| Bootstrap | Tailwind |
|-----------|----------|
| `h-25` | `h-1/4` |
| `h-50` | `h-1/2` |
| `h-75` | `h-3/4` |
| `h-100` | `h-full` |
| `h-auto` | `h-auto` |
| `mh-100` | `max-h-full` |
| `vh-100` | `h-screen` |
| `min-vh-100` | `min-h-screen` |

---

## Display & Visibility

### Display

| Bootstrap | Tailwind |
|-----------|----------|
| `d-none` | `hidden` |
| `d-inline` | `inline` |
| `d-inline-block` | `inline-block` |
| `d-block` | `block` |
| `d-grid` | `grid` |
| `d-table` | `table` |
| `d-table-row` | `table-row` |
| `d-table-cell` | `table-cell` |
| `d-flex` | `flex` |
| `d-inline-flex` | `inline-flex` |

### Responsive Display

| Bootstrap | Tailwind |
|-----------|----------|
| `d-sm-none` | `sm:hidden` |
| `d-sm-block` | `sm:block` |
| `d-md-none` | `md:hidden` |
| `d-md-block` | `md:block` |
| `d-lg-none` | `lg:hidden` |
| `d-lg-block` | `lg:block` |
| `d-xl-none` | `xl:hidden` |
| `d-xl-block` | `xl:block` |

### Visibility

| Bootstrap | Tailwind |
|-----------|----------|
| `visible` | `visible` |
| `invisible` | `invisible` |

---

## Position

| Bootstrap | Tailwind |
|-----------|----------|
| `position-static` | `static` |
| `position-relative` | `relative` |
| `position-absolute` | `absolute` |
| `position-fixed` | `fixed` |
| `position-sticky` | `sticky` |
| `top-0` | `top-0` |
| `top-50` | `top-1/2` |
| `top-100` | `top-full` |
| `bottom-0` | `bottom-0` |
| `bottom-50` | `bottom-1/2` |
| `bottom-100` | `bottom-full` |
| `start-0` | `left-0` |
| `start-50` | `left-1/2` |
| `start-100` | `left-full` |
| `end-0` | `right-0` |
| `end-50` | `right-1/2` |
| `end-100` | `right-full` |
| `translate-middle` | `-translate-x-1/2 -translate-y-1/2` |
| `translate-middle-x` | `-translate-x-1/2` |
| `translate-middle-y` | `-translate-y-1/2` |

---

## Buttons

### Basic Buttons

| Bootstrap | Tailwind (use component classes or inline) |
|-----------|---------------------------------------------|
| `btn` | `px-4 py-2 rounded font-medium transition-colors` |
| `btn btn-primary` | `btn-tw-primary` or `bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700` |
| `btn btn-secondary` | `btn-tw-secondary` or `bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700` |
| `btn btn-success` | `btn-tw-success` or `bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700` |
| `btn btn-danger` | `btn-tw-danger` or `bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700` |
| `btn btn-warning` | `btn-tw-warning` or `bg-amber-500 text-gray-900 px-4 py-2 rounded hover:bg-amber-600` |
| `btn btn-info` | `bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600` |
| `btn btn-light` | `bg-gray-100 text-gray-900 px-4 py-2 rounded hover:bg-gray-200` |
| `btn btn-dark` | `bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-800` |

### Outline Buttons

| Bootstrap | Tailwind |
|-----------|----------|
| `btn btn-outline-primary` | `btn-tw-outline-primary` or `border border-blue-600 text-blue-600 px-4 py-2 rounded hover:bg-blue-50` |
| `btn btn-outline-secondary` | `btn-tw-outline-secondary` or `border border-gray-400 text-gray-700 px-4 py-2 rounded hover:bg-gray-100` |
| `btn btn-outline-success` | `btn-tw-outline-success` or `border border-green-600 text-green-600 px-4 py-2 rounded hover:bg-green-50` |
| `btn btn-outline-danger` | `border border-red-600 text-red-600 px-4 py-2 rounded hover:bg-red-50` |
| `btn btn-outline-dark` | `btn-tw-outline-dark` or `border border-gray-800 text-gray-800 px-4 py-2 rounded hover:bg-gray-100` |

### Button Sizes

| Bootstrap | Tailwind |
|-----------|----------|
| `btn-lg` | `text-lg px-6 py-3` or add `btn-tw-lg` |
| `btn-sm` | `text-sm px-2 py-1` or add `btn-tw-sm` |

### Button States

| Bootstrap | Tailwind |
|-----------|----------|
| `disabled` | `disabled:opacity-50 disabled:cursor-not-allowed` |
| `active` | `active:bg-blue-800` (adjust color as needed) |

### Close Button

| Bootstrap | Tailwind |
|-----------|----------|
| `btn-close` | `text-gray-400 hover:text-gray-600` + custom X icon |

---

## Cards

| Bootstrap | Tailwind |
|-----------|----------|
| `card` | `card-tw` or `bg-white rounded-lg shadow` |
| `card-body` | `card-tw-body` or `p-6` |
| `card-header` | `px-6 py-4 border-b bg-gray-50` |
| `card-footer` | `px-6 py-4 border-t bg-gray-50` |
| `card-title` | `text-xl font-semibold mb-2` |
| `card-subtitle` | `text-gray-600 mb-4` |
| `card-text` | `text-gray-700` |
| `card-img-top` | `rounded-t-lg` |
| `card-img-bottom` | `rounded-b-lg` |

---

## Alerts

| Bootstrap | Tailwind |
|-----------|----------|
| `alert` | `p-4 rounded-lg border-l-4` |
| `alert alert-primary` | `bg-blue-50 border-blue-400 text-blue-800 p-4 rounded-lg border-l-4` |
| `alert alert-secondary` | `bg-gray-50 border-gray-400 text-gray-800 p-4 rounded-lg border-l-4` |
| `alert alert-success` | `alert-tw-success` or `bg-green-50 border-green-400 text-green-800 p-4 rounded-lg border-l-4` |
| `alert alert-danger` | `alert-tw-danger` or `bg-red-50 border-red-400 text-red-800 p-4 rounded-lg border-l-4` |
| `alert alert-warning` | `alert-tw-warning` or `bg-amber-50 border-amber-400 text-amber-800 p-4 rounded-lg border-l-4` |
| `alert alert-info` | `alert-tw-info` or `bg-cyan-50 border-cyan-400 text-cyan-800 p-4 rounded-lg border-l-4` |
| `alert-heading` | `text-lg font-bold mb-2` |
| `alert-dismissible` | Add close button with Angular click handler |

---

## Forms

### Form Controls

| Bootstrap | Tailwind |
|-----------|----------|
| `form-control` | `form-input-tw` or `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500` |
| `form-control-lg` | Add `text-lg py-3` |
| `form-control-sm` | Add `text-sm py-1` |
| `form-select` | `form-select-tw` or `w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500` |
| `form-label` | `form-label-tw` or `block text-sm font-medium text-gray-700 mb-1` |
| `form-text` | `text-sm text-gray-500 mt-1` |

### Form Validation

| Bootstrap | Tailwind |
|-----------|----------|
| `is-valid` | `form-input-valid` or `border-green-500 focus:ring-green-500` |
| `is-invalid` | `form-input-invalid` or `border-red-500 focus:ring-red-500` |
| `valid-feedback` | `text-green-600 text-sm mt-1` |
| `invalid-feedback` | `text-red-600 text-sm mt-1` |

### Checkboxes & Radios

| Bootstrap | Tailwind |
|-----------|----------|
| `form-check` | `flex items-center` |
| `form-check-input` | `h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500` |
| `form-check-label` | `ml-2 text-gray-700` |
| `form-switch` | Use custom toggle with `relative inline-flex` |

### Input Groups

| Bootstrap | Tailwind |
|-----------|----------|
| `input-group` | `flex` |
| `input-group-text` | `px-3 py-2 bg-gray-100 border border-gray-300 text-gray-600` |

### Form Layout

| Bootstrap | Tailwind |
|-----------|----------|
| `form-floating` | Custom implementation needed |
| `mb-3` (form groups) | `mb-4` or `space-y-4` on parent |
| `row` + `col-*` | `grid grid-cols-*` or `flex` |

---

## Tables

| Bootstrap | Tailwind |
|-----------|----------|
| `table` | `min-w-full divide-y divide-gray-200` |
| `table-striped` | Add `odd:bg-white even:bg-gray-50` to `<tr>` |
| `table-hover` | Add `hover:bg-gray-100` to `<tr>` |
| `table-bordered` | `border border-gray-200` + `border` on cells |
| `table-borderless` | Remove borders |
| `table-sm` | `text-sm` + reduced padding |
| `table-responsive` | Wrap in `overflow-x-auto` |
| `thead-dark` | `bg-gray-800 text-white` |
| `thead-light` | `bg-gray-50 text-gray-700` |
| `<th>` | `px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider` |
| `<td>` | `px-6 py-4 whitespace-nowrap` |

---

## Modals

| Bootstrap | Tailwind |
|-----------|----------|
| `modal` | `modal-tw-overlay` or `fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-60` |
| `modal-dialog` | `modal-tw-dialog` or `relative mx-auto my-8 max-w-lg` |
| `modal-dialog modal-lg` | Add `max-w-4xl` |
| `modal-dialog modal-sm` | Add `max-w-sm` |
| `modal-dialog modal-xl` | Add `max-w-6xl` |
| `modal-content` | `modal-tw-content` or `bg-white rounded-lg shadow-xl` |
| `modal-header` | `modal-tw-header` or `flex items-center justify-between p-4 border-b` |
| `modal-title` | `text-xl font-semibold` |
| `modal-body` | `modal-tw-body` or `p-4` |
| `modal-footer` | `modal-tw-footer` or `flex justify-end p-4 border-t gap-2` |

### Modal Animation

```html
<!-- Add to modal-overlay for fade effect -->
class="... animate-fade-in"

<!-- In tailwind.config.js -->
animation: {
  'fade-in': 'fadeIn 0.2s ease-out',
}
keyframes: {
  fadeIn: {
    '0%': { opacity: '0' },
    '100%': { opacity: '1' },
  }
}
```

---

## Navbar

| Bootstrap | Tailwind |
|-----------|----------|
| `navbar` | `flex items-center justify-between p-4` |
| `navbar-brand` | `text-xl font-bold` |
| `navbar-nav` | `flex items-center space-x-4` |
| `nav-item` | (not needed, style links directly) |
| `nav-link` | `px-3 py-2 text-gray-700 hover:text-gray-900` |
| `navbar-toggler` | `md:hidden p-2` + hamburger icon |
| `navbar-collapse` | Use Angular `*ngIf` for toggle |
| `navbar-expand-md` | Use `hidden md:flex` pattern |
| `navbar-light` | `bg-white text-gray-900` |
| `navbar-dark` | `bg-gray-900 text-white` |

---

## Dropdowns

| Bootstrap | Tailwind |
|-----------|----------|
| `dropdown` | `relative` (parent container) |
| `dropdown-toggle` | (trigger element, add click handler) |
| `dropdown-menu` | `absolute mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5` |
| `dropdown-item` | `block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100` |
| `dropdown-divider` | `border-t border-gray-100 my-1` |
| `dropdown-header` | `px-4 py-2 text-xs font-semibold text-gray-500 uppercase` |
| `dropup` | Change `mt-2` to `mb-2 bottom-full` |
| `dropend` | Change to `left-full ml-2 top-0` |
| `dropstart` | Change to `right-full mr-2 top-0` |

---

## Badges & Labels

| Bootstrap | Tailwind |
|-----------|----------|
| `badge` | `inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium` |
| `badge bg-primary` | `bg-blue-100 text-blue-800` (or `bg-blue-600 text-white`) |
| `badge bg-secondary` | `bg-gray-100 text-gray-800` |
| `badge bg-success` | `bg-green-100 text-green-800` |
| `badge bg-danger` | `bg-red-100 text-red-800` |
| `badge bg-warning` | `bg-amber-100 text-amber-800` |
| `badge bg-info` | `bg-cyan-100 text-cyan-800` |
| `badge rounded-pill` | Already `rounded-full` |

---

## Spinners

| Bootstrap | Tailwind |
|-----------|----------|
| `spinner-border` | `spinner-tw` or `animate-spin rounded-full border-2 border-gray-300 border-t-blue-600` |
| `spinner-border-sm` | Add `h-4 w-4` |
| `spinner-border` (default) | Add `h-8 w-8` |
| `spinner-grow` | Use `animate-pulse` with a circle |

### Example Spinner Sizes

```html
<!-- Small -->
<div class="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>

<!-- Medium -->
<div class="animate-spin rounded-full h-8 w-8 border-2 border-gray-300 border-t-blue-600"></div>

<!-- Large -->
<div class="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-blue-600"></div>
```

---

## Responsive Breakpoints

### Breakpoint Comparison

| Breakpoint | Bootstrap | Tailwind |
|------------|-----------|----------|
| Extra small | `<576px` (default) | `<640px` (default) |
| Small | `sm: ≥576px` | `sm: ≥640px` |
| Medium | `md: ≥768px` | `md: ≥768px` |
| Large | `lg: ≥992px` | `lg: ≥1024px` |
| Extra large | `xl: ≥1200px` | `xl: ≥1280px` |
| XXL | `xxl: ≥1400px` | `2xl: ≥1536px` |

### Responsive Prefix Usage

| Bootstrap | Tailwind |
|-----------|----------|
| `col-sm-6` | `sm:w-1/2` |
| `d-md-none` | `md:hidden` |
| `d-lg-block` | `lg:block` |
| `text-xl-center` | `xl:text-center` |
| `mt-md-5` | `md:mt-5` |

---

## Image Utilities

| Bootstrap | Tailwind |
|-----------|----------|
| `img-fluid` | `max-w-full h-auto` |
| `img-thumbnail` | `border rounded p-1` |
| `rounded` | `rounded` |
| `rounded-circle` | `rounded-full` |

---

## Shadow Utilities

| Bootstrap | Tailwind |
|-----------|----------|
| `shadow-none` | `shadow-none` |
| `shadow-sm` | `shadow-sm` |
| `shadow` | `shadow` |
| `shadow-lg` | `shadow-lg` |

---

## Overflow

| Bootstrap | Tailwind |
|-----------|----------|
| `overflow-auto` | `overflow-auto` |
| `overflow-hidden` | `overflow-hidden` |
| `overflow-visible` | `overflow-visible` |
| `overflow-scroll` | `overflow-scroll` |

---

## Cursor

| Bootstrap | Tailwind |
|-----------|----------|
| `cursor-pointer` (custom) | `cursor-pointer` |
| `pe-none` | `pointer-events-none` |
| `pe-auto` | `pointer-events-auto` |

---

## Z-Index

| Bootstrap | Tailwind |
|-----------|----------|
| (custom) | `z-0`, `z-10`, `z-20`, `z-30`, `z-40`, `z-50` |
| `position-fixed` navbar | `z-50` |
| modal backdrop | `z-40` |
| modal content | `z-50` |
| dropdown | `z-10` |

---

## Quick Search/Replace Patterns

Use these regex patterns for bulk replacements:

```
# Container
container(?!-)  →  container mx-auto px-4

# Flex
d-flex  →  flex
flex-column  →  flex-col

# Justify
justify-content-center  →  justify-center
justify-content-between  →  justify-between
justify-content-end  →  justify-end

# Align
align-items-center  →  items-center
align-items-start  →  items-start
align-items-end  →  items-end

# Display
d-none  →  hidden
d-block  →  block
d-inline-block  →  inline-block

# Margin start/end
ms-(\d)  →  ml-$1
me-(\d)  →  mr-$1

# Padding start/end
ps-(\d)  →  pl-$1
pe-(\d)  →  pr-$1

# Text
text-muted  →  text-gray-500
fw-bold  →  font-bold
fst-italic  →  italic

# Width
w-100  →  w-full
w-50  →  w-1/2

# Height
h-100  →  h-full
```

---

## Notes

1. **Tailwind is utility-first** - you'll often use multiple classes where Bootstrap uses one.

2. **Component classes** - Use the pre-defined classes in `styles.scss` (`btn-tw-*`, `card-tw`, `alert-tw-*`, etc.) for common patterns.

3. **Responsive classes** - Tailwind uses `{breakpoint}:{class}` format (e.g., `md:w-1/2`).

4. **Hover/Focus states** - Use `hover:` and `focus:` prefixes (e.g., `hover:bg-blue-700`).

5. **Dark mode** - If needed later, use `dark:` prefix.

6. **Custom values** - Use arbitrary values with brackets: `w-[300px]`, `mt-[20px]`.

