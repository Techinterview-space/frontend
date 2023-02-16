import { ElementRef, EmbeddedViewRef, TemplateRef } from '@angular/core';

export class TemplateRefStub extends TemplateRef<any> {
  elementRef: ElementRef<any> | any = null;

  createEmbeddedView(context: any): EmbeddedViewRef<any> | any {
    return null;
  }
}
