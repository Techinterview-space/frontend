import { Component, OnDestroy, OnInit } from '@angular/core';
import { Label } from '@models/user-label.model';
import { TitleService } from '@services/title.service';
import { AlertService } from '@shared/components/alert/services/alert.service';
import { ConfirmMsg } from '@shared/components/dialogs/models/confirm-msg';
import { DialogMessage } from '@shared/components/dialogs/models/dialog-message';
import { untilDestroyed } from '@shared/subscriptions/until-destroyed';
import { SkillEditForm } from './skill-edit-form';
import { SkillAdmiDto, SkillsService } from '@services/skills.service';

@Component({
  templateUrl: './skills-paginated-table.component.html'
})
export class SkillsPaginatedTableComponent implements OnInit, OnDestroy {
  skills: Array<SkillAdmiDto> | null = null;

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  editForm: SkillEditForm | null = null;
  itemToEdit: SkillAdmiDto | null = null;

  constructor(
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly skillService: SkillsService
  ) {}

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  ngOnInit(): void {
    this.title.setTitle('Skills');
    this.skillService
      .all()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.skills = data;
      });
  }

  edit(item: SkillAdmiDto): void {
    this.editForm = new SkillEditForm(item);
    this.itemToEdit = item;
  }

  create(): void {
    this.editForm = new SkillEditForm(null);
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
          this.alert.success('The skill was updated');
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
          this.alert.success('The skill was created');
          this.editForm = null;
          this.ngOnInit();
        });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  delete(item: SkillAdmiDto): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        'Delete the skill',
        'Are you sure to delete?',
        () => {
          this.skillService
            .delete(item.id!)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success('The skill was removed');
              this.confirmDeletionMessage = null;
              this.ngOnInit();
            });
        }
      )
    );
  }
}
