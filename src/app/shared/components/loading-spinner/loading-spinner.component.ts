import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-loading-spinner",
  templateUrl: "./loading-spinner.component.html",
  styleUrls: ["./loading-spinner.component.scss"],
  standalone: false,
})
export class LoadingSpinnerComponent implements OnInit {
  @Input()
  style = "spinner-border-lg";

  static LoadingCatUrl = "https://techinterview.fra1.cdn.digitaloceanspaces.com/gif/loading_cat.gif";
  static LoadingDogUrl = "https://techinterview.fra1.cdn.digitaloceanspaces.com/gif/loading_dog.gif";

  loadingUrl = '';
  showPreloader = false;

  ngOnInit(): void {
    const now = new Date();
    const isOdd = now.getHours() % 2 === 1;

    this.loadingUrl = isOdd
      ? LoadingSpinnerComponent.LoadingCatUrl
      : LoadingSpinnerComponent.LoadingDogUrl;
  }
}
