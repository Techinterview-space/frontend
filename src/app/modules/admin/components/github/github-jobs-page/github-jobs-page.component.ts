import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { GitHubAdminService } from "@services/github-admin.service";
import { GitHubProcessingJob } from "@models/github";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";

@Component({
  templateUrl: "./github-jobs-page.component.html",
  standalone: false,
})
export class GitHubJobsPageComponent implements OnInit, OnDestroy {
  jobs: Array<GitHubProcessingJob> | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  constructor(
    private readonly service: GitHubAdminService,
    titleService: TitleService,
  ) {
    titleService.setTitle("GitHub Джобы");
  }

  ngOnInit(): void {
    this.jobs = null;
    this.loadData();
  }

  loadData(): void {
    this.jobs = null;

    this.service
      .getProcessingJobs()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.jobs = x;
      });
  }

  openDeleteDialog(job: GitHubProcessingJob): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить джобу",
        `Вы уверены, что хотите удалить джобу "${job.username}"?`,
        () => {
          this.deleteJob(job);
        },
      ),
    );
  }

  deleteJob(job: GitHubProcessingJob): void {
    this.service
      .deleteProcessingJob(job.username)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData();
      });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // Required for untilDestroyed
  }
}
