import { Component, OnDestroy, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Company } from "@models/companies.model";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import { CompaniesService } from "@services/companies.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { EditCompanyForm } from "../shared/edit-company-form";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";

@Component({
  templateUrl: "./companies-admin-page.component.html",
  styleUrls: ["./companies-admin-page.component.scss"],
  standalone: false,
})
export class CompaniesAdminPageComponent implements OnInit, OnDestroy {
  companies: Array<Company> | null = null;
  source: PaginatedList<Company> | null = null;
  currentPage: number = 1;

  editForm: EditCompanyForm | null = null;
  itemToEdit: Company | null = null;
  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;

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

    this.service
      .all({
        searchQuery: null,
        page: pageToLoad,
        pageSize: defaultPageParams.pageSize,
        withRating: false,
      })
      .pipe(untilDestroyed(this))
      .subscribe((i) => {
        this.companies = i.results;
        this.source = i;
      });
  }

  navigateToCompany(id: string): void {
    this.router.navigate(["/admin/companies", id]);
  }

  ngOnDestroy(): void {
    this.title.resetTitle();
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
}
