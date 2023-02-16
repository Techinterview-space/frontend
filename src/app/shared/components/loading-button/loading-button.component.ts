import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-loading-button',
  templateUrl: './loading-button.component.html',
  styleUrls: ['./loading-button.component.scss']
})
export class LoadingButtonComponent {
  @Input()
  css = 'btn btn-primary';

  @Input()
  title = '';

  waitingResponse = false;
  timeout: NodeJS.Timeout | null = null;

  @Output() clicked = new EventEmitter<void>();

  preventDoubleSubmit(): void {
    this.waitingResponse = true;

    this.clicked.emit();

    // the value of 3000 is a random value. We think that each webrequest would be executed within the 3 seconds.
    this.timeout = setTimeout(() => {
      this.waitingResponse = false;
    }, 1000);
  }
}
