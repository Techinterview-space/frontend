import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-interview-markdown-modal-dialog",
  templateUrl: "./interview-markdown-modal-dialog.component.html",
})
export class InterviewMarkdownModalDialogComponent implements OnInit {
  private readonly copyBtnDefaultTitle = "Copy";
  private readonly copyBtnDefaultIcon = "bi bi-clipboard2-check";

  private readonly copiedBtnTitle = "Copied";
  private readonly copiedBtnIcon = "bi bi-check2";

  @Input()
  interview: string | null = null;

  @Input()
  show = false;

  interviewMarkdownContent = "";
  copyBtnTitle = this.copyBtnDefaultTitle;
  copyBtnIcon = this.copyBtnDefaultIcon;

  @Output()
  closed: EventEmitter<void> = new EventEmitter();

  close(): void {
    this.show = false;
    this.closed.next();
  }

  copy(inputElement: any): void {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);

    this.copyBtnTitle = this.copiedBtnTitle;
    this.copyBtnIcon = this.copiedBtnIcon;

    setTimeout(() => {
      this.copyBtnTitle = this.copyBtnDefaultTitle;
      this.copyBtnIcon = this.copyBtnDefaultIcon;
    }, 1000);
  }

  ngOnInit(): void {
    if (this.interview == null) {
      return;
    }

    this.interviewMarkdownContent = this.interview;
  }
}
