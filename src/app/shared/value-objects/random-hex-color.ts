export class RandomHexColor {

    private static readonly colors = [
        '#CDE3C9',
        '#EFF7CF',
        '#D6D4D8',
        '#DDE3E3',
        '#C4D4CF',
        '#DECED6',
        '#E3DBE6',
        '#F9C8D5',
        '#F9BBB3',
        '#FDE8B0',
        '#C0E3EC',
        '#F8CEB5',
        '#FAD3B3',
        '#FBD7B1',
        '#FCDDC5',
        '#C5D1D3',
        '#C5D4E7',
    ];

    private readonly value: string;
    constructor() {
        this.value = RandomHexColor.colors[RandomHexColor.randomIntFromInterval(0, RandomHexColor.colors.length - 1)];
    }

    static randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    toString(): string {
        return this.value;
    }
}
