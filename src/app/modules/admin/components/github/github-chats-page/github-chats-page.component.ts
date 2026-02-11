import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { GitHubAdminService } from "@services/github-admin.service";
import { GitHubChat } from "@models/github";

@Component({
  templateUrl: "./github-chats-page.component.html",
  standalone: false,
})
export class GitHubChatsPageComponent implements OnInit, OnDestroy {
  chats: Array<GitHubChat> | null = null;
  source: PaginatedList<GitHubChat> | null = null;
  currentPage: number = 1;
  searchQuery: string = "";

  constructor(
    private readonly service: GitHubAdminService,
    titleService: TitleService,
  ) {
    titleService.setTitle("GitHub Telegram Bot Chats");
  }

  ngOnInit(): void {
    this.chats = null;
    this.source = null;
    this.loadData(this.currentPage);
  }

  loadData(pageToRequest: number): void {
    this.chats = null;
    this.source = null;
    this.currentPage = pageToRequest;

    this.service
      .getChats({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
        search: this.searchQuery || null,
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.chats = x.results;
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

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // Required for untilDestroyed
  }
}
