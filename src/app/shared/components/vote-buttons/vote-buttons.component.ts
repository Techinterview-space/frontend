import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-vote-buttons",
  templateUrl: "./vote-buttons.component.html",
  styleUrls: ["./vote-buttons.component.scss"],
  standalone: false,
})
export class VoteButtonsComponent {
  hover: "up" | "down" | null = null;
  disabled: boolean = false;

  @Output()
  voteUp: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  voteDown: EventEmitter<void> = new EventEmitter<void>();

  onHover(icon: "up" | "down") {
    if (this.disabled) {
      return;
    }

    this.hover = icon;
  }

  onLeave() {
    if (this.disabled) {
      return;
    }

    this.hover = null;
  }

  voteUpClicked() {
    if (this.disabled) {
      return;
    }

    this.voteUp.emit();
    this.hover = "up";
    this.disabled = true;
  }

  voteDownClicked() {
    if (this.disabled) {
      return;
    }

    this.voteDown.emit();
    this.hover = "down";
    this.disabled = true;
  }
}
