import { SelectItem } from "@shared/select-boxes/select-item";
import { EnumHelper } from "@shared/value-objects/enum-helper";
import { SplittedByWhitespacesString } from "@shared/value-objects/splitted-by-whitespaces-string";

export enum KazakhstanCity {
    Undefined = 0,

    Aktau = 1,

    Aktobe = 2,

    Almaty = 3,

    Atyrau = 4,

    Astana = 5,

    Arkalyk = 6,

    Baikonur = 7,

    Balqash = 8,

    Jezkazgan = 9,

    Karaganda = 10,

    Kentau = 11,

    Kyzylorda = 12,

    Kokshetau = 13,

    Kostanay = 14,

    Janaozen = 15,

    Pavlodar = 16,

    Petropavl = 17,

    Ridder = 18,

    Saran = 19,

    Satpaev = 20,

    Semey = 21,

    Stepnogorsk = 22,

    Taldykorgan = 23,

    Taraz = 24,

    Temirtau = 25,

    Turkestan = 26,

    Oral = 27,

    Oskemen = 28,

    Shymkent = 29,

    Shakhtinsk = 30,

    Schuschinsk = 31,

    Ekibastuz = 32,
}

export class KazakhstanCityEnum { 
    static options(): Array<SelectItem<KazakhstanCity>> {
        return KazakhstanCityEnum.allItems().map((item) => {
            return {
              value: item.toString(),
              item: item,
              label: KazakhstanCityEnum.label(item)
            };
        });
    }

    static allItems(): KazakhstanCity[] {
        return EnumHelper.getValues(KazakhstanCity)
            .filter((x) => x !== KazakhstanCity.Undefined);
    }

    static label(item: KazakhstanCity): string {
        switch (item) {      
            default:
              return new SplittedByWhitespacesString(KazakhstanCity[item]).value;
        }
      }
}