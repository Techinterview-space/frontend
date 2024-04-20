import { Component } from "@angular/core";
import { TitleService } from "@services/title.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent {
  constructor(titleService: TitleService) {
    titleService.resetTitle();
  }
}
