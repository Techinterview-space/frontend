import { SelectItem } from '@shared/select-boxes/select-item';

export enum EmploymentStatus {
  Undefined = 0,
  LongList = 1,
  HrInterview = 2,
  TechnicalInterview = 3,
  CustomerInterview = 4,
  ResourceManagerInterview = 5,
  DecisionPending = 6,
  Approved = 7,
  PreOffered = 8,
  Offered = 9,
  Rejected = 10,
  Hired = 11,
  NotRelevant = 12,
  Reserved = 13
}

export class EmploymentStatusEnum {
  private static readonly items: Array<EmploymentStatus> = [
    EmploymentStatus.LongList,
    EmploymentStatus.HrInterview,
    EmploymentStatus.TechnicalInterview,
    EmploymentStatus.CustomerInterview,
    EmploymentStatus.ResourceManagerInterview,
    EmploymentStatus.DecisionPending,
    EmploymentStatus.Approved,
    EmploymentStatus.PreOffered,
    EmploymentStatus.Offered,
    EmploymentStatus.Rejected,
    EmploymentStatus.Hired,
    EmploymentStatus.NotRelevant,
    EmploymentStatus.Reserved
  ];

  public static readonly activeEmploymentStatues: Array<EmploymentStatus> = [
    EmploymentStatus.HrInterview,
    EmploymentStatus.TechnicalInterview,
    EmploymentStatus.CustomerInterview,
    EmploymentStatus.ResourceManagerInterview,
    EmploymentStatus.DecisionPending,
    EmploymentStatus.Approved,
    EmploymentStatus.PreOffered,
    EmploymentStatus.Offered
  ];

  public static readonly inactiveEmploymentStatues: Array<EmploymentStatus> = [
    EmploymentStatus.LongList,
    EmploymentStatus.Rejected,
    EmploymentStatus.Hired,
    EmploymentStatus.NotRelevant,
    EmploymentStatus.Reserved
  ];

  static all(): Array<EmploymentStatus> {
    return EmploymentStatusEnum.items;
  }

  static label(status: EmploymentStatus): string {
    switch (status) {
      case EmploymentStatus.LongList:
        return 'Long List';
      case EmploymentStatus.HrInterview:
        return 'Hr Interview';
      case EmploymentStatus.TechnicalInterview:
        return 'Technical Interview';
      case EmploymentStatus.CustomerInterview:
        return 'Customer Interview';
      case EmploymentStatus.ResourceManagerInterview:
        return 'Resource Manager Interview';
      case EmploymentStatus.DecisionPending:
        return 'Decision Pending';
      case EmploymentStatus.Approved:
        return 'Approved';
      case EmploymentStatus.PreOffered:
        return 'Pre Offered';
      case EmploymentStatus.Offered:
        return 'Offered';
      case EmploymentStatus.Rejected:
        return 'Rejected';
      case EmploymentStatus.Hired:
        return 'Hired';
      case EmploymentStatus.NotRelevant:
        return 'Not Relevant';
      case EmploymentStatus.Reserved:
        return 'Reserved';
      default:
        throw Error(`No label for EmploymentStatus ${status}`);
    }
  }

  static cssClass(status: EmploymentStatus): string {
    switch (status) {
      case EmploymentStatus.LongList:
      case EmploymentStatus.NotRelevant:
      case EmploymentStatus.Reserved:
        return 'ligth text-dark';

      case EmploymentStatus.HrInterview:
      case EmploymentStatus.TechnicalInterview:
      case EmploymentStatus.CustomerInterview:
      case EmploymentStatus.ResourceManagerInterview:
        return 'info text-dark';

      case EmploymentStatus.DecisionPending:
        return 'warning';

      case EmploymentStatus.Rejected:
        return 'danger';

      case EmploymentStatus.Approved:
      case EmploymentStatus.PreOffered:
      case EmploymentStatus.Offered:
      case EmploymentStatus.Hired:
        return 'success';
      default:
        return 'secondary';
    }
  }

  static options(): Array<SelectItem<EmploymentStatus>> {
    return EmploymentStatusEnum.items.map((item) => {
      return {
        value: item.toString(),
        item: item,
        label: EmploymentStatusEnum.label(item)
      };
    });
  }
}
