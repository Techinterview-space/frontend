import { Component, OnDestroy, OnInit } from "@angular/core";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { TelegramBotService } from "@services/telegram-bot.service";
import { TelegramUserSettings } from "@models/telegram";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { TelegramUserSettingsEditForm } from "./settings-edit-form";

@Component({
  templateUrl: "./telegram-user-settings.component.html",
  standalone: false,
})
export class TelegramUserSettingsComponent implements OnInit, OnDestroy {
  items: Array<TelegramUserSettings> | null = null;
  source: PaginatedList<TelegramUserSettings> | null = null;
  currentPage: number = 1;

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  editForm: TelegramUserSettingsEditForm | null = null;
  itemToEdit: TelegramUserSettings | null = null;

  constructor(
    private readonly service: TelegramBotService,
    titleService: TitleService,
    private readonly alert: AlertService,
  ) {
    titleService.setTitle("Настройки пользователей бота");
  }

  ngOnInit(): void {
    this.items = null;
    this.source = null;

    this.loadData(this.currentPage);
  }

  loadData(pageToRequest: number): void {
    this.items = null;
    this.source = null;
    this.currentPage = pageToRequest;

    this.service
      .getUserSettings({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
      })
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.items = x.results;
        this.source = x;
      });
  }

  ngOnDestroy(): void {
    // ignored
  }

  openDeleteDialog(item: TelegramUserSettings): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить эти настройки",
        "Вы уверены, что хотите удалить эти настройки пользователя?",
        () => {
          this.service
            .deleteUserSettings(item.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Настройки были удалены");
              this.loadData(this.currentPage);
            });
        },
      ),
    );
  }

  edit(item: TelegramUserSettings): void {
    this.editForm = new TelegramUserSettingsEditForm(item);
    this.itemToEdit = item;
  }

  create(): void {
    this.editForm = new TelegramUserSettingsEditForm(null);
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
        .updateUserSettings(this.itemToEdit.id, updateRequest)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success("Данные были обновлены");
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
      .createUserSettings(createRequest)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.alert.success(
          `Настройки для пользователя ${x.username} (${x.chatId}) были созданы`,
        );
        this.editForm = null;
        this.ngOnInit();
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }
}
