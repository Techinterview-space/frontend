import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { BoardService } from '../models/board.service';

import { BoardComponent } from './board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

describe('BoardComponent', () => {
  let component: BoardComponent;
  let fixture: ComponentFixture<BoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoardComponent],
      imports: [...mostUsedImports, DragDropModule],
      providers: [...testUtilStubs, ...mostUsedServices, BoardService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
