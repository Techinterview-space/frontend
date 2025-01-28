export class PercentileCollection<T> {
  private readonly values: Array<T>;

  constructor(values: Array<T>) {
    const totalItems = values.length;
    const itemsToRemove = Math.ceil(totalItems * 0.1); // Calculate 10% of the total items

    // Remove the first 10% and the last 10% of the items
    this.values = values.slice(itemsToRemove, totalItems - itemsToRemove);
  }

  getValues(): Array<T> {
    return this.values;
  }
}
