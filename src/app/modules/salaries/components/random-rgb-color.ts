import { RgbColor } from "./rgb-color";
import { ChartTheme } from "./chart-theme";

// The class name is retained so the ~14 charts that call `new RandomRgbColor()`
// need no edits, but it is no longer random: each instance takes the next color
// from the brand palette, so charts are on-brand and stable instead of arbitrary
// RGB. New charts should use ChartTheme directly (comparisonPair / gradeRamp /
// categorical) rather than this shim.
export class RandomRgbColor extends RgbColor {
  private static counter = 0;

  private readonly color: string;

  constructor() {
    super(0, 0, 0);
    ChartTheme.applyDefaults();
    this.color = ChartTheme.categorical(RandomRgbColor.counter++);
  }

  override toString(transparent: number | null): string {
    // Keep fills effectively opaque so bars and slices read as solid.
    return transparent != null
      ? ChartTheme.withAlpha(this.color, Math.max(transparent, 0.9))
      : this.color;
  }

  static resetCycle(): void {
    RandomRgbColor.counter = 0;
  }
}
