import { SelectItem } from "@shared/select-boxes/select-item";
import { EnumHelper } from "@shared/value-objects/enum-helper";
import { SplittedByWhitespacesString } from "@shared/value-objects/splitted-by-whitespaces-string";

export enum Gender {
    Undefined = 0,
    Female = 1,
    Male = 2,
    PreferNotToSay = 3,
    Other = 4,
}

export class GenderEnum {
    static options(): Array<SelectItem<Gender>> {
        return GenderEnum.allItems().map((item) => {
            return {
            value: item.toString(),
            item: item,
            label: GenderEnum.label(item)
            };
        })
    }

    static allItems(): Gender[] {
        return EnumHelper.getValues(Gender)
            .filter((x) => x !== Gender.Undefined);
    }

    static label(item: Gender): string {
        switch (item) {
            case Gender.Female:
                return 'Женщина';

            case Gender.Male:
                return 'Мужчина';

            case Gender.PreferNotToSay:
                return 'Предпочту не указывать';

            case Gender.Other:
                return 'Другое';

            default:
              return new SplittedByWhitespacesString(Gender[item]).value;
        }
    }
}
