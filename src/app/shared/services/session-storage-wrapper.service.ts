import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageWrapper {
  getItem<T>(key: string): T {
    const content = localStorage.getItem(key);
    return content != null ? JSON.parse(content) : null;
  }

  setItem<T>(key: string, value: T): boolean {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  }

  removeItem(key: string): boolean {
    localStorage.removeItem(key);
    return true;
  }

  clear(): void {
    localStorage.clear();
  }
}
