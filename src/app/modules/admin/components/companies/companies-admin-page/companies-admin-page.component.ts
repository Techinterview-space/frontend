import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Company } from "@models/companies.model";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import {
  CompaniesSearchParamsForAdmin,
  CompaniesService,
} from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { EditCompanyForm } from "../shared/edit-company-form";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { OpenAiChatResult } from "@models/open-ai.model";

@Component({
  templateUrl: "./companies-admin-page.component.html",
  styleUrls: ["./companies-admin-page.component.scss"],
  standalone: false,
})
export class CompaniesAdminPageComponent implements OnInit, OnDestroy {
  readonly MIN_SEARCH_QUERY_LENGTH = 2;

  companies: Array<Company> | null = null;
  source: PaginatedList<Company> | null = null;
  currentPage: number = 1;
  searchQuery: string = "";

  editForm: EditCompanyForm | null = null;
  itemToEdit: Company | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

  // AI Analysis modal properties
  aiAnalysisData: OpenAiChatResult | null = null;
  aiAnalysisJsonContent: string = "";

  // Copy button properties (similar to interview markdown modal)
  private readonly copyBtnDefaultTitle = "Копировать";
  private readonly copyBtnDefaultIcon = "bi bi-clipboard2-check";
  private readonly copiedBtnTitle = "Скопировано";
  private readonly copiedBtnIcon = "bi bi-check2";

  copyBtnTitle = this.copyBtnDefaultTitle;
  copyBtnIcon = this.copyBtnDefaultIcon;

  get searchButtonShouldBeEnabled(): boolean {
    return (
      this.searchQuery != null &&
      this.searchQuery.length >= this.MIN_SEARCH_QUERY_LENGTH
    );
  }

  constructor(
    private readonly service: CompaniesService,
    private readonly title: TitleService,
    private readonly router: Router,
    private readonly alert: AlertService,
  ) {
    this.title.setTitle("Компании в системе");
  }

  ngOnInit(): void {
    this.loadData(1);
  }

  loadData(pageToLoad: number): void {
    this.companies = null;
    this.source = null;
    this.currentPage = pageToLoad;

    const params: CompaniesSearchParamsForAdmin = {
      companyName: this.searchQuery || null,
      page: pageToLoad,
      pageSize: defaultPageParams.pageSize,
    };

    this.service
      .allForAdmin(params)
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.companies = i.results;
        this.source = i;
      });
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
  }

  search(): void {
    if (this.searchButtonShouldBeEnabled) {
      this.currentPage = 1;
      this.loadData(1);
    }
  }

  onKeyupEvent(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.search();
    }
  }

  clearSearch(): void {
    if (this.searchQuery.length >= this.MIN_SEARCH_QUERY_LENGTH) {
      this.searchQuery = "";
      this.currentPage = 1;
      this.loadData(1);
    }
  }

  edit(item: Company): void {
    this.editForm = new EditCompanyForm(item);
    this.itemToEdit = item;
  }

  create(): void {
    this.editForm = new EditCompanyForm(null);
    this.itemToEdit = null;
  }

  onEditFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    const editRequest = this.editForm.editRequestOrNull();
    if (editRequest == null) {
      return;
    }

    if (this.itemToEdit != null) {
      this.service
        .update(this.itemToEdit.id, editRequest)
        .pipe(untilDestroyed(this))
        .subscribe(() => {
          this.alert.success("Компания была обновлена");
          this.editForm = null;
          this.ngOnInit();
        });

      return;
    }

    this.service
      .create(editRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Новая компания была создана");
        this.editForm = null;
        this.ngOnInit();
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  delete(item: Company): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить компанию",
        "Вы уверены, что хотите удалить компанию?",
        () => {
          this.service
            .delete(item.id!)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Компания была удалена");
              this.confirmDeletionMessage = null;
              this.ngOnInit();
            });
        },
      ),
    );
  }

  showAiAnalysis(company: Company): void {
    this.service
      .getOpenAiAnalysis(company.slug)
      .pipe(untilDestroyed(this))
      .subscribe({
        next: (result) => {
          this.aiAnalysisData = result;
          this.aiAnalysisJsonContent = JSON.stringify(result, null, 2);
        },
        error: (error) => {
          this.alert.error("Ошибка при получении AI анализа: " + error.message);
        },
      });
  }

  onAiAnalysisModalClose(): void {
    this.aiAnalysisData = null;
    this.aiAnalysisJsonContent = "";
    this.copyBtnTitle = this.copyBtnDefaultTitle;
    this.copyBtnIcon = this.copyBtnDefaultIcon;
  }

  copyAiAnalysis(inputElement: any): void {
    inputElement.select();
    document.execCommand("copy");
    inputElement.setSelectionRange(0, 0);

    this.copyBtnTitle = this.copiedBtnTitle;
    this.copyBtnIcon = this.copiedBtnIcon;

    setTimeout(() => {
      this.copyBtnTitle = this.copyBtnDefaultTitle;
      this.copyBtnIcon = this.copyBtnDefaultIcon;
    }, 1000);
  }
}
