export class SplittedByWhitespacesString {
  readonly value: string;

  constructor(source: string | null) {
    if (source == null) {
      this.value = '';
      return;
    }

    var match = source.match(/[A-Z][a-z]+|[0-9]+/g);
    if (match) {
      this.value = match.join(' ');
      return;
    }

    this.value = '';
  }
}
