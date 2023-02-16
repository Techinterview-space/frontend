import Assertion from '@shared/validation/assertion';
import { HealthReport } from '@shared/health-check/health-report.model';
import { Observable } from 'rxjs';
import { StatusMarker } from '@models/enums';

export class HealthCheckItem {
  status = StatusMarker.Undefined;
  elapsed: number | null = null;

  get error(): boolean {
    return this.status === StatusMarker.Red;
  }

  get success(): boolean {
    return this.status === StatusMarker.Green;
  }

  constructor(
    public readonly title: string,
    public readonly hint: string,
    private readonly action: () => Observable<HealthReport>
  ) {
    Assertion.notNull(title, 'title');
    Assertion.notNull(hint, 'hint');
    Assertion.notNull(action, 'action');
  }

  execute(): void {
    this.elapsed = null;
    const start = Date.now();
    this.status = StatusMarker.Yellow;

    this.action().subscribe(
      r => {
        this.elapsed = Date.now() - start;
        this.status = StatusMarker.Green;
      },
      e => {
        this.elapsed = Date.now() - start;
        this.status = StatusMarker.Red;
      }
    );
  }
}
