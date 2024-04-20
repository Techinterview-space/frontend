import { DateStruct } from "./date-extended";

export class DateStructExtended implements DateStruct {
  private hasDate = false;

  constructor(date: Date | null) {
    this.hasDate = date != null;
    if (date != null) {
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
      this.day = date.getDate();
    } else {
      this.year = 0;
      this.month = 0;
      this.day = 0;
    }
  }

  year: number;
  month: number;
  day: number;

  toDateStruct(): DateStruct | null {
    return this.hasDate ? this : null;
  }
}
