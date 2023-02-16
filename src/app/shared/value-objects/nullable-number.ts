export class NullableNumber {
  private readonly source: number | null;

  constructor(source: number | null) {
    this.source = source != null && source !== 0 ? source : null;
  }

  get value(): number | null {
    return this.source;
  }

  get hasValue(): boolean {
    return this.source != null;
  }
}
