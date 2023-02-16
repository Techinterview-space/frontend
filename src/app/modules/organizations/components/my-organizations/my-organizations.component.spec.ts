import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganizationsService } from '@services/organizations.service';
import { mostUsedImports, testUtilStubs, mostUsedServices } from '@shared/test-utils';

import { MyOrganizationsComponent } from './my-organizations.component';

describe('MyOrganizationsComponent', () => {
  let component: MyOrganizationsComponent;
  let fixture: ComponentFixture<MyOrganizationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyOrganizationsComponent],
      imports: [...mostUsedImports],
      providers: [...testUtilStubs, ...mostUsedServices, OrganizationsService],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOrganizationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
