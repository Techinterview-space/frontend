import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "@models/salaries/company-type";
import { LabelEntityDto } from "@services/label-entity.model";
import { SalariesAdminOrderingType } from "@services/user-salaries.service";
import { CompanyTypeSelectItem } from "@shared/select-boxes/company-type-select-item";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";
import { SelectItem } from "@shared/select-boxes/select-item";

export class SalariesTableFilter {
  readonly professions: Array<SelectItem<number>>;
  readonly companies: Array<CompanyTypeSelectItem> =
    CompanyTypeSelectItem.allItems();
  readonly grades: Array<DeveloperGradeSelectItem> =
    DeveloperGradeSelectItem.gradesSimpleOnly();
  readonly orderTypes: Array<SelectItem<SalariesAdminOrderingType>> = [
    {
      value: SalariesAdminOrderingType.CreatedAtDesc.toString(),
      item: SalariesAdminOrderingType.CreatedAtDesc,
      label: "Новые сначала",
    },
    {
      value: SalariesAdminOrderingType.CreatedAtAsc.toString(),
      item: SalariesAdminOrderingType.CreatedAtAsc,
      label: "Старые сначала",
    },
    {
      value: SalariesAdminOrderingType.ValueDesc.toString(),
      item: SalariesAdminOrderingType.ValueDesc,
      label: "По убыванию зарплаты",
    },
    {
      value: SalariesAdminOrderingType.ValueAsc.toString(),
      item: SalariesAdminOrderingType.ValueAsc,
      label: "По возрастанию зарплаты",
    },
  ];

  profession: number | null = null;
  company: CompanyType | null = null;
  grade: DeveloperGrade | null = null;
  order_type: SalariesAdminOrderingType =
    SalariesAdminOrderingType.CreatedAtDesc;

  constructor(private readonly professionItems: Array<LabelEntityDto>) {
    this.professions = professionItems.map((x) => {
      return {
        value: x.id.toString(),
        item: x.id,
        label: x.title,
      };
    });
  }
}
