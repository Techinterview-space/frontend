import { isPlatformBrowser } from "@angular/common";
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Vacancy, VacancyStatus, VacancyStatusEnum } from "@models/vacancy.model";
import { MetaTagService } from "@services/meta-tags.service";
import { TitleService } from "@services/title.service";
import { VacanciesService } from "@services/vacancies.service";
import { AuthService } from "@shared/services/auth/auth.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { VacancyResolverData } from "../../resolvers/vacancy.resolver";

@Component({
  templateUrl: "./vacancy-page.component.html",
  styleUrls: ["./vacancy-page.component.scss"],
  standalone: false,
})
export class VacancyPageComponent implements OnInit, OnDestroy {
  readonly statusEnum = VacancyStatusEnum;
  readonly VacancyStatus = VacancyStatus;

  vacancy: Vacancy | null = null;
  notFound = false;
  canEdit = false;

  private readonly isBrowser: boolean;

  constructor(
    private readonly title: TitleService,
    private readonly metaTagService: MetaTagService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly service: VacanciesService,
    @Inject(PLATFORM_ID) platformId: Object,
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.route.data
      .pipe(untilDestroyed(this))
      .subscribe((data: { vacancyData?: VacancyResolverData }) => {
        const resolved = data.vacancyData?.vacancy;
        if (resolved) {
          this.initialize(resolved);
        } else if (this.isBrowser) {
          // SSR returned nothing (non-public vacancy or anonymous request) —
          // re-fetch client-side with the user's auth for owner/admin viewing.
          this.refetchWithAuth();
        } else {
          this.notFound = true;
        }
      });
  }

  private refetchWithAuth(): void {
    const id = this.route.snapshot.paramMap.get("id");
    if (!id) {
      this.notFound = true;
      return;
    }

    this.service
      .byId(id)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (vacancy) => this.initialize(vacancy),
        error: () => (this.notFound = true),
      });
  }

  private initialize(vacancy: Vacancy): void {
    this.vacancy = vacancy;
    this.notFound = false;

    this.title.setTitle(vacancy.title);
    this.metaTagService.setPageMetaTags(
      vacancy.title,
      vacancy.companyName
        ? `Вакансия в компании ${vacancy.companyName}`
        : "Вакансия в IT компании",
      `/vacancies/${vacancy.id}`,
      "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/company_reviews_1000.png",
    );

    this.authService
      .getCurrentUser()
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        this.canEdit =
          user != null &&
          user.id === vacancy.authorId &&
          vacancy.deletedAt == null;
      });
  }

  edit(): void {
    if (this.vacancy != null) {
      this.router.navigate(["/vacancies", this.vacancy.id, "edit"]);
    }
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
    this.metaTagService.returnDefaultMetaTags();
  }
}
