import { NgxSpinnerService } from 'ngx-spinner';
import { Injectable } from '@angular/core';

@Injectable()
export class SpinnerService {
  private readonly visibleTimerSpinnerName = 'timer';
  private readonly invisibleSpinnerName = 'transparent';

  constructor(private readonly loaderService: NgxSpinnerService) {}

  showTimer(): void {
    this.loaderService.show(this.visibleTimerSpinnerName);
  }

  hideTimer(): void {
    this.loaderService.hide(this.visibleTimerSpinnerName);
  }

  showTransparent(): void {
    this.loaderService.show(this.invisibleSpinnerName);
  }

  hideTransparent(): void {
    this.loaderService.hide(this.invisibleSpinnerName);
  }
}
