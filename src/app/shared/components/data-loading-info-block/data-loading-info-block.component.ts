import { Component, Input } from "@angular/core";

@Component({
  selector: "app-data-loader",
  templateUrl: "./data-loading-info-block.component.html",
  standalone: false,
})
export class DataLoadingInfoBlockComponent {
  @Input()
  title = "Загрузка данных";
}
