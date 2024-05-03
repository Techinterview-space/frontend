import { Component, Input, OnInit } from "@angular/core";
import { DeveloperGrade } from "@models/enums";
import { SplittedByWhitespacesString } from "../../value-objects/splitted-by-whitespaces-string";

@Component({
  selector: "app-developer-grade-label",
  styleUrls: ["./developer-grade-label.component.scss"],
  templateUrl: "./developer-grade-label.component.html",
})
export class DeveloperGradeLabelComponent implements OnInit {
  title = "";
  style = "";

  @Input()
  grade: DeveloperGrade | null = null;

  ngOnInit(): void {
    switch (this.grade) {
      case DeveloperGrade.Trainee:
        this.style = "light text-dark";
        break;

      case DeveloperGrade.Junior:
      case DeveloperGrade.JuniorStrong:
        this.style = "success";
        break;

      case DeveloperGrade.MiddleMinus:
      case DeveloperGrade.Middle:
      case DeveloperGrade.MiddleStrong:
        this.style = "warning text-dark";
        break;

      case DeveloperGrade.SeniorMinus:
      case DeveloperGrade.Senior:
      case DeveloperGrade.SeniorStrong:
        this.style = "info text-dark";
        break;

      case DeveloperGrade.LeadMinus:
      case DeveloperGrade.Lead:
      case DeveloperGrade.LeadStrong:
        this.style = "primary";
        break;

      default:
        this.style = "light text-dark";
        break;
    }

    if (this.grade) {
      this.title = new SplittedByWhitespacesString(
        DeveloperGrade[this.grade]
      ).value;
    } else {
      this.title = "Не указан";
    }
  }
}
