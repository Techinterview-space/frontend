export class RgbColor {
  constructor(
    readonly _r: number,
    readonly _g: number,
    readonly _b: number
  ) {
  }

  toString(transparent: number | null): string {
    if (transparent != null) {
      return `rgba(${this._r}, ${this._g}, ${this._b}, ${transparent})`;
    }

    return `rgb(${this._r}, ${this._g}, ${this._b})`;
  }

  static red(darken = 0): RgbColor {
    return new RgbColor(219 - darken, 61 - darken, 67 - darken);
  }

  static lightGreen(darken = 0): RgbColor {
    return new RgbColor(35 - darken, 255 - darken, 0 - darken);
  }

  static green(darken = 0): RgbColor {
    return new RgbColor(16 - darken, 98 - darken, 43 - darken);
  }

  static grey(darken = 0): RgbColor {
    return new RgbColor(170 - darken, 170 - darken, 171 - darken);
  }

  static blue(darken = 0): RgbColor {
    return new RgbColor(0 - darken, 158 - darken, 255 - darken);
  }
}
