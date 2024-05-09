import { Component, OnDestroy, OnInit } from "@angular/core";
import { GetUserSalariesSurveyDataResponse, SurveyService } from "@services/salaries-survey.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  selector: "salaries-survey-page",
  templateUrl: "./salaries-survey-page.component.html",
  styleUrls: ["./salaries-survey-page.component.scss"],
})
export class SalariesSurveyPageComponent implements OnInit, OnDestroy {

  userData: GetUserSalariesSurveyDataResponse | null = null;

  constructor(
    private readonly service: SurveyService,
    private readonly titleService: TitleService
  ) {
    titleService.setTitle("Опрос о пользе зарплатной статистики");
  }
 
  ngOnInit(): void {
    this.service.getUserSalariesSurveyDataResponse()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.userData = data;
      });
  }

  closeSurveyBlock(): void {}

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
