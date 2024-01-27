import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "@models/salaries/company-type";
import { UserProfession, UserProfessionEnum } from "@models/salaries/user-profession";
import { SalariesAdminOrderingType } from "@services/user-salaries.service";
import { CompanyTypeSelectItem } from "@shared/select-boxes/company-type-select-item";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";
import { SelectItem } from "@shared/select-boxes/select-item";

export class SalariesTableFilter {

    readonly professions: Array<SelectItem<UserProfession>> = UserProfessionEnum.options();
    readonly companies: Array<CompanyTypeSelectItem> = CompanyTypeSelectItem.allItems();
    readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.gradesSimpleOnly();
    readonly orderTypes: Array<SelectItem<SalariesAdminOrderingType>> = [
        {
            value: SalariesAdminOrderingType.CreatedAtDesc.toString(),
            item: SalariesAdminOrderingType.CreatedAtDesc,
            label: 'Newest'
        },
        {
            value: SalariesAdminOrderingType.CreatedAtAsc.toString(),
            item: SalariesAdminOrderingType.CreatedAtAsc,
            label: 'Oldest'
        },
        {
            value: SalariesAdminOrderingType.ValueDesc.toString(),
            item: SalariesAdminOrderingType.ValueDesc,
            label: 'Highest salary'
        },
        {
            value: SalariesAdminOrderingType.ValueAsc.toString(),
            item: SalariesAdminOrderingType.ValueAsc,
            label: 'Lowest salary'
        }
    ];

    profession: UserProfession | null = null;
    company: CompanyType | null = null;
    grade: DeveloperGrade | null = null;
    order_type: SalariesAdminOrderingType = SalariesAdminOrderingType.CreatedAtDesc;

    constructor() {}
}
