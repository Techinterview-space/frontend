import { Component, OnDestroy } from "@angular/core";
import { MetaTagService } from "@services/meta-tags.service";

@Component({
  templateUrl: "./privacy-policy-page.component.html",
  standalone: false,
})
export class PrivacyPolicyPageComponent implements OnDestroy {
  constructor(private readonly metaTagService: MetaTagService) {
    this.metaTagService.setPageMetaTags(
      "Пользовательское соглашение",
      "Пользовательское соглашение для пользователей сайта Techinterview.space.",
      "/agreements/privacy-policy");
  }

  ngOnDestroy(): void {
    this.metaTagService.returnDefaultMetaTags();
  }
}
