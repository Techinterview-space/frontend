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
  isLoading = false;

  editForm: OpenAiPromptForm | null = null;
  itemToEdit: OpenAiPrompt | null = null;
  confirmMessage: DialogMessage<ConfirmMsg> | null = null;

  constructor(
    private readonly service: OpenAiPromptsService,
    private readonly title: TitleService,
    private readonly alert: AlertService,
  ) {
    this.title.setTitle("OpenAI Prompts");
  }

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  loadData(): void {
    this.isLoading = true;
    this.prompts = null;

    this.service
      .getAll()
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (prompts) => {
          this.prompts = prompts;
          this.isLoading = false;
        },
        error: (error) => {
          this.alert.error("Ошибка при загрузке промптов: " + error.message);
          this.isLoading = false;
        },
      });
  }

  create(): void {
    this.editForm = new OpenAiPromptForm(null);
    this.itemToEdit = null;
  }

  edit(item: OpenAiPrompt): void {
    this.editForm = new OpenAiPromptForm(item);
    this.itemToEdit = item;
  }

  onEditFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    this.editForm.markAllAsTouched();

    if (this.itemToEdit != null) {
      const updateRequest = this.editForm.updateRequestOrNull(this.itemToEdit.id);
      if (updateRequest == null) {
        return;
      }

      this.service
        .update(updateRequest)
        .pipe(untilDestroyed(this))
        .subscribe({
          next: () => {
            this.alert.success("Промпт был обновлен");
            this.editForm = null;
            this.itemToEdit = null;
            this.loadData();
          },
          error: (error) => {
            this.alert.error("Ошибка при обновлении промпта: " + error.message);
          },
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
      .subscribe({
        next: () => {
          this.alert.success("Новый промпт был создан");
          this.editForm = null;
          this.loadData();
        },
        error: (error) => {
          this.alert.error("Ошибка при создании промпта: " + error.message);
        },
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
    this.itemToEdit = null;
  }

  delete(item: OpenAiPrompt): void {
    this.confirmMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить промпт",
        `Вы уверены, что хотите удалить промпт "${item.title}"?`,
        () => {
          this.service
            .delete(item.id)
            .pipe(untilDestroyed(this))
            .subscribe({
              next: () => {
                this.alert.success("Промпт был удален");
                this.confirmMessage = null;
                this.loadData();
              },
              error: (error) => {
                this.alert.error("Ошибка при удалении промпта: " + error.message);
                this.confirmMessage = null;
              },
            });
        },
      ),
    );
  }
}