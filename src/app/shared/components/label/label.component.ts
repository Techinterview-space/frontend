import { Component, Input } from "@angular/core";
import { Label } from "@models/user-label.model";

@Component({
  selector: "app-label",
  templateUrl: "./label.component.html",
  styleUrls: ["./label.component.scss"],
  standalone: false,
})
export class LabelComponent {
  @Input()
  label: Label | null = null;
}
