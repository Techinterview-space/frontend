import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { SurveyService } from "@services/salaries-survey.service";
import { SalariesSurveyForm } from "./salaries-survey-form";

@Component({
  selector: "app-salaries-survey-block",
  templateUrl: "./salaries-survey-block.component.html",
  styleUrl: "./salaries-survey-block.component.scss",
})
export class SalariesSurveyBlockComponent implements OnInit {

  @Input()
  sourceChart: SalariesChart | null = null;

  showThankYouBlock = false;
  formGroup: SalariesSurveyForm | null = null;

  constructor(
    private readonly surveyService: SurveyService
  ) {}

  ngOnInit(): void {
    this.formGroup = new SalariesSurveyForm();
  }

  reply(): void {
    const data = this.formGroup?.requestOrNull();
    if (data != null) {
      this.surveyService.salariesSatGapeReply(data).subscribe(() => {
        this.showThankYouBlock = true;
      });
    }
  }
}
