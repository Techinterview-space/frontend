import { OnlyNumberDirective } from "./numbers-only.directive";

describe("OnlyNumberDirective", () => {
  it(".isNotDigit should return false if digit is passed", () => {
    const target = new OnlyNumberDirective(null);

    expect(target.isDigit("1")).toEqual(true);
    expect(target.isDigit("1213")).toEqual(true);
    expect(target.isDigit("0234")).toEqual(true);
  });

  it(".isDigit should return false if not-digit is passed", () => {
    const target = new OnlyNumberDirective(null);

    expect(target.isDigit("asd")).toEqual(false);
    expect(target.isDigit("dfg")).toEqual(false);
    expect(target.isDigit("!@#$%^&*()_+=-")).toEqual(false);
  });

  it(".isSpecialKey should return true if allowed special key is passed", () => {
    const target = new OnlyNumberDirective(null);

    expect(target.isSpecialKey({ key: "Backspace" } as KeyboardEvent)).toEqual(
      true
    );
    expect(target.isSpecialKey({ key: "Tab" } as KeyboardEvent)).toEqual(true);
    expect(target.isSpecialKey({ key: "End" } as KeyboardEvent)).toEqual(true);
    expect(target.isSpecialKey({ key: "Home" } as KeyboardEvent)).toEqual(true);
    expect(target.isSpecialKey({ key: "Delete" } as KeyboardEvent)).toEqual(
      true
    );

    expect(target.isSpecialKey({ key: "Down" } as KeyboardEvent)).toEqual(true);
    expect(target.isSpecialKey({ key: "ArrowDown" } as KeyboardEvent)).toEqual(
      true
    );
    expect(target.isSpecialKey({ key: "Up" } as KeyboardEvent)).toEqual(true);
    expect(target.isSpecialKey({ key: "ArrowUp" } as KeyboardEvent)).toEqual(
      true
    );
    expect(target.isSpecialKey({ key: "Left" } as KeyboardEvent)).toEqual(true);
    expect(target.isSpecialKey({ key: "ArrowLeft" } as KeyboardEvent)).toEqual(
      true
    );
    expect(target.isSpecialKey({ key: "Right" } as KeyboardEvent)).toEqual(
      true
    );
    expect(target.isSpecialKey({ key: "ArrowRight" } as KeyboardEvent)).toEqual(
      true
    );
  });

  it(".isSpecialKey should return true if not allowed special key is passed", () => {
    const target = new OnlyNumberDirective(null);

    expect(target.isSpecialKey({ key: "a" } as KeyboardEvent)).toEqual(false);
    expect(target.isSpecialKey({ key: "s" } as KeyboardEvent)).toEqual(false);
    expect(target.isSpecialKey({ key: "d" } as KeyboardEvent)).toEqual(false);
    expect(target.isSpecialKey({ key: "f" } as KeyboardEvent)).toEqual(false);
    expect(target.isSpecialKey({ key: "g" } as KeyboardEvent)).toEqual(false);
  });
});
