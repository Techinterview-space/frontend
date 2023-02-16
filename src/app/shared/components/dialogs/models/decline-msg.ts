import { DeclineForm } from '@shared/components/dialogs/models/decline-form';
import { ConfirmMsg } from './confirm-msg';

export class DeclineFormMsg extends ConfirmMsg {
  constructor(subject: string, text: string, public readonly declineForm: DeclineForm, confirm: () => void) {
    super(subject, text, confirm);
  }
}
