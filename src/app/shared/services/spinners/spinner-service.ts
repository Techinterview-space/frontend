import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class SpinnerService {
  private readonly visibleTimerSpinnerName = "timer";
  private readonly invisibleSpinnerName = "transparent";
  private readonly spinnerStates = new Map<string, BehaviorSubject<boolean>>();

  constructor() {
    this.spinnerStates.set(
      this.visibleTimerSpinnerName,
      new BehaviorSubject<boolean>(false),
    );
    this.spinnerStates.set(
      this.invisibleSpinnerName,
      new BehaviorSubject<boolean>(false),
    );
  }

  showTimer(): void {
    this.show(this.visibleTimerSpinnerName);
  }

  hideTimer(): void {
    this.hide(this.visibleTimerSpinnerName);
  }

  showTransparent(): void {
    this.show(this.invisibleSpinnerName);
  }

  hideTransparent(): void {
    this.hide(this.invisibleSpinnerName);
  }

  isVisible(name: string): boolean {
    const state = this.spinnerStates.get(name);
    return state ? state.value : false;
  }

  getVisibility$(name: string): Observable<boolean> {
    if (!this.spinnerStates.has(name)) {
      this.spinnerStates.set(name, new BehaviorSubject<boolean>(false));
    }
    return this.spinnerStates.get(name)!.asObservable();
  }

  private show(name: string): void {
    if (!this.spinnerStates.has(name)) {
      this.spinnerStates.set(name, new BehaviorSubject<boolean>(false));
    }
    this.spinnerStates.get(name)?.next(true);
  }

  private hide(name: string): void {
    this.spinnerStates.get(name)?.next(false);
  }
}
