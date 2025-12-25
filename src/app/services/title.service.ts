import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";
import Assertion from "@shared/validation/assertion";

@Injectable({
  providedIn: "root",
})
export class TitleService {
  constructor(private readonly titleService: Title) {}

  setTitle(title: string): void {
    Assertion.stringNotNullOrEmpty(title, "title");

    title = title.replace(" - Techinterview.space", "");
    this.titleService.setTitle(title + " - Techinterview.space");
  }

  public resetTitle(): void {
    this.titleService.setTitle("Techinterview.space");
  }
}
