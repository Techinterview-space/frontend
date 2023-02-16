import { ConvertObjectToHttpParams } from '@shared/value-objects/convert-object-to-http';

describe('ConvertObjectToHttpParams', () => {
  it('.has() should return true if the HttpParam does exist', () => {
    const value = {
      year: 2020,
      month: 4,
      day: 3
    };
    const target = new ConvertObjectToHttpParams(value);

    const result = target.get();
    expect(result.has('year')).toBeTruthy();
    expect(result.has('month')).toBeTruthy();
    expect(result.has('day')).toBeTruthy();
  });

  it('.get() should return HttpParam if it does exist', () => {
    const value = {
      year: 2020,
      month: 4,
      day: 3
    };
    const target = new ConvertObjectToHttpParams(value);

    const result = target.get();
    expect(result.get('year')!.toString()).toBe('2020');
    expect(result.get('month')!.toString()).toBe('4');
    expect(result.get('day')!.toString()).toBe('3');
  });

  it('should throw Error if we pass null', () => {
    const target = new ConvertObjectToHttpParams(null);
    let errorWasThrown = false;
    try {
      const result = target.get();
    } catch (e) {
      errorWasThrown = true;
    }
    expect(errorWasThrown).toEqual(true);
  });
});
