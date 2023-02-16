import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back-button',
  templateUrl: './go-back-button.component.html',
  styleUrls: ['./go-back-button.component.scss']
})
export class GoBackButtonComponent {
  constructor(private readonly location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
