import { OnDestroy } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

function isFunction(value: any): boolean {
  return typeof value === "function";
}

// Was copied from http://www.front-nika.ru/ru/otpiska-v-angular/.
export const untilDestroyed =
  (componentInstance: OnDestroy) =>
  <T>(source: Observable<T>) => {
    const ngDestroyMethod = "ngOnDestroy";
    const takeUntilDestroyedMethod = "__takeUntilDestroy";

    const originalDestroy = componentInstance[ngDestroyMethod];
    if (!isFunction(originalDestroy)) {
      throw new Error(
        `${componentInstance.constructor.name} is using untilDestroyed but doesn't implement 'ngOnDestroy'`,
      );
    }

    // @ts-ignore
    if (!componentInstance[takeUntilDestroyedMethod]) {
      // @ts-ignore
      componentInstance[takeUntilDestroyedMethod] = new Subject();

      componentInstance[ngDestroyMethod] = () => {
        originalDestroy.apply(this);

        // @ts-ignore
        componentInstance[takeUntilDestroyedMethod].next(true);
        // @ts-ignore
        componentInstance[takeUntilDestroyedMethod].complete();
      };
    }

    // @ts-ignore
    return source.pipe(
      // @ts-ignore
      takeUntil<T>(componentInstance[takeUntilDestroyedMethod]),
    );
  };
