import {
  ComponentFactory,
  ComponentRef,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  NgModuleRef,
  TemplateRef,
  Type,
  ViewContainerRef,
  ViewRef
} from '@angular/core';

export class ViewContainerRefStub extends ViewContainerRef {
  createComponent<C>(
    componentType: Type<C>,
    options?: {
      index?: number | undefined;
      injector?: Injector | undefined;
      ngModuleRef?: NgModuleRef<unknown> | undefined;
      projectableNodes?: Node[][] | undefined;
    }
  ): ComponentRef<C> | any;
  createComponent<C>(
    componentFactory: ComponentFactory<C>,
    index?: number,
    injector?: Injector,
    projectableNodes?: any[][],
    ngModuleRef?: NgModuleRef<any>
  ): ComponentRef<C> | any;
  createComponent<C>(
    componentFactory: any,
    index?: any,
    injector?: any,
    projectableNodes?: any,
    ngModuleRef?: any
  ): ComponentRef<C> | ComponentRef<C> | any {
    return null;
  }

  element: ElementRef<any> | any;
  injector: Injector | any;
  parentInjector: Injector | any;
  length = 0;

  clear(): void {}

  get(index: number): ViewRef | any {
    return null;
  }

  createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C): EmbeddedViewRef<C> {
    return null as unknown as EmbeddedViewRef<C>;
  }

  insert(viewRef: ViewRef, index?: number): ViewRef | any {
    return null;
  }

  move(viewRef: ViewRef, currentIndex: number): ViewRef | any {
    return null;
  }

  indexOf(viewRef: ViewRef): number {
    return -1;
  }

  remove(index?: number): void {}

  detach(index?: number): ViewRef | any {
    return null;
  }
}
