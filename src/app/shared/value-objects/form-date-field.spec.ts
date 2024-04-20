import { FormDateField } from "./form-date-field";

describe("FormDateField", () => {
  it("should return the same date", () => {
    const value = {
      year: 2020,
      month: 4,
      day: 3,
    };
    const target = new FormDateField(value);

    const result = target.toDate()!;
    expect(result.getFullYear()).toEqual(2020);
    // Monthes in JS Date starts from 0, so April is the thirs month.
    expect(result.getMonth()).toEqual(3);
    expect(result.getDate()).toEqual(3);
  });

  it("should return null if we pass null", () => {
    const target = new FormDateField(null);
    const result = target.toDate();
    expect(result).toBeNull();
  });
});
