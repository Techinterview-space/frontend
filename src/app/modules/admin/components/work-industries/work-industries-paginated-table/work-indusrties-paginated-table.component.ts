import { Component, OnDestroy, OnInit } from '@angular/core';
import { TitleService } from '@services/title.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { WorkIndusrtiesService, WorkIndustryAdmiDto } from '@services/work-industry.service';
import { WorkIndustryEditForm } from './work-industry-edit-form';

@Component({
  templateUrl: './work-indusrties-paginated-table.component.html'
})
export class WorkIndustriesPaginatedTableComponent implements OnInit, OnDestroy {
  items: Array<WorkIndustryAdmiDto> | null = null;

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  editForm: WorkIndustryEditForm | null = null;
  itemToEdit: WorkIndustryAdmiDto | null = null;

  constructor(
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly skillService: WorkIndusrtiesService
  ) {}

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  ngOnInit(): void {
    this.title.setTitle('Industries');
    this.skillService
      .all()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.items = data;
      });
  }

  edit(item: WorkIndustryAdmiDto): void {
    this.editForm = new WorkIndustryEditForm(item);
    this.itemToEdit = item;
  }

  create(): void {
    this.editForm = new WorkIndustryEditForm(null);
    this.itemToEdit = null;
  }

  onEditFormSubmit(): void {

    if (this.editForm == null) {
      return;
    }

    if (this.itemToEdit != null) {
      const updateRequest = this.editForm.updateRequestOrNull();
      if (updateRequest == null) {
        return;
      }
  
      this.skillService
        .update(updateRequest)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success('The industry was updated');
          this.editForm = null;
          this.ngOnInit();
        });

        return;
    }

    const createRequest = this.editForm.createRequestOrNull();
      if (createRequest == null) {
        return;
      }
  
      this.skillService
        .create(createRequest)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success('The industry was created');
          this.editForm = null;
          this.ngOnInit();
        });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  delete(item: WorkIndustryAdmiDto): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the industry',
        'Are you sure to delete?',
        () => {
          this.skillService
            .delete(item.id!)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('The industry was removed');
              this.confirmDeletionMessage = null;
              this.ngOnInit();
            });
        }
      )
    );
  }
}
