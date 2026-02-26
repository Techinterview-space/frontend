import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { TelegramBotService } from "@services/telegram-bot.service";
import {
  TelegramBotConfiguration,
  TelegramBotType,
  TelegramBotTypeLabel,
} from "@models/telegram";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { BotConfigurationEditForm } from "./bot-configuration-edit-form";

@Component({
  templateUrl: "./telegram-bot-configurations.component.html",
  standalone: false,
})
export class TelegramBotConfigurationsComponent implements OnInit, OnDestroy {
  items: Array<TelegramBotConfiguration> | null = null;
  editForm: BotConfigurationEditForm | null = null;
  itemToEdit: TelegramBotConfiguration | null = null;

  readonly botTypes = [
    { value: TelegramBotType.Salaries, label: TelegramBotTypeLabel[TelegramBotType.Salaries] },
    { value: TelegramBotType.GithubProfile, label: TelegramBotTypeLabel[TelegramBotType.GithubProfile] },
    { value: TelegramBotType.ChannelStats, label: TelegramBotTypeLabel[TelegramBotType.ChannelStats] },
  ];

  constructor(
    private readonly service: TelegramBotService,
    titleService: TitleService,
    private readonly alert: AlertService,
  ) {
    titleService.setTitle("Настройки ботов");
  }

  ngOnInit(): void {
    this.items = null;
    this.loadData();
  }

  loadData(): void {
    this.items = null;
    this.service
      .getBotConfigurations()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.items = x;
      });
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnDestroy(): void {
    // Required for untilDestroyed
  }

  create(): void {
    this.editForm = new BotConfigurationEditForm(null);
    this.itemToEdit = null;
  }

  edit(item: TelegramBotConfiguration): void {
    this.editForm = new BotConfigurationEditForm(item);
    this.itemToEdit = item;
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
        .updateBotConfiguration(this.itemToEdit.id, updateRequest)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success("Конфигурация бота обновлена");
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
      .createBotConfiguration(createRequest)
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.alert.success(
          `Конфигурация бота "${x.displayName}" создана`,
        );
        this.editForm = null;
        this.ngOnInit();
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }
}
