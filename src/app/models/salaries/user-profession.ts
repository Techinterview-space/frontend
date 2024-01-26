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

    OneCDeveloper = 28,

    ThreeDModeler = 29,

    AndroidDeveloper = 30,

    IosDeveloper = 31,

    MobileDeveloper = 32,

    FrontendDeveloper = 33,

    BackendDeveloper = 34,

    FullstackDeveloper = 35,

    GameDeveloper = 36,

    EmbeddedDeveloper = 37,

    MachineLearningDeveloper = 38,

    Pentester = 39,

    SecurityEngineer = 40,

    SecurityAnalyst = 41,

    TechnicalWriter = 42,

    BiDeveloper = 43,
}

export class UserProfessionEnum { 
    static options(excludeDeveloper = false): Array<SelectItem<UserProfession>> {
        return UserProfessionEnum.allItems(excludeDeveloper).map((item) => {
            return {
              value: item.toString(),
              item: item,
              label: UserProfessionEnum.label(item)
            };
        });
    }

    static allItems(excludeDeveloper = false): UserProfession[] {
        let values = EnumHelper.getValues(UserProfession)
            .filter((x) => x !== UserProfession.Undefined);

        if (excludeDeveloper) {
            values = values.filter((x) => x !== UserProfession.Developer);
        }

        return values;
    }

    static label(item: UserProfession): string {
        switch (item) {
            case UserProfession.UiDesigner:
              return 'UI designer';
      
            case UserProfession.UxDesigner:
              return 'UX designer';
      
            case UserProfession.UiUxDesigner:
              return 'UI/UX designer';
      
            case UserProfession.HrNonIt:
              return 'HR (не из IT)';
            
            case UserProfession.OneCDeveloper:
              return '1C developer';

            case UserProfession.ThreeDModeler:
              return '3D developer';

            case UserProfession.IosDeveloper:
              return 'iOS developer';

            case UserProfession.BiDeveloper:
              return 'BI developer';
      
            default:
              return new SplittedByWhitespacesString(UserProfession[item]).value;
        }
      }
}
