import { RgbColor } from "./rgb-color";

export class RandomRgbColor extends RgbColor {
  constructor() {
    super(
      RandomRgbColor.randomNumber(),
      RandomRgbColor.randomNumber(),
      RandomRgbColor.randomNumber()
    );
  }

  private static randomNumber(): number {
    return Math.floor(Math.random() * 255);
  }
}
