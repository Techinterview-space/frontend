export class RandomHexColor {
    private readonly value: string;
    constructor() {
        let result = '';
        for (let i = 0; i < 6; ++i) {
            const value = Math.floor(16 * Math.random());
            result += value.toString(16);
        }

        this.value = '#' + result;
    }

    toString(): string {
        return this.value;
    }
}
