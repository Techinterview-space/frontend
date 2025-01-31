export class PercentileCollection<T> {
  private readonly values: Array<T>;

  constructor(values: Array<T>) {
    const totalItems = values.length;

    if (totalItems === 0) {
      this.values = [];
      return;
    }

    const itemsToRemove = Math.ceil(totalItems * 0.1);
    this.values = values.slice(itemsToRemove, totalItems - itemsToRemove);
  }

  getValues(): Array<T> {
    return this.values;
  }
}
