import { FormatAsMoneyPipe } from "./format-as-money.pipe";

describe("FormatAsMoneyPipe", () => {
  it("return value less than 100", () => {
    const target = new FormatAsMoneyPipe();

    const result = target.transform(99.99);
    expect(result).toBe("99.99");
  });

  it("return value greater than 100", () => {
    const target = new FormatAsMoneyPipe();

    const result = target.transform(105.05);
    expect(result).toBe("105.05");
  });

  it("return value greater than 1000", () => {
    const target = new FormatAsMoneyPipe();

    const result = target.transform(1050.05);
    expect(result).toBe("1 050.05");
  });

  it("return value greater than 10000", () => {
    const target = new FormatAsMoneyPipe();

    const result = target.transform(10500.05);
    expect(result).toBe("10 500.05");
  });

  it("return value greater than 100000", () => {
    const target = new FormatAsMoneyPipe();

    const result = target.transform(100500.05);
    expect(result).toBe("100 500.05");
  });

  it("return value greater than 1000000", () => {
    const target = new FormatAsMoneyPipe();

    const result = target.transform(1000500.05);
    expect(result).toBe("1 000 500.05");
  });
});
