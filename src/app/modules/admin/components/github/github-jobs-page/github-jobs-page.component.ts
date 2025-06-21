import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { GitHubAdminService } from "@services/github-admin.service";
import { GitHubProcessingJob, GitHubJobStatus } from "@models/github";
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
    titleService.setTitle("GitHub Processing Jobs");
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
        "Delete Processing Job",
        `Are you sure you want to delete job "${job.jobType}" (ID: ${job.id})?`,
        () => {
          this.deleteJob(job);
        },
      ),
    );
  }

  deleteJob(job: GitHubProcessingJob): void {
    this.service
      .deleteProcessingJob(job.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.loadData(); // Reload data after deletion
      });
  }

  getStatusLabel(status: GitHubJobStatus): string {
    switch (status) {
      case GitHubJobStatus.Pending:
        return "Pending";
      case GitHubJobStatus.Processing:
        return "Processing";
      case GitHubJobStatus.Completed:
        return "Completed";
      case GitHubJobStatus.Failed:
        return "Failed";
      default:
        return "Unknown";
    }
  }

  getStatusClass(status: GitHubJobStatus): string {
    switch (status) {
      case GitHubJobStatus.Pending:
        return "badge bg-warning";
      case GitHubJobStatus.Processing:
        return "badge bg-info";
      case GitHubJobStatus.Completed:
        return "badge bg-success";
      case GitHubJobStatus.Failed:
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  }

  ngOnDestroy(): void {
    // ignored
  }
}