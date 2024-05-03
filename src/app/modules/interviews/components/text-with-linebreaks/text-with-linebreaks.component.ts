import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-text-with-linebreaks",
  templateUrl: "./text-with-linebreaks.component.html",
  styleUrls: ["./text-with-linebreaks.component.scss"],
})
export class TextWithLinebreaksComponent implements OnInit {
  @Input()
  source: string | null = null;

  hasText = false;

  ngOnInit(): void {
    this.hasText = this.source != null && this.source.length > 0;
  }
}
