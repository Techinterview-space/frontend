import { ElementRef, EmbeddedViewRef, TemplateRef } from "@angular/core";

export class TemplateRefStub extends TemplateRef<any> {
  override elementRef: ElementRef<any> | any = null;

  override createEmbeddedView(context: any): EmbeddedViewRef<any> | any {
    return null;
  }
}
