import { Component, Input, OnInit } from "@angular/core";
import { DeveloperGrade } from "@models/enums";

@Component({
  selector: "app-grade-label",
  templateUrl: "./grade-label.component.html",
  styleUrls: ["./grade-label.component.scss"],
})
export class GradeLabelComponent implements OnInit {

  private static readonly GRADE_LABELS: { [key in DeveloperGrade]: string } = {
    [DeveloperGrade.Trainee]: "Unknown",
    [DeveloperGrade.Junior]: "Junior",
    [DeveloperGrade.Middle]: "Middle",
    [DeveloperGrade.Senior]: "Senior",
    [DeveloperGrade.Lead]: "Lead",
  }

  @Input()
  grade: DeveloperGrade | string | null = null;

  label: string | null = null;
  cssBackground: string | null = null;
  cssText: string | null = null;

  ngOnInit(): void {
    if (this.grade == null) {
      this.cssBackground = "bg-secondary";
      this.cssText = "text-dark";
      return;
    }


  }
}
