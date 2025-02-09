import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { SalariesChart } from "../salaries-chart/salaries-chart";
import { SurveyService } from "@services/salaries-survey.service";
import { SalariesSurveyForm } from "./salaries-survey-form";
import { GoogleAnalyticsService } from "ngx-google-analytics";

@Component({
    selector: "app-salaries-survey-block",
    templateUrl: "./salaries-survey-block.component.html",
    styleUrl: "./salaries-survey-block.component.scss",
    standalone: false
})
export class SalariesSurveyBlockComponent implements OnInit {
  showThankYouBlock = false;
  formGroup: SalariesSurveyForm | null = null;

  constructor(
    private readonly surveyService: SurveyService,
    private readonly gtag: GoogleAnalyticsService
  ) {}

  ngOnInit(): void {
    this.formGroup = new SalariesSurveyForm();
    this.gtag.event("survey_shown", "salaries_survey_block");
  }

  reply(): void {
    const data = this.formGroup?.requestOrNull();
    if (data != null) {
      this.gtag.event("survey_sent", "salaries_survey_block");
      this.surveyService.salariesSatGapeReply(data).subscribe(() => {
        this.showThankYouBlock = true;
      });
    }
  }
}
