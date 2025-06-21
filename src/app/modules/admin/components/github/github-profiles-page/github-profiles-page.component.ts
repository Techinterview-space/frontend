import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { GitHubAdminService } from "@services/github-admin.service";
import { GitHubProfile } from "@models/github";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";

@Component({
  templateUrl: "./github-profiles-page.component.html",
  standalone: false,
})
export class GitHubProfilesPageComponent implements OnInit, OnDestroy {
  profiles: Array<GitHubProfile> | null = null;
  source: PaginatedList<GitHubProfile> | null = null;
  currentPage: number = 1;
  searchQuery: string = "";

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  constructor(
    private readonly service: GitHubAdminService,
    titleService: TitleService,
  ) {
    titleService.setTitle("GitHub профили");
  }

  ngOnInit(): void {
    this.profiles = null;
    this.source = null;
    this.loadData(this.currentPage);
  }

  loadData(pageToRequest: number): void {
    this.profiles = null;
    this.source = null;
    this.currentPage = pageToRequest;

    this.service
      .getProfiles({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
        search: this.searchQuery || null,
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.profiles = x.results;
        this.source = x;
      });
  }

  onSearch(): void {
    this.loadData(1);
  }

  clearSearch(): void {
    this.searchQuery = "";
    this.loadData(1);
  }

  ngOnDestroy(): void {
    // ignored
  }

  deleteProfile(profile: GitHubProfile): void {
    this.service
      .deleteProfile(profile.username)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(this.currentPage);
      });
  }

  openDeleteDialog(profile: GitHubProfile): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить кэш профиля",
        `Вы уверены, что хотите удалить кэш профиля "${profile.username}"?`,
        () => {
          this.deleteProfile(profile);
        },
      ),
    );
  }
}
