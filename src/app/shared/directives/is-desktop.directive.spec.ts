import { IsDesktopDirective } from './is-desktop.directive';
import { CheckDeviceService } from '@shared/services/check-device/check-device.service';
import { ViewContainerRefStub } from '@shared/test-utils/view-container-ref-stub';
import { TemplateRefStub } from '@shared/test-utils/template-ref-stub';

describe('IsDesktopDirective', () => {
  it('should create an instance', () => {
    const directive = new IsDesktopDirective(
      new ViewContainerRefStub(),
      new TemplateRefStub(),
      new CheckDeviceService()
    );
    expect(directive).toBeTruthy();
  });
});
