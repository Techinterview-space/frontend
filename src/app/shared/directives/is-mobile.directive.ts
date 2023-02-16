import { Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { CheckDeviceService } from '@shared/services/check-device/check-device.service';

@Directive({
  selector: '[appIsMobile]'
})
export class IsMobileDirective implements OnInit {
  constructor(
    private readonly viewContainerRef: ViewContainerRef,
    private readonly templateRef: TemplateRef<any>,
    private readonly checkDevice: CheckDeviceService
  ) {}

  ngOnInit(): void {
    const isMobile = this.checkDevice.isMobile();

    if (isMobile) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }
}
