import Assertion from "@shared/validation/assertion";

export class Iso8601Date {
  // Migrated from AngularJS
  // https://raw.githubusercontent.com/Ins87/angular-date-interceptor/master/src/angular-date-interceptor.js
  private readonly iso8601 =
    /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?(([+-]\d\d:\d\d)|Z)?$/;

  private date: Date | null = null;

  constructor(private readonly source: string) {}

  valid(): boolean {
    return this.source != null && this.iso8601.test(this.source);
  }

  asDateOrFail(): Date {
    if (!this.valid()) {
      throw Error(`The string '${this.source}' is not valid ISO 8601 date`);
    }

    Assertion.stringNotNullOrEmpty(this.source, "source");

    if (this.date == null) {
      this.date = new Date(this.source);
    }

    return this.date;
  }
}
