import Assertion from '@shared/validation/assertion';

export abstract class AdminTableItem<TResult> {
  constructor(public readonly title: string, public readonly hint: string, protected readonly action: () => TResult) {
    Assertion.notNull(title, 'title');
    Assertion.notNull(hint, 'hint');
    Assertion.notNull(action, 'action');
  }

  abstract execute(): void;
}
