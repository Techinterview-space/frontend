import { Component, OnDestroy, OnInit } from '@angular/core';
import { Label } from '@models/user-label.model';
import { TitleService } from '@services/title.service';
import { UserLabelsService } from '@services/user-labels.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { UserLabelEditForm } from './user-label-edit-form';

@Component({
  templateUrl: './my-user-labels.component.html'
})
export class MyUserLabelsComponent implements OnInit, OnDestroy {
  labels: Array<Label> | null = null;

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  editForm: UserLabelEditForm | null = null;

  constructor(
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly service: UserLabelsService
  ) {}

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  ngOnInit(): void {
    this.title.setTitle('My labels');
    this.service
      .my()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.labels = x;
      });
  }

  edit(item: Label): void {
    this.editForm = new UserLabelEditForm(item);
  }

  onFormSubmit(): void {
    const request = this.editForm!.requestOrNull();
    if (request == null) {
      return;
    }

    this.labels = null;
    this.service
      .update(request)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success('The label was updated');
        this.editForm = null;
        this.ngOnInit();
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  delete(item: Label): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the label',
        'Are you sure to delete? Interviews, templates, etc, with the label will stay in the system',
        () => {
          this.service
            .delete(item.id!)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('The label was removed');
              this.confirmDeletionMessage = null;
              this.ngOnInit();
            });
        }
      )
    );
  }
}
