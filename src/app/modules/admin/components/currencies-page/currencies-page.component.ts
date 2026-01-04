import { Component, OnDestroy, OnInit } from "@angular/core";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { CurrencyItem } from "./currency-item";
import { defaultPageParams } from "@models/page-params";
import { PaginatedList } from "@models/paginated-list";
import {
  CurrenciesCollectionService,
  CurrencyRecord,
} from "@services/currencies-collection.service";
import { DialogMessage } from "@shared/components/dialogs/models/dialog-message";
import { ConfirmMsg } from "@shared/components/dialogs/models/confirm-msg";
import { AlertService } from "@shared/components/alert/services/alert.service";
import { CurrencyRecordEditForm } from "./currency-record-edit-form";
import { CurrencyType } from "@services/admin-tools.service";

@Component({
  templateUrl: "./currencies-page.component.html",
  styleUrls: ["./currencies-page.component.scss"],
  standalone: false,
})
export class CurrenciesPageComponent implements OnInit, OnDestroy {
  currencies: Array<CurrencyItem> | null = null;
  source: PaginatedList<CurrencyRecord> | null = null;
  currentPage: number = 1;

  confirmDeletionMessage: DialogMessage<ConfirmMsg> | null = null;
  editForm: CurrencyRecordEditForm | null = null;

  // For viewing currencies JSON
  selectedCurrencyItem: CurrencyItem | null = null;

  // Currency options for select box
  readonly currencyOptions = [
    { value: CurrencyType.USD, label: "USD" },
    { value: CurrencyType.EUR, label: "EUR" },
    { value: CurrencyType.RUB, label: "RUB" },
    { value: CurrencyType.KGS, label: "KGS" },
    { value: CurrencyType.SAR, label: "SAR" },
    { value: CurrencyType.AED, label: "AED" },
    { value: CurrencyType.CAD, label: "CAD" },
  ];

  constructor(
    private readonly titleService: TitleService,
    private readonly currenciesService: CurrenciesCollectionService,
    private readonly alert: AlertService,
  ) {
    this.titleService.setTitle("Курсы валют");
  }

  ngOnInit(): void {
    this.currencies = null;
    this.source = null;
    this.loadData(this.currentPage);
  }

  loadData(pageToRequest: number): void {
    this.currencies = null;
    this.source = null;
    this.currentPage = pageToRequest;

    this.currenciesService
      .getAll({
        page: this.currentPage,
        pageSize: defaultPageParams.pageSize,
      })
      .pipe(untilDestroyed(this))
      .subscribe((response) => {
        this.currencies = response.results.map((x) => new CurrencyItem(x));
        this.source = response;
      });
  }

  ngOnDestroy(): void {
    this.titleService.resetTitle();
  }

  create(): void {
    this.editForm = new CurrencyRecordEditForm();
  }

  onEditFormSubmit(): void {
    if (this.editForm == null) {
      return;
    }

    const createRequest = this.editForm.createRequestOrNull();
    if (createRequest == null) {
      return;
    }

    this.currenciesService
      .create(createRequest)
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.alert.success("Запись о курсе валюты была создана");
        this.editForm = null;
        this.loadData(this.currentPage);
      });
  }

  onEditModalDlgClose(): void {
    this.editForm = null;
  }

  openDeleteDialog(item: CurrencyItem): void {
    this.confirmDeletionMessage = new DialogMessage(
      new ConfirmMsg(
        "Удалить запись",
        `Вы уверены, что хотите удалить запись от ${new Date(item.currencyDate).toLocaleDateString()}?`,
        () => {
          this.currenciesService
            .delete(item.id)
            .pipe(untilDestroyed(this))
            .subscribe(() => {
              this.alert.success("Запись была удалена");
              this.confirmDeletionMessage = null;
              this.loadData(this.currentPage);
            });
        },
      ),
    );
  }

  showCurrenciesDetails(item: CurrencyItem): void {
    this.selectedCurrencyItem = item;
  }

  closeCurrenciesDetails(): void {
    this.selectedCurrencyItem = null;
  }
}
