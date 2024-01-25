import { DeveloperGrade } from "@models/enums";
import { CompanyType } from "@models/salaries/company-type";
import { UserProfession, UserProfessionEnum } from "@models/salaries/user-profession";
import { CompanyTypeSelectItem } from "@shared/select-boxes/company-type-select-item";
import { DeveloperGradeSelectItem } from "@shared/select-boxes/developer-grade-select-item";
import { SelectItem } from "@shared/select-boxes/select-item";

export class SalariesTableFilter {

    readonly professions: Array<SelectItem<UserProfession>> = UserProfessionEnum.options();
    readonly companies: Array<CompanyTypeSelectItem> = CompanyTypeSelectItem.allItems();
    readonly grades: Array<DeveloperGradeSelectItem> = DeveloperGradeSelectItem.gradesSimpleOnly();

    profession: UserProfession | null = null;
    company: CompanyType | null = null;
    grade: DeveloperGrade | null = null;

    constructor() {}
}
