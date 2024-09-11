import { Component } from "@angular/core";

@Component({
  selector: "app-wednesday-frog",
  templateUrl: "./wednesday-frog.component.html",
  styleUrls: ["./wednesday-frog.component.scss"],
})
export class WednesdayFrogComponent {
  readonly frogs = [
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/wednesday-frogs/wednesday_frog_gentelmen.jpeg",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/wednesday-frogs/wednesday_todo.jpg",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/wednesday-frogs/wednesday_2.jpg",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/wednesday-frogs/wednesday_3.jpg",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/wednesday-frogs/wednesday_4.jpg",
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/wednesday-frogs/wednesday_5.jpg",
  ];

  readonly littleFrogLink =
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/frog_600.png";
  readonly bigFrogLink =
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/frog.png";

  readonly showFrog;
  frogToBeShown: string | null = null;

  showModal = false;

  constructor() {
    const WEDNESDAY = 3;
    const today = new Date();
    this.showFrog = today.getDay() === WEDNESDAY;
  }

  openModal() {
    this.frogToBeShown =
      this.frogs[Math.floor(Math.random() * this.frogs.length)];
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
