import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { PaginatedModel } from "@models/paginated-list";

@Component({
  selector: "app-pagination-buttons",
  templateUrl: "./pagination-buttons.component.html",
  standalone: false,
})
export class PaginationButtonsComponent implements OnInit, OnChanges {
  @Input()
  source: PaginatedModel | null = null;

  @Input()
  currentPage: number | null = null;

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Array<number | null> = [];
  lastPage: number | null = null;

  get disablePreviousButton(): boolean {
    const current = this.currentPage || (this.source ? this.source.currentPage : 1);
    return (
      this.source != null &&
      (current === 1 || this.source.totalItems === 0)
    );
  }

  get disableNextButton(): boolean {
    const current = this.currentPage || (this.source ? this.source.currentPage : 1);
    return (
      this.source != null &&
      (current === this.lastPage ||
        this.source.totalItems === 0)
    );
  }

  ngOnInit(): void {
    this.generatePages();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['source'] || changes['currentPage']) {
      this.generatePages();
    }
  }

  private generatePages(): void {
    if (this.source) {
      this.lastPage = Math.ceil(this.source.totalItems / this.source.pageSize);
      const allPages = Array.from(Array(this.lastPage).keys()).map(
        (i) => i + 1,
      );
      
      const current = this.currentPage || this.source.currentPage;

      if (allPages.length > 7) {
        if (
          current > 3 &&
          current < this.lastPage - 2
        ) {
          this.pages = [
            1,
            2,
            null,
            current - 1,
            current,
            current + 1,
            null,
            this.lastPage - 1,
            this.lastPage,
          ];
        } else if (current <= 3) {
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
    const current = this.currentPage || (this.source ? this.source.currentPage : 1);
    if (this.source && current > 1) {
      this.pageClicked(current - 1);
    }
  }

  next(): void {
    const current = this.currentPage || (this.source ? this.source.currentPage : 1);
    if (
      this.source &&
      this.lastPage &&
      current < this.lastPage
    ) {
      this.pageClicked(current + 1);
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
    
    const current = this.currentPage || (this.source ? this.source.currentPage : 1);
    return this.source && current === page ? "active" : "";
  }
}
