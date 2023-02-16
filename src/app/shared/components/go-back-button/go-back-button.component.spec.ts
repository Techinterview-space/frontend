import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { GoBackButtonComponent } from './go-back-button.component';
import { Location } from '@angular/common';
import { SpyLocation } from '@angular/common/testing';

describe('GoBackButtonComponent', () => {
  let component: GoBackButtonComponent;
  let fixture: ComponentFixture<GoBackButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GoBackButtonComponent],
      providers: [
        {
          provide: Location,
          useClass: SpyLocation
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
