import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { WorkIndusrtiesService } from "@services/work-industry.service";
import { LabelEntityAdmiDto } from "@services/label-entity.model";
import { LabelEntityEditForm } from "../label-entity-edit-form";

@Component({
  templateUrl: "./work-indusrties-paginated-table.component.html",
  standalone: false,
})
export class WorkIndustriesPaginatedTableComponent
  implements OnInit, OnDestroy
{
  items: Array<LabelEntityAdmiDto> | null = null;

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  editForm: LabelEntityEditForm | null = null;
  itemToEdit: LabelEntityAdmiDto | null = null;

  constructor(
    private readonly title: TitleService,
    private readonly alert: AlertService,
    private readonly service: WorkIndusrtiesService,
  ) {}

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  ngOnInit(): void {
    this.title.setTitle("Industries");
    this.service
      .all()
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.items = data;
      });
  }

  edit(item: LabelEntityAdmiDto): void {
    this.editForm = new LabelEntityEditForm(item);
    this.itemToEdit = item;
  }

  create(): void {
    this.editForm = new LabelEntityEditForm(null);
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

      this.service
        .update(updateRequest)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success("The industry was updated");
          this.editForm = null;
          this.ngOnInit();
        });

      return;
    }

    const createRequest = this.editForm.createRequestOrNull();
    if (createRequest == null) {
      return;
    }

    this.service
      .create(createRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("The industry was created");
        this.editForm = null;
        this.ngOnInit();
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  delete(item: LabelEntityAdmiDto): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg("Delete the industry", "Are you sure to delete?", () => {
        this.service
          .delete(item.id!)
          .pipe(untilDestroyed(this))
          .subscribe(() => {
            this.alert.success("The industry was removed");
            this.confirmDeletionMessage = null;
            this.ngOnInit();
          });
      }),
    );
  }
}
