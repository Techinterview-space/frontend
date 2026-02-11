import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TitleService } from "@services/title.service";
import { MetaTagService } from "@services/meta-tags.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: false,
})
export class HomeComponent implements OnInit, OnDestroy {
  private readonly activatedRoute: ActivatedRouteExtended;

  readonly uwuLinkLight =
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/uwu_light_1000.png";
  readonly uwuLinkDark =
    "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/uwu_dark_1000.png";

  showUwu = false;
  uwuImageLink: string | null = null;
  loaded = false;

  constructor(
    titleService: TitleService,
    activatedRoute: ActivatedRoute,
    metaTagService: MetaTagService,
  ) {
    titleService.setTitle(
      "Techinterview.space — зарплаты в IT и отзывы о компаниях",
    );
    metaTagService.returnDefaultMetaTags();
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activatedRoute
      .getQueryParam("uwu")
      .pipe(untilDestroyed(this))
      .subscribe((uwu) => {
        this.loaded = true;
        this.showUwu = uwu === "true";

        if (this.showUwu) {
          this.uwuImageLink = this.getUwuLink();
        }
      });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // Required for untilDestroyed
  }

  private getUwuLink(): string {
    const date = new Date(Date.now());
    return date.getSeconds() % 2 === 0 ? this.uwuLinkLight : this.uwuLinkDark;
  }
}
