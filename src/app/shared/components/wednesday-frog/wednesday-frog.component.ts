import { Component } from "@angular/core";

@Component({
  selector: "app-wednesday-frog",
  templateUrl: "./wednesday-frog.component.html",
  styleUrls: ["./wednesday-frog.component.scss"],
})
export class WednesdayFrogComponent {
  readonly littleFrogLink =
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/frog_600.png";
  readonly bigFrogLink =
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/frog.png";

  readonly showFrog;

  showModal = false;

  constructor() {
    const today = new Date();
    this.showFrog = today.getDay() === 3;
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
