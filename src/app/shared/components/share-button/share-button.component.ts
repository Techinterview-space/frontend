import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  AbsoluteLink,
  ClipboardCopier,
} from "@shared/value-objects/clipboard-copier";

@Component({
    selector: "app-share-button",
    templateUrl: "./share-button.component.html",
    styleUrls: ["./share-button.component.scss"],
    standalone: false
})
export class ShareButtonComponent implements OnInit {
  static readonly copyBtnDefaultTitle = "Поделиться";
  private readonly copyBtnDefaultIcon = "bi bi-share-fill me-1";

  private readonly copiedBtnTitle = "Скопировано";
  private readonly copiedBtnIcon = "bi bi-check2";

  btnTitle = "";
  btnIcon = this.copyBtnDefaultIcon;

  @Input()
  title: string = ShareButtonComponent.copyBtnDefaultTitle;

  @Input()
  relativeUrl = "";

  @Input()
  css = "btn-outline-dark";

  @Input()
  cssBtnSize = "btn-sm";

  @Output()
  shareClicked = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    this.btnTitle = this.title;
  }

  share(): void {
    if (this.relativeUrl != null && this.relativeUrl !== "") {
      new ClipboardCopier(
        new AbsoluteLink(this.relativeUrl).asString()
      ).execute();
    }

    this.btnTitle = this.copiedBtnTitle;
    this.btnIcon = this.copiedBtnIcon;

    this.shareClicked.emit();

    setTimeout(() => {
      this.btnTitle = this.title;
      this.btnIcon = this.copyBtnDefaultIcon;
    }, 700);
  }
}
