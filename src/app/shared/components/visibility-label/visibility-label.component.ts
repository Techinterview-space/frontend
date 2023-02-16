import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-visibility-label',
  templateUrl: './visibility-label.component.html'
})
export class VisibilityLabelComponent {
  @Input()
  visibility = false;

  get title(): string {
    return this.visibility ? 'public' : 'private';
  }

  get style(): string {
    return this.visibility ? 'bg-info text-dark' : 'bg-secondary';
  }
}
