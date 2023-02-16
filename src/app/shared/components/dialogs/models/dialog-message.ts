import Assertion from '@shared/validation/assertion';
import { DialogMsg } from './dialog-msg';

export class DialogMessage<TMessage extends DialogMsg> {
  readonly subject: string;

  constructor(readonly message: TMessage, private readonly closeInternal: () => void = () => {}) {
    Assertion.notNull(message, 'message');

    this.subject = message.subject;
  }

  close(): void {
    if (this.closeInternal != null) {
      this.closeInternal();
    }
  }
}
