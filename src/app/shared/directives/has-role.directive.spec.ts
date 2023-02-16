import { HasRoleDirective } from './has-role.directive';
import { AuthService } from '@shared/services/auth/auth.service';
import { UserRole } from '@models/enums';
import { spyOnCurrentUserServiceWithUserId, testUtilStubs, mostUsedServices } from '@shared/test-utils';
import { TestBed, async, waitForAsync } from '@angular/core/testing';
import { ViewContainerRefStub } from '@shared/test-utils/view-container-ref-stub';
import { TemplateRefStub } from '@shared/test-utils/template-ref-stub';

describe('HasRoleDirective', () => {
  const target = (role: string, authService: AuthService): HasRoleDirective => {
    const t = new HasRoleDirective(new ViewContainerRefStub(), new TemplateRefStub(), authService);
    t.role = role;
    t.ngOnInit();
    return t;
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [],
        declarations: [],
        providers: [...testUtilStubs, ...mostUsedServices],
        schemas: []
      }).compileComponents();
    })
  );

  it('.isVisible should return true for Interviewer directive when the Curent User is Interviewer', () => {
    expect(target('interviewer', spyOnCurrentUserServiceWithUserId(spyOn, 1, UserRole.Interviewer)).isVisible).toBe(
      true
    );
  });

  it('.isVisible should return false for SystemAdministrator directive when the Curent User is a role below', () => {
    const auth = spyOnCurrentUserServiceWithUserId(spyOn, 1, UserRole.Interviewer);
    expect(target('interviewer', auth).isVisible).toBe(true);
    expect(target('admin', auth).isVisible).toBe(false);
  });
});
