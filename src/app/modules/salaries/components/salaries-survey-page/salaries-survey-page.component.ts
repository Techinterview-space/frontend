import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { GetUserSalariesSurveyDataResponse, SurveyService } from "@services/salaries-survey.service";
import { TitleService } from "@services/title.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { CookieService } from "ngx-cookie-service";
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
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly cookieService: CookieService,
    private readonly titleService: TitleService
  ) {
    titleService.setTitle("Опрос о пользе зарплатной статистики");
  }
 
  ngOnInit(): void {
     if (this.authService.isAuthenticated()) {
       this.service.getUserSalariesSurveyDataResponse()
        .pipe(untilDestroyed(this))
        .subscribe((data) => {
          this.userData = data;
        });

       return;
    }

    this.cookieService.set("url", this.router.url);
    this.authService.login();
  }

  closeSurveyBlock(): void {}

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }
}
