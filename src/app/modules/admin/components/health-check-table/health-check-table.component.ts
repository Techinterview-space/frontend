import { Component, Input } from '@angular/core';
import { HealthCheckItem } from './health-check-item';

@Component({
  selector: 'app-health-check-table',
  templateUrl: './health-check-table.component.html',
  styleUrls: ['./health-check-table.component.scss']
})
export class HealthCheckTableComponent {
  @Input()
  items: Array<HealthCheckItem> = [];
}
