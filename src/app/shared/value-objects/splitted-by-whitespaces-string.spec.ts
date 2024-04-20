import { SplittedByWhitespacesString } from "./splitted-by-whitespaces-string";

describe("SplittedByWhitespacesString", () => {
  it("should split string in UpperCase", () => {
    expect(new SplittedByWhitespacesString("HelloWorld").value).toBe(
      "Hello World"
    );
  });

  it("should split empty string", () => {
    expect(new SplittedByWhitespacesString("").value).toBe("");
  });

  it("should split null string", () => {
    expect(new SplittedByWhitespacesString(null).value).toBe("");
  });

  it("should not split string in Lowercase", () => {
    expect(new SplittedByWhitespacesString("hellowold").value).toBe("");
  });

  it("should split null string in camelCase", () => {
    expect(new SplittedByWhitespacesString("helloWold").value).toBe("Wold");
  });
});
