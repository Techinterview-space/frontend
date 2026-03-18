import { Component } from "@angular/core";

@Component({
  selector: "app-wednesday-frog",
  templateUrl: "./wednesday-frog.component.html",
  styleUrls: ["./wednesday-frog.component.scss"],
  standalone: false,
})
export class WednesdayFrogComponent {
  readonly frogs = [
    "/img/images/wednesday-frogs/wednesday_frog_gentelmen.jpeg",
    "/img/images/wednesday-frogs/wednesday_todo.jpg",
    "/img/images/wednesday-frogs/wednesday_2.jpg",
    "/img/images/wednesday-frogs/wednesday_3.jpg",
    "/img/images/wednesday-frogs/wednesday_4.jpg",
    "/img/images/wednesday-frogs/wednesday_5.jpg",
  ];

  readonly littleFrogLink =
    "/img/images/frog_600.png";
  readonly bigFrogLink =
    "/img/images/frog.png";

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
