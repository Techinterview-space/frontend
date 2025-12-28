import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import {
  SalariesHistoricalDataRecordTemplateDto,
  SalariesHistoricalDataTemplatesService,
} from "@services/salaries-historical-data-templates.service";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { HistoricalDataTemplateEditForm } from "./historical-data-template-edit-form";
import { ProfessionsService } from "@services/professions.service";
import { LabelEntityDto } from "@services/label-entity.model";
import { SelectItem } from "@shared/select-boxes/select-item";

@Component({
  templateUrl: "./historical-data-templates.component.html",
  styleUrls: ["./historical-data-templates.component.scss"],
  standalone: false,
})
export class HistoricalDataTemplatesComponent implements OnInit, OnDestroy {
  items: Array<SalariesHistoricalDataRecordTemplateDto> | null = null;
  source: PaginatedList<SalariesHistoricalDataRecordTemplateDto> | null = null;
  currentPage: number = 1;

  editForm: HistoricalDataTemplateEditForm | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  professions: Array<LabelEntityDto> = [];
  professionsAsOptions: Array<SelectItem<number>> = [];

  selectedProfessionsForModal: Array<LabelEntityDto> | null = null;

  constructor(
    private readonly service: SalariesHistoricalDataTemplatesService,
    private readonly professionsService: ProfessionsService,
    titleService: TitleService,
    private readonly alert: AlertService,
  ) {
    titleService.setTitle("Шаблоны исторических данных");
  }

  ngOnInit(): void {
    this.items = null;
    this.source = null;

    this.loadProfessions();
    this.loadData(this.currentPage);
  }

  loadProfessions(): void {
    if (this.professions.length > 0) {
      return;
    }

    this.professionsService
      .allForSelectBoxes()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.professions = x;
        this.professionsAsOptions = x.map((p) => ({
          value: p.id.toString(),
          item: p.id,
          label: p.title,
        }));
      });
  }

  loadData(pageToRequest: number): void {
    this.items = null;
    this.source = null;
    this.currentPage = pageToRequest;

    this.service
      .search({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.items = x.results;
        this.source = x;
      });
  }

  delete(item: SalariesHistoricalDataRecordTemplateDto): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить шаблон",
        `Вы уверены, что хотите удалить шаблон "${item.name}"?`,
        () => {
          this.service
            .delete(item.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Шаблон удален");
              this.loadData(this.currentPage);
            });
        },
      ),
    );
  }

  deleteAllRecords(item: SalariesHistoricalDataRecordTemplateDto): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить все записи",
        `Вы уверены, что хотите удалить все записи шаблона "${item.name}"? Сам шаблон останется.`,
        () => {
          this.service
            .deleteAllRecords(item.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Все записи шаблона удалены");
              this.loadData(this.currentPage);
            });
        },
      ),
    );
  }

  create(): void {
    this.editForm = new HistoricalDataTemplateEditForm(null);
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  onEditFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    const createRequest = this.editForm.createRequestOrNull();
    if (createRequest == null) {
      return;
    }

    const itemId = this.editForm.getItemId();
    if (this.editForm.hasItemToEdit() && itemId != null) {
      this.service
        .update(itemId, createRequest)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success("Шаблон обновлен");
          this.editForm = null;
          this.loadData(this.currentPage);
        });

      return;
    }

    this.service
      .create(createRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Шаблон создан");
        this.editForm = null;
        this.loadData(this.currentPage);
      });
  }

  openEditDlg(item: SalariesHistoricalDataRecordTemplateDto): void {
    this.editForm = new HistoricalDataTemplateEditForm(item);
  }

  getProfessionNames(professionIds: number[] | null): string {
    if (!professionIds || professionIds.length === 0) {
      return "-";
    }

    return professionIds
      .map((id) => {
        const profession = this.professions.find((p) => p.id === id);
        return profession?.title ?? id.toString();
      })
      .join(", ");
  }

  openProfessionsModal(professionIds: number[] | null): void {
    if (!professionIds || professionIds.length === 0) {
      return;
    }

    this.selectedProfessionsForModal = professionIds
      .map((id) => this.professions.find((p) => p.id === id))
      .filter((p): p is LabelEntityDto => p != null);
  }

  closeProfessionsModal(): void {
    this.selectedProfessionsForModal = null;
  }

  ngOnDestroy(): void {
    // ignored
  }
}
