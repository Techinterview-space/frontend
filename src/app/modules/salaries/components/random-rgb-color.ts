export class RandomRgbColor {

    private readonly _r: number;
    private readonly _g: number;
    private readonly _b: number;

    constructor() {
        this._r = RandomRgbColor.randomNumber();
        this._g = RandomRgbColor.randomNumber();
        this._b = RandomRgbColor.randomNumber();
    }

    toString(transparent: number | null): string {
        if (transparent != null) {
            return `rgba(${this._r}, ${this._g}, ${this._b}, ${transparent})`;
        }

        return `rgb(${this._r}, ${this._g}, ${this._b})`;
    }

    private static randomNumber(): number {
        return Math.floor(Math.random() * 255);
    }
}
