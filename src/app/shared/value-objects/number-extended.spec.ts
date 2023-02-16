import { NumberExtended } from './number-extended';

describe('NumberExtended', () => {
  it('should return null if some string passed', () => {
    const target = new NumberExtended('ololo');
    expect(target.valueOrNull()).toBeNull();
  });

  it('should return null if some object passed', () => {
    const target = new NumberExtended({
      awesome: 'property'
    });
    expect(target.valueOrNull()).toBeNull();
  });

  it('should return null if null passed', () => {
    const target = new NumberExtended(null);
    expect(target.valueOrNull()).toBeNull();
  });

  it('should return digit if digit as string passed', () => {
    expect(new NumberExtended('1').valueOrNull()).toEqual(1);
    expect(new NumberExtended('0').valueOrNull()).toEqual(0);
    expect(new NumberExtended('1488').valueOrNull()).toEqual(1488);
    expect(new NumberExtended('-1').valueOrNull()).toEqual(-1);
  });
});
