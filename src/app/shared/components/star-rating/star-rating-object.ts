export class StartRatingObject {
    constructor(
        public readonly index: number,
        public filled: boolean
    ) {        
    }

    setFilled(currentRating: number): void {
        this.filled = this.index < currentRating;
    }
}