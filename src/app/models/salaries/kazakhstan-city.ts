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

  Konaev = 15,

  Janaozen = 16,

  Pavlodar = 17,

  Petropavl = 18,

  Ridder = 19,

  Saran = 20,

  Satpaev = 21,

  Semey = 22,

  Stepnogorsk = 23,

  Taldykorgan = 24,

  Taraz = 25,

  Temirtau = 26,

  Turkestan = 27,

  Oral = 28,

  Oskemen = 29,

  Shymkent = 30,

  Shakhtinsk = 31,

  Schuschinsk = 32,

  Ekibastuz = 33,
}

export class KazakhstanCityEnum {
  static options(): Array<SelectItem<KazakhstanCity>> {
    const array = [
      {
        value: KazakhstanCity.Undefined.toString(),
        item: KazakhstanCity.Undefined,
        label: "Живу в другой стране",
      },
      ...KazakhstanCityEnum.allItems().map((item) => {
        return {
          value: item.toString(),
          item: item,
          label: KazakhstanCityEnum.label(item),
        };
      }),
    ];

    return array;
  }

  static allItems(): KazakhstanCity[] {
    return EnumHelper.getValues(KazakhstanCity).filter(
      (x) => x !== KazakhstanCity.Undefined,
    );
  }

  static label(item: KazakhstanCity): string {
    switch (item) {
      case KazakhstanCity.Aktau:
        return "Актау";

      case KazakhstanCity.Aktobe:
        return "Актобе";

      case KazakhstanCity.Almaty:
        return "Алматы";

      case KazakhstanCity.Atyrau:
        return "Атырау";

      case KazakhstanCity.Astana:
        return "Астана";

      case KazakhstanCity.Arkalyk:
        return "Аркалык";

      case KazakhstanCity.Baikonur:
        return "Байконур";

      case KazakhstanCity.Balqash:
        return "Балхаш";

      case KazakhstanCity.Jezkazgan:
        return "Жезказган";

      case KazakhstanCity.Karaganda:
        return "Караганда";

      case KazakhstanCity.Kentau:
        return "Кентау";

      case KazakhstanCity.Kyzylorda:
        return "Кызылорда";

      case KazakhstanCity.Kokshetau:
        return "Кокшетау";

      case KazakhstanCity.Kostanay:
        return "Костанай";

      case KazakhstanCity.Konaev:
        return "Кунаев";

      case KazakhstanCity.Janaozen:
        return "Жанаозен";

      case KazakhstanCity.Pavlodar:
        return "Павлодар";

      case KazakhstanCity.Petropavl:
        return "Петропавловск";

      case KazakhstanCity.Ridder:
        return "Риддер";

      case KazakhstanCity.Saran:
        return "Саран";

      case KazakhstanCity.Satpaev:
        return "Сатпаев";

      case KazakhstanCity.Semey:
        return "Семей";

      case KazakhstanCity.Stepnogorsk:
        return "Степногорск";

      case KazakhstanCity.Taldykorgan:
        return "Талдыкорган";

      case KazakhstanCity.Taraz:
        return "Тараз";

      case KazakhstanCity.Temirtau:
        return "Темиртау";

      case KazakhstanCity.Turkestan:
        return "Туркестан";

      case KazakhstanCity.Oral:
        return "Уральск";

      case KazakhstanCity.Oskemen:
        return "Усть-Каменогорск";

      case KazakhstanCity.Shymkent:
        return "Шымкент";

      case KazakhstanCity.Shakhtinsk:
        return "Шахтинск";

      case KazakhstanCity.Schuschinsk:
        return "Щучинск";

      case KazakhstanCity.Ekibastuz:
        return "Экибастуз";

      default:
        return new SplittedByWhitespacesString(KazakhstanCity[item]).value;
    }
  }
}
