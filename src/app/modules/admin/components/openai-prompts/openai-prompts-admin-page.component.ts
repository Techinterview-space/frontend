import { Component, OnDestroy, OnInit } from "@angular/core";
import { OpenAiPrompt } from "@models/openai-prompt.model";
import { OpenAiPromptsService } from "@services/openai-prompts.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { OpenAiPromptForm } from "./openai-prompt-form";

@Component({
  selector: "app-openai-prompts-admin-page",
  templateUrl: "./openai-prompts-admin-page.component.html",
  styleUrls: ["./openai-prompts-admin-page.component.scss"],
  standalone: false,
})
export class OpenAiPromptsAdminPageComponent implements OnInit, OnDestroy {
  prompts: Array<OpenAiPrompt> | null = null;

  editForm: OpenAiPromptForm | null = null;
  itemToEdit: OpenAiPrompt | null = null;
  confirmMessage: DialogMessage<ConfirmMsg> | null = null;

  constructor(
    private readonly service: OpenAiPromptsService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
  ) {
    this.title.setTitle("OpenAI промпты");
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  loadData(): void {
    this.prompts = null;

    this.service
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe((prompts) => {
        this.prompts = prompts;
      });
  }

  create(): void {
    this.itemToEdit = null;
    this.editForm = new OpenAiPromptForm(null);
  }

  edit(item: OpenAiPrompt): void {
    this.itemToEdit = item;
    this.editForm = new OpenAiPromptForm(item);
  }

  onEditFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    this.editForm.markAllAsTouched();

    const request = this.editForm.getEditRequestOrNull();
    if (request == null) {
      this.alert.error("Некорректные данные");
      return;
    }

    if (this.itemToEdit != null) {
      this.service
        .update(this.itemToEdit.id, request)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success("Промпт был обновлен");
          this.editForm = null;
          this.itemToEdit = null;
          this.loadData();
        });

      return;
    }

    this.service
      .create(request)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Новый промпт был создан");
        this.editForm = null;
        this.loadData();
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
    this.itemToEdit = null;
  }

  activate(item: OpenAiPrompt): void {
    this.service
      .activate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Промпт был активирован");
        this.loadData();
      });
  }

  deactivate(item: OpenAiPrompt): void {
    this.service
      .deactivate(item.id)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Промпт был деактивирован");
        this.loadData();
      });
  }

  delete(item: OpenAiPrompt): void {
    this.confirmMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить промпт",
        `Вы уверены, что хотите удалить промпт "${item.id}"?`,
        () => {
          this.service
            .delete(item.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Промпт был удален");
              this.confirmMessage = null;
              this.loadData();
            });
        },
      ),
    );
  }
}
