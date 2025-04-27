import { Component, OnDestroy, OnInit } from "@angular/core";
import { Interview } from "@models/interview-models";
import { CompaniesService } from "@services/companies.service";
import { InterviewsService } from "@services/interviews.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./companies-page.component.html",
  styleUrls: ["./companies-page.component.scss"],
  standalone: false,
})
export class CompaniesPageComponent implements OnInit, OnDestroy {
  interviews: Array<Interview> | null = null;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
  ) {
    this.title.setTitle("Компании");
  }

  ngOnInit(): void {
    this.service
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((i) => (this.interviews = i));
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
