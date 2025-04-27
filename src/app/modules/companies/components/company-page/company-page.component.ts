import { Component, OnDestroy, OnInit } from "@angular/core";
import { Interview } from "@models/interview-models";
import { CompaniesService } from "@services/companies.service";
import { InterviewsService } from "@services/interviews.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  templateUrl: "./company-page.component.html",
  styleUrls: ["./company-page.component.scss"],
  standalone: false,
})
export class CompanyPageComponent implements OnInit, OnDestroy {
  interviews: Array<Interview> | null = null;

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
  ) {}

  ngOnInit(): void {
    this.title.setTitle("");
    this.service
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((i) => (this.interviews = i));
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }
}
