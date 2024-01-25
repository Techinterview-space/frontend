import { SelectItem } from "@shared/select-boxes/select-item";
import { EnumHelper } from "@shared/value-objects/enum-helper";
import { SplittedByWhitespacesString } from "@shared/value-objects/splitted-by-whitespaces-string";

export enum UserProfession {
    Undefined = 0,

    Developer = 1,

    QualityAssurance = 2,

    Tester = 3,

    BusinessAnalyst = 4,

    ProjectManager = 5,

    ScrumMaster = 6,

    DevOps = 7,

    SystemAdministrator = 8,

    ProductOwner = 9,

    TeamLeader = 10,

    Architect = 11,

    DataScientist = 12,

    DataAnalyst = 13,

    DataEngineer = 14,

    DataWarehouseSpecialist = 15,

    DatabaseAdministrator = 16,

    TechLeader = 17,

    SystemAnalyst = 18,

    ItHr = 19,

    ItRecruiter = 20,

    UiDesigner = 21,

    UxDesigner = 22,

    UiUxDesigner = 23,

    ProductAnalyst = 24,

    ProductManager = 25,

    ProductDesigner = 26,

    HrNonIt = 27,
}

export class UserProfessionEnum { 
    static options(): Array<SelectItem<UserProfession>> {
        return UserProfessionEnum.allItems().map((item) => {
            return {
            value: item.toString(),
            item: item,
            label: UserProfessionEnum.label(item)
            };
        });
    }

    static allItems(): UserProfession[] {
        return EnumHelper.getValues(UserProfession)
            .filter((x) => x !== UserProfession.Undefined);
    }

    static label(item: UserProfession): string {
        switch (item) {
            case UserProfession.UiDesigner:
              return 'UI Designer';
      
            case UserProfession.UxDesigner:
              return 'UX Designer';
      
            case UserProfession.UiUxDesigner:
              return 'UI/UX Designer';
      
            case UserProfession.HrNonIt:
              return 'HR (не из IT)';
      
            default:
              return new SplittedByWhitespacesString(UserProfession[item]).value;
        }
      }
}
