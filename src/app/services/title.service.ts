import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import Assertion from '@shared/validation/assertion';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  constructor(private readonly titleService: Title) {}

  setTitle(title: string): void {
    Assertion.stringNotNullOrEmpty(title, 'title');

    this.titleService.setTitle(title + ' - Tech.Interview');
  }

  public resetTitle(): void {
    this.titleService.setTitle('Tech.Interview');
  }
}
