import { NavigationExtras, Event, UrlTree } from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class RouterStub {
  readonly events: Observable<Event> = new Observable();
  navigate(_commands: any[], _extras?: NavigationExtras): void {}
  navigateByUrl(
    _url: string | UrlTree,
    _extras?: NavigationExtras,
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
  createUrlTree(_commands: any[], _navigationExtras?: NavigationExtras): void {}
  serializeUrl(_url: UrlTree): string {
    return "";
  }
}
