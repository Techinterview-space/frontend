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
  ViewRef,
} from "@angular/core";

export class ViewContainerRefStub extends ViewContainerRef {
  createComponent<C>(
    componentType: Type<C>,
    options?: {
      index?: number | undefined;
      injector?: Injector | undefined;
      ngModuleRef?: NgModuleRef<unknown> | undefined;
      projectableNodes?: Node[][] | undefined;
    },
  ): ComponentRef<C> | any;
  createComponent<C>(
    componentFactory: ComponentFactory<C>,
    index?: number,
    injector?: Injector,
    projectableNodes?: any[][],
    ngModuleRef?: NgModuleRef<any>,
  ): ComponentRef<C> | any;
  createComponent<C>(
    _componentFactory: any,
    _index?: any,
    _injector?: any,
    _projectableNodes?: any,
    _ngModuleRef?: any,
  ): ComponentRef<C> | ComponentRef<C> | any {
    return null;
  }

  element: ElementRef<any> | any;
  injector: Injector | any;
  parentInjector: Injector | any;
  length = 0;

  clear(): void {}

  get(_index: number): ViewRef | any {
    return null;
  }

  createEmbeddedView<C>(
    _templateRef: TemplateRef<C>,
    _context?: C,
  ): EmbeddedViewRef<C> {
    return null as unknown as EmbeddedViewRef<C>;
  }

  insert(_viewRef: ViewRef, _index?: number): ViewRef | any {
    return null;
  }

  move(_viewRef: ViewRef, _currentIndex: number): ViewRef | any {
    return null;
  }

  indexOf(_viewRef: ViewRef): number {
    return -1;
  }

  remove(_index?: number): void {}

  detach(_index?: number): ViewRef | any {
    return null;
  }
}
