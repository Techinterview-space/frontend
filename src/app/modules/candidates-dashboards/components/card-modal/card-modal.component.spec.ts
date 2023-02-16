import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { BoardService } from '../models/board.service';

import { CardModalComponent } from './card-modal.component';

describe('CardModalComponent', () => {
  let component: CardModalComponent;
  let fixture: ComponentFixture<CardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardModalComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, BoardService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
