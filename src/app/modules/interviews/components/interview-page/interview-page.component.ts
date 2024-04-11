import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Interview } from '@models/interview-models';
import { InterviewsService } from '@services/interviews.service';
import { TitleService } from '@services/title.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { ActivatedRouteExtended } from '@shared/routes/activated-route-extended';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { FileDownloadAnchor } from '@shared/value-objects/file-download-anchor';

@Component({
  selector: 'app-interview-page',
  templateUrl: './interview-page.component.html',
  styleUrls: ['./interview-page.component.scss']
})
export class InterviewPageComponent implements OnInit, OnDestroy {
  pageTitle = '';
  interview: Interview | null = null;

  showMarkdownContentModal = false;
  interviewMarkdownContent: string | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  downloadedFile: File | null = null;

  private readonly activateRoute: ActivatedRouteExtended;

  constructor(
    private readonly service: InterviewsService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly router: Router,
    activatedRoute: ActivatedRoute
  ) {
    this.activateRoute = new ActivatedRouteExtended(activatedRoute);
  }

  ngOnInit(): void {
    this.activateRoute
      .getParam('id')
      .pipe(untilDestroyed(this))
      .subscribe((id) => {
        this.service
          .byId(id!)
          .pipe(untilDestroyed(this))
          .subscribe((i) => {
            this.interview = i;
            this.setTitle();
          });
      });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
    this.downloadedFile = null;
    this.interviewMarkdownContent = null;
  }

  delete(): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg('Удалить заметку?', 'Вы уверены, что хотите удалить ее? Это действие нельзя отменить', () => {
        this.service.delete(this.interview!.id).subscribe(() => {
          this.alert.info(`Заметка для кандидата ${this.interview!.candidateName} была удалена`, true);
          this.router.navigate(['/interviews/my']);
        });
      })
    );
  }

  markdownFromServer(): void {
    if (this.interviewMarkdownContent != null) {
      this.showMarkdownContentModal = true;
      return;
    }

    this.service
      .markdown(this.interview!.id)
      .pipe(untilDestroyed(this))
      .subscribe((m) => {
        this.interviewMarkdownContent = m.markdown;
        this.showMarkdownContentModal = true;
      });
  }

  exportAsPDF(): void {
    if (this.downloadedFile != null) {
      new FileDownloadAnchor(this.downloadedFile).execute(`${this.interview!.candidateName}_${this.interview!.id}.pdf`);
      return;
    }

    this.service
      .pdf(this.interview!.id)
      .pipe(untilDestroyed(this))
      .subscribe((file) => {
        this.downloadedFile = file;
        new FileDownloadAnchor(this.downloadedFile).execute(`${this.interview!.candidateName}_${this.interview!.id}.pdf`);
      });
  }

  private setTitle(): void {
    this.pageTitle = `Interview with ${this.interview!.candidateName}`;
    this.title.setTitle(this.pageTitle);
  }
}
