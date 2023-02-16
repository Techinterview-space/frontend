import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
// TODO Maxim rename to DeviceService. Add enum
export class CheckDeviceService {
  private readonly toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  isMobile(): boolean {
    return this.toMatch.some(toMatchItem => {
      return navigator.userAgent.match(toMatchItem);
    });
  }
}
