import { Chart } from "chart.js/auto";

// Brand charting system for the salaries visualizations.
//
// Source of truth is the warm-theme CSS custom properties (--warm-chart-*,
// --warm-grade-*, --warm-chart-text/grid), which already carry light and dark
// values. We read the *resolved* values at chart-build time so charts pick up
// the active theme; the literals below are the SSR / pre-paint fallback and
// must mirror the light-mode tokens. Colors are chosen by the role the data
// plays (comparison pair / sequential grades / categorical), never at random.

const FONT_FAMILY =
  '"Nunito", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const FALLBACK = {
  chart: ["#e07a5f", "#81b29a", "#6fa8c7", "#f2cc8f", "#c4a1d4", "#f4a261"],
  grid: "rgba(61, 45, 35, 0.08)",
  text: "#5c5c5c",
  grade: ["#f3d3c6", "#e8a98f", "#e07a5f", "#c1573c", "#97402a"],
  gradeUnknown: "#c9bdb2",
};

// Categorical order interleaves hue so adjacent series stay distinct.
const CHART_VARS = [
  "--warm-chart-1",
  "--warm-chart-2",
  "--warm-chart-5",
  "--warm-chart-3",
  "--warm-chart-6",
  "--warm-chart-4",
];

const GRADE_VARS = [
  "--warm-grade-trainee",
  "--warm-grade-junior",
  "--warm-grade-middle",
  "--warm-grade-senior",
  "--warm-grade-lead",
];

function readVar(name: string, fallback: string): string {
  if (
    typeof document === "undefined" ||
    typeof getComputedStyle === "undefined"
  ) {
    return fallback;
  }
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value.length > 0 ? value : fallback;
}

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace("#", "").trim();
  const full =
    h.length === 3
      ? h
          .split("")
          .map((c) => c + c)
          .join("")
      : h;
  return [
    parseInt(full.slice(0, 2), 16),
    parseInt(full.slice(2, 4), 16),
    parseInt(full.slice(4, 6), 16),
  ];
}

function withAlpha(color: string, alpha: number): string {
  if (color.startsWith("#")) {
    const [r, g, b] = hexToRgb(color);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }
  return color;
}

// Mix a hex color toward white (amount > 0) or black (amount < 0).
function shade(color: string, amount: number): string {
  const [r, g, b] = color.startsWith("#") ? hexToRgb(color) : [128, 128, 128];
  const target = amount >= 0 ? 255 : 0;
  const t = Math.abs(amount);
  const mix = (c: number) => Math.round(c + (target - c) * t);
  return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
}

export const ChartTheme = {
  font: FONT_FAMILY,

  axis(): { text: string; grid: string } {
    return {
      text: readVar("--warm-chart-text", FALLBACK.text),
      grid: readVar("--warm-chart-grid", FALLBACK.grid),
    };
  },

  // Comparison pair used everywhere KZ-company vs foreign-company appears, so
  // the eye learns the two colors once.
  comparisonPair(): {
    local: { bg: string; border: string };
    foreign: { bg: string; border: string };
  } {
    const local = readVar(CHART_VARS[0], FALLBACK.chart[0]); // terracotta
    const foreign = readVar(CHART_VARS[1], FALLBACK.chart[1]); // sage
    return {
      local: { bg: withAlpha(local, 0.92), border: local },
      foreign: { bg: withAlpha(foreign, 0.92), border: foreign },
    };
  },

  // Sequential ramp for the ordered grade scale (Trainee -> Lead).
  gradeRamp(): string[] {
    return GRADE_VARS.map((v, i) => readVar(v, FALLBACK.grade[i]));
  },

  gradeUnknown(): string {
    return readVar("--warm-grade-unknown", FALLBACK.gradeUnknown);
  },

  // Stable categorical color by index. The first six are the brand palette;
  // beyond that we shade the palette (lighter, then darker) so large category
  // sets stay distinct and on-brand instead of random.
  categorical(index: number): string {
    const base = CHART_VARS.map((v, i) => readVar(v, FALLBACK.chart[i]));
    const i = index % base.length;
    const cycle = Math.floor(index / base.length);
    if (cycle === 0) {
      return base[i];
    }
    const steps = [0, 0.32, -0.26, 0.52, -0.42];
    return shade(base[i], steps[cycle % steps.length]);
  },

  primary(): string {
    return readVar(CHART_VARS[0], FALLBACK.chart[0]);
  },

  withAlpha,

  // Set Chart.js global defaults once per build so every chart shares the warm
  // typography, axis, and tooltip treatment. Re-read each call so a chart built
  // after a theme toggle uses the right colors.
  applyDefaults(): void {
    const { text, grid } = this.axis();
    Chart.defaults.font.family = FONT_FAMILY;
    Chart.defaults.color = text;
    Chart.defaults.borderColor = grid;
    // Every bar chart gets a small radius on the open end (top for vertical,
    // right for horizontal); the axis-side corners stay square.
    Chart.defaults.elements.bar.borderRadius = 4;
    Chart.defaults.elements.bar.borderSkipped = "start";
    if (Chart.defaults.scale?.grid) {
      Chart.defaults.scale.grid.color = grid;
    }
    const tooltip = Chart.defaults.plugins?.tooltip;
    if (tooltip) {
      tooltip.backgroundColor = "rgba(45, 45, 45, 0.92)";
      tooltip.titleColor = "#f5f2f0";
      tooltip.bodyColor = "#f5f2f0";
      tooltip.cornerRadius = 8;
      tooltip.padding = 10;
      tooltip.boxPadding = 4;
    }
  },
};
