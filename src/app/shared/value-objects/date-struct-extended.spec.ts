import { DateStructExtended } from './date-struct-extended';

describe('DateStructExtended', () => {
  it('should return the same date', () => {
    const target = new DateStructExtended(new Date('2020-04-03'));

    const result = target.toDateStruct()!;
    expect(result.year).toEqual(2020);
    expect(result.month).toEqual(4);
    expect(result.day).toEqual(3);
  });

  it('should return null if we pass null', () => {
    const target = new DateStructExtended(null);
    const result = target.toDateStruct();
    expect(result).toBeNull();
  });
});
