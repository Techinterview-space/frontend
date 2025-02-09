import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { PaginatedModel } from "@models/paginated-list";

@Component({
    selector: "app-pagination-buttons",
    templateUrl: "./pagination-buttons.component.html",
    standalone: false
})
export class PaginationButtonsComponent implements OnInit {
  @Input()
  source: PaginatedModel | null = null;

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Array<number | null> = [];
  lastPage: number | null = null;

  get disablePreviousButton(): boolean {
    return (
      this.source != null &&
      (this.source.currentPage === 1 || this.source.totalItems === 0)
    );
  }

  get disableNextButton(): boolean {
    return (
      this.source != null &&
      (this.source.currentPage === this.lastPage ||
        this.source.totalItems === 0)
    );
  }

  ngOnInit(): void {
    if (this.source) {
      this.lastPage = Math.ceil(this.source.totalItems / this.source.pageSize);
      const allPages = Array.from(Array(this.lastPage).keys()).map(
        (i) => i + 1
      );

      if (allPages.length > 7) {
        if (
          this.source.currentPage > 3 &&
          this.source.currentPage < this.lastPage - 2
        ) {
          this.pages = [
            1,
            2,
            null,
            this.source.currentPage - 1,
            this.source.currentPage,
            this.source.currentPage + 1,
            null,
            this.lastPage - 1,
            this.lastPage,
          ];
        } else if (this.source.currentPage <= 3) {
          this.pages = [1, 2, 3, 4, 5, null, this.lastPage - 1, this.lastPage];
        } else {
          this.pages = [
            1,
            2,
            null,
            this.lastPage - 4,
            this.lastPage - 3,
            this.lastPage - 2,
            this.lastPage - 1,
            this.lastPage,
          ];
        }
      } else {
        this.pages = allPages;
      }
    }
  }

  previous(): void {
    if (this.source && this.source.currentPage > 1) {
      this.pageClicked(this.source.currentPage - 1);
    }
  }

  next(): void {
    if (
      this.source &&
      this.lastPage &&
      this.source.currentPage < this.lastPage
    ) {
      this.pageClicked(this.source.currentPage + 1);
    }
  }

  pageClicked(page: number | null): void {
    if (page != null) {
      this.pageChange.emit(page);
    }
  }

  activePageStyle(page: number | null): string {
    if (page == null) {
      return "";
    }

    return this.source && this.source.currentPage === page ? "active" : "";
  }
}
