import Assertion from "@shared/validation/assertion";

export class Interval {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(
    private readonly operation: () => void,
    private readonly ms: number
  ) {
    Assertion.notNull(operation, "operation");
  }

  start(): void {
    this.intervalId = setInterval(() => this.operation(), this.ms);
  }

  active(): boolean {
    return this.intervalId != null;
  }

  stop(): void {
    if (this.active()) {
      clearInterval(this.intervalId!);
      this.intervalId = null;
    }
  }
}
