import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Label } from "@models/user-label.model";
import { RandomHexColor } from "@shared/value-objects/random-hex-color";

@Component({
    selector: "app-labels-ng-select",
    templateUrl: "./labels-ng-select.component.html",
    styleUrls: ["./labels-ng-select.component.scss"],
    standalone: false
})
export class LabelsNgSelectComponent implements OnInit {
  @Input()
  selectedLabels: Array<Label> = [];

  @Output()
  selectedLabelsChange = new EventEmitter<Array<Label>>();

  @Input()
  labels: Array<Label> = [];

  @Input()
  placeholder = "Select tags";

  ngOnInit(): void {}

  onSelectChange(data: any): void {
    this.selectedLabelsChange.emit(this.selectedLabels);
  }

  onNewLabelAddedFn(title: string): Label | null {
    return {
      title: title,
      hexColor: new RandomHexColor().toString(),
      organizationId: null,
    } as Label;
  }

  clearSelectedLabel(item: Label): void {
    this.selectedLabels = [
      ...this.selectedLabels.filter((x) => x.title !== item.title),
    ];
    this.selectedLabelsChange.emit(this.selectedLabels);
  }
}
