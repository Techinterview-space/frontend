export class DateDifference {
  private readonly difference: number;

  constructor(
    private readonly date1: Date,
    private readonly date2: Date,
  ) {
    this.difference = Math.abs(date2.getTime() - date1.getTime());
  }

  get differenceInDays(): number {
    return this.difference / (1000 * 60 * 60 * 24);
  }

  get differenceInMonths(): number {
    return this.differenceInDays / 30;
  }
}
