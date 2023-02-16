import { EmploymentStatus } from '@models/organizations/employment-status.enum';
import { PageParams } from '@models/page-params';
import { SelectItem } from '@shared/select-boxes/select-item';

export enum ActiveOrArchived {
  Undefined,
  Active,
  Archived,
  Both
}

export class ActiveOrArchivedEnum {
  static options(): Array<SelectItem<ActiveOrArchived>> {
    return [
      {
        label: 'Active',
        value: ActiveOrArchived.Active.toString(),
        item: ActiveOrArchived.Active
      },
      {
        label: 'Archived',
        value: ActiveOrArchived.Archived.toString(),
        item: ActiveOrArchived.Archived
      },
      {
        label: 'Both',
        value: ActiveOrArchived.Both.toString(),
        item: ActiveOrArchived.Both
      }
    ];
  }

  static label(item: ActiveOrArchived): string {
    return ActiveOrArchived[item];
  }

  static cssClass(item: ActiveOrArchived): string {
    switch (item) {
      case ActiveOrArchived.Active:
        return 'bg-success';
      case ActiveOrArchived.Active:
        return 'bg-warning text-dark';
      default:
        return 'bg-light border text-dark';
    }
  }
}

export interface CandidateCardsFilterRequest {
  statuses: Array<EmploymentStatus>;
  includeEntities: boolean;
  activeOrArchived: ActiveOrArchived;
}

export interface CandidateCardsFilterPaginatedRequest extends CandidateCardsFilterRequest, PageParams {}
