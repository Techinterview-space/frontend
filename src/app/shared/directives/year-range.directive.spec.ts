import { YearRangeValidator } from '@shared/directives/year-range.directive';

describe('YearRangeValidator', () => {
  it('return False If Year is between 1900 and 3000', () => {
    const target = new YearRangeValidator();
    target.min = 1900;
    target.max = 3000;
    const year = 2020;
    expect(target.checkIfYearRangeInvalid(year)).toBeFalsy();
  });

  it('return True If Year is not between 1900 and 3000', () => {
    const target = new YearRangeValidator();
    target.min = 1900;
    target.max = 3000;
    const year = 111111;
    expect(target.checkIfYearRangeInvalid(year)).toBeTruthy();
  });
});
