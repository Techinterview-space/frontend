import { InterviewTemplate } from '@models/interview-models/interview-template';
import { SelectItem } from '@shared/select-boxes/select-item';

export class InterviewTemplateSelectItem implements SelectItem<InterviewTemplate> {
  readonly value: string;
  readonly label: string;
  readonly item: InterviewTemplate;

  constructor(template: InterviewTemplate) {
    this.value = template.id;
    this.label = template.title;
    this.item = template;
  }
}
