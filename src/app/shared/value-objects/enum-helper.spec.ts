import { EnumHelper } from "./enum-helper";

enum Gender {
  Unknown = 0,
  Female = 1,
  Male = 2,
}

describe("EnumHelper", () => {
  it("getValues should return the enum values", () => {
    const result = EnumHelper.getValues(Gender);

    expect(result.length).toEqual(3);
    expect(result[0]).toEqual(0);
    expect(result[1]).toEqual(1);
    expect(result[2]).toEqual(2);
  });

  it("getValues should return the enum values", () => {
    const result = EnumHelper.getNames(Gender);

    expect(result.length).toEqual(3);
    expect(result[0]).toEqual("Unknown");
    expect(result[1]).toEqual("Female");
    expect(result[2]).toEqual("Male");
  });
});
