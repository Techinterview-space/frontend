import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TitleService } from "@services/title.service";
import { ActivatedRouteExtended } from "@shared/routes/activated-route-extended";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly activatedRoute: ActivatedRouteExtended;

  readonly uwuLinkLight = "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/uwu_light_1000.png";
  readonly uwuLinkDark = "https://techinterview.fra1.cdn.digitaloceanspaces.com/images/uwu_dark_1000.png";

  showUwu = false;

  constructor(
    titleService: TitleService,
    activatedRoute: ActivatedRoute
  ) {
    titleService.resetTitle();
    this.activatedRoute = new ActivatedRouteExtended(activatedRoute);
  }

  getUwuLink(): string {
    const date = new Date(Date.now());
    return date.getSeconds() % 2 === 0
      ? this.uwuLinkLight
      : this.uwuLinkDark;
  }

  ngOnInit(): void {
    this.activatedRoute.getQueryParam("uwu")
      .pipe(untilDestroyed(this))
      .subscribe((uwu) => {
        this.showUwu = uwu === "true";
      });
  }

  ngOnDestroy(): void {
    // Do nothing
  }
}
