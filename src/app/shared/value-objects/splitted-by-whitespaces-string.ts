export class SplittedByWhitespacesString {
  readonly value: string;

  constructor(source: string | null) {
    if (source == null) {
      this.value = "";
      return;
    }

    const match = source.match(/[A-Z][a-z]+|[0-9]+/g);
    if (match) {
      this.value = match.join(" ");
      return;
    }

    this.value = "";
  }

  toString(): string {
    return this.value;
  }
}
