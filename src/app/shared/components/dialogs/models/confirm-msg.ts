import { DialogMsg } from './dialog-msg';

export class ConfirmMsg extends DialogMsg {
  constructor(subject: string, public readonly text: string, readonly confirm: () => void) {
    super(subject);
  }
}
