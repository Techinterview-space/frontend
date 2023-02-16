import Assertion from '@shared/validation/assertion';

// tslint:disable:no-bitwise
export class FlagEnum<TEnum extends number> {
  constructor(private readonly value: TEnum) {
    Assertion.notNull(value, 'value');
  }

  public Or(flag: TEnum): FlagEnum<TEnum> {
    const value = this.value | flag;
    return new FlagEnum<TEnum>(value as TEnum);
  }

  public And(flag: TEnum): FlagEnum<TEnum> {
    const value = this.value & flag;
    return new FlagEnum<TEnum>(value as TEnum);
  }

  public Has(flag: TEnum): boolean {
    return (this.value & flag) === flag;
  }
}
