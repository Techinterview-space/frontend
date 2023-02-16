import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { BoardService } from '../models/board.service';

import { BoardCardViewComponent } from './board-card-view.component';

describe('BoardCardViewComponent', () => {
  let component: BoardCardViewComponent;
  let fixture: ComponentFixture<BoardCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardCardViewComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, BoardService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
