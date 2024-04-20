import { DateExtended } from "./date-extended";

describe("DateExtended", () => {
  const target = (date: string | number | Date): DateExtended => {
    return new DateExtended(new Date(date));
  };

  it("should fail if null was passed", () => {
    expect(() => new DateExtended(null)).toThrow();
  });

  it(".dayNumber should return dayNumber for dates that exist", () => {
    expect(target("2020-04-22").day).toBe(22);
    expect(target("2020-02-29").day).toBe(29);
  });

  it(".dayNumber should return dayNumber of next month for dates that do not exist", () => {
    // returns a date of 2020-03-02, that's why dayNumber is equal to 2.
    expect(target("2020-02-31").day).toBe(2);
  });

  it(".weekend should return true for weekends and false for workdays", () => {
    expect(target("2020-04-19").weekend).toBe(true); // Sunday
    expect(target("2020-04-18").weekend).toBe(true); // Saturday

    expect(target("2020-02-20").weekend).toBe(false); // Monday
    expect(target("2020-02-21").weekend).toBe(false); // Tuesday
  });

  it(".today() should return today", () => {
    const now = new Date(Date.now());

    const date = DateExtended.today();

    expect(now.getFullYear() === date.value!.getFullYear()).toBe(true);
    expect(now.getMonth() === date.value!.getMonth()).toBe(true);
    expect(now.getDate() === date.value!.getDate()).toBe(true);

    expect(date.value!.getHours()).toBe(0);
    expect(date.value!.getMinutes()).toBe(0);
    expect(date.value!.getSeconds()).toBe(0);
  });

  it(".endOfTheMonth() should return today, 23:59:59", () => {
    const january = target("2020-01-23");
    const march = target("2020-03-03");
    const april = target("2020-04-09");
    const may = target("2020-05-30");

    expect(january.endOfTheMonth()).toEqual(target("2020-01-31").endOfTheDay());
    expect(march.endOfTheMonth()).toEqual(target("2020-03-31").endOfTheDay());
    expect(april.endOfTheMonth()).toEqual(target("2020-04-30").endOfTheDay());
    expect(may.endOfTheMonth()).toEqual(target("2020-05-31").endOfTheDay());
  });

  it(".startOfTheDay() should return today, 00:00:00", () => {
    const now = new Date(Date.now());

    const date = DateExtended.today().startOfTheDay();

    expect(now.getFullYear() === date.getFullYear()).toBe(true);
    expect(now.getMonth() === date.getMonth()).toBe(true);
    expect(now.getDate() === date.getDate()).toBe(true);

    expect(date.getHours()).toBe(0);
    expect(date.getMinutes()).toBe(0);
    expect(date.getSeconds()).toBe(0);
  });

  it(".endOfTheDay() should return today, 23:59:59", () => {
    const now = new Date(Date.now());

    const date = DateExtended.today().endOfTheDay();

    expect(now.getFullYear() === date.getFullYear()).toBe(true);
    expect(now.getMonth() === date.getMonth()).toBe(true);
    expect(now.getDate() === date.getDate()).toBe(true);

    expect(date.getHours()).toBe(23);
    expect(date.getMinutes()).toBe(59);
    expect(date.getSeconds()).toBe(59);
  });

  it(".earlierThan() should return true if first date is earlier", () => {
    const first = target("2020-07-23");
    const second = target("2020-07-24");

    expect(first.earlierThan(second)).toBe(true);
    expect(first.earlierThan(second.value!)).toBe(true);

    expect(first.laterThan(second)).toBe(false);
    expect(first.laterThan(second.value!)).toBe(false);
  });

  it(".laterThan() should return true if first date is later than the second one", () => {
    const first = target("2020-07-24");
    const second = target("2020-07-23");

    expect(first.laterThan(second)).toBe(true);
    expect(first.laterThan(second.value!)).toBe(true);

    expect(first.earlierThan(second)).toBe(false);
    expect(first.earlierThan(second.value!)).toBe(false);
  });

  it(".sameDay() should return true if first date is the same day", () => {
    const first = target("2020-07-24");
    const second = target("2020-07-23");
    const third = target("2020-07-24");

    expect(first.sameDay(third)).toBe(true);
    expect(first.sameDay(third.value!)).toBe(true);

    expect(first.sameDay(second)).toBe(false);
    expect(first.sameDay(second.value!)).toBe(false);
  });

  it(".addDays() cases. Positive days number", () => {
    expect(target("2020-07-15").addDays(2).sameDay(target("2020-07-17"))).toBe(
      true
    );
    expect(target("2020-07-15").addDays(2).sameDay(target("2020-07-16"))).toBe(
      false
    );
    expect(target("2020-07-15").addDays(2).sameDay(target("2020-07-14"))).toBe(
      false
    );

    expect(target("2020-07-30").addDays(2).sameDay(target("2020-08-01"))).toBe(
      true
    );
    expect(target("2020-07-30").addDays(2).sameDay(target("2020-07-31"))).toBe(
      false
    );
    expect(target("2020-07-30").addDays(2).sameDay(target("2020-07-02"))).toBe(
      false
    );
  });

  it(".addDays() cases. Negative days number", () => {
    expect(target("2020-07-15").addDays(-2).sameDay(target("2020-07-13"))).toBe(
      true
    );
    expect(target("2020-07-15").addDays(-2).sameDay(target("2020-07-12"))).toBe(
      false
    );
    expect(target("2020-07-15").addDays(-2).sameDay(target("2020-07-17"))).toBe(
      false
    );

    expect(target("2020-07-30").addDays(-2).sameDay(target("2020-07-28"))).toBe(
      true
    );
    expect(target("2020-07-30").addDays(-2).sameDay(target("2020-07-31"))).toBe(
      false
    );
    expect(target("2020-07-30").addDays(-2).sameDay(target("2020-08-02"))).toBe(
      false
    );
  });

  it(".nextWorkDay() cases.", () => {
    expect(
      new DateExtended(target("2020-07-15").nextWorkDay()).sameDay(
        target("2020-07-16")
      )
    ).toBe(true);
    expect(
      new DateExtended(target("2020-12-11").nextWorkDay()).sameDay(
        target("2020-12-14")
      )
    ).toBe(true);
    expect(
      new DateExtended(target("2020-12-15").nextWorkDay()).sameDay(
        target("2020-12-16")
      )
    ).toBe(true);
  });
});
