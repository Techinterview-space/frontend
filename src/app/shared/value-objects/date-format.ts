import Assertion from "@shared/validation/assertion";

export class DateFormat {
  constructor(private readonly date: Date | null) {}

  /** Gets the day-of-the-month, using local time. */
  get day(): number {
    return this.date!.getDate();
  }

  /** Gets month from 1 to 12, using local time. */
  get month(): number {
    return this.date!.getMonth() + 1;
  }

  /** Gets year, using local time. */
  get year(): number {
    return this.date!.getFullYear();
  }

  asStringOrFail(): string {
    const result = this.asStringOrNull();
    Assertion.notNull(result, "result");
    return result!;
  }

  asStringOrNull(): string | null {
    if (this.date == null) {
      return null;
    }

    let month = this.month.toString();
    let day = this.day.toString();
    const year = this.year.toString();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [year, month, day].join("-");
  }
}
