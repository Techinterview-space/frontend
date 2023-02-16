import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { BoardService } from '../models/board.service';

import { CandidatesBoardComponent } from './candidates-board.component';

describe('CandidatesBoardComponent', () => {
  let component: CandidatesBoardComponent;
  let fixture: ComponentFixture<CandidatesBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CandidatesBoardComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, BoardService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatesBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
