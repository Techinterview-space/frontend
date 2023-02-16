// TODO Maxim: rename to NumberEx
export class NumberExtended {
  private readonly source: any;

  constructor(source: any) {
    this.source = source;
  }

  valueOrNull(): number | null {
    if (this.source == null) {
      return null;
    }

    const value = Number(this.source);
    return !isNaN(value) ? value : null;
  }

  valueOrFail(): number {
    const value = this.valueOrNull();
    if (value == null) {
      throw Error(`Cannot parse '${this.source}' as number`);
    }

    return value;
  }
}
