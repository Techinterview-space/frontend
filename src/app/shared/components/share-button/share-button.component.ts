import { Component, Input, OnInit } from '@angular/core';
import { AbsoluteLink, ClipboardCopier } from '@shared/value-objects/clipboard-copier';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent implements OnInit {
  private readonly copyBtnDefaultTitle = 'Share';
  private readonly copyBtnDefaultIcon = 'bi bi-share-fill me-1';

  private readonly copiedBtnTitle = 'Copied';
  private readonly copiedBtnIcon = 'bi bi-check2';

  btnTitle = this.copyBtnDefaultTitle;
  btnIcon = this.copyBtnDefaultIcon;

  @Input()
  relativeUrl = '';

  @Input()
  css = 'btn-sm btn-outline-dark';

  constructor() {}

  ngOnInit(): void {}

  share(): void {
    new ClipboardCopier(new AbsoluteLink(this.relativeUrl).asString()).execute();

    this.btnTitle = this.copiedBtnTitle;
    this.btnIcon = this.copiedBtnIcon;

    setTimeout(() => {
      this.btnTitle = this.copyBtnDefaultTitle;
      this.btnIcon = this.copyBtnDefaultIcon;
    }, 700);
  }
}
