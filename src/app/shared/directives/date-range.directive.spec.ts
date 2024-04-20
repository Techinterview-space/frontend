import { DateRangeValidator } from "@shared/directives/date-range.directive";

describe("DateRangeValidator", () => {
  it("return False If StartDate larger than EndDate", () => {
    const startDate = new Date("01.01.2020");
    const endDate = new Date("01.12.2020");
    const target = new DateRangeValidator("");
    expect(target.checkIfDateRangeInvalid(startDate, endDate)).toBeFalsy();
  });

  it("return True If StartDate larger than EndDate", () => {
    const startDate = new Date("01.01.2020");
    const endDate = new Date("01.12.2019");
    const target = new DateRangeValidator("");
    expect(target.checkIfDateRangeInvalid(startDate, endDate)).toBeTruthy();
  });
});
