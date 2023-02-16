import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PaginatedModel } from '@models/paginated-list';

@Component({
  selector: 'app-pagination-buttons',
  templateUrl: './pagination-buttons.component.html'
})
export class PaginationButtonsComponent implements OnInit {
  @Input()
  source: PaginatedModel | null = null;

  @Output()
  pageChange: EventEmitter<number> = new EventEmitter<number>();

  pages: Array<number> = [];
  lastPage: number | null = null;

  get disablePreviousButton(): boolean {
    return this.source != null && (this.source.currentPage === 1 || this.source.totalItems === 0);
  }

  get disableNextButton(): boolean {
    return this.source != null && (this.source.currentPage === this.lastPage || this.source.totalItems === 0);
  }

  ngOnInit(): void {
    if (this.source) {
      this.lastPage = Math.ceil(this.source.totalItems / this.source.pageSize);
      this.pages = Array.from(Array(this.lastPage).keys()).map((i) => i + 1);
    }
  }

  previous(): void {
    if (this.source && this.source.currentPage > 1) {
      this.pageClicked(this.source.currentPage - 1);
    }
  }

  next(): void {
    if (this.source && this.lastPage && this.source.currentPage < this.lastPage) {
      this.pageClicked(this.source.currentPage + 1);
    }
  }

  pageClicked(page: number): void {
    this.pageChange.emit(page);
  }

  activePageStyle(page: number): string {
    return this.source && this.source.currentPage === page ? 'active' : '';
  }
}
