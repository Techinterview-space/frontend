export class EnumHelper {
  static getValues(enumType: any): Array<number> {
    return Object.keys(enumType)
      .map((key) => enumType[key])
      .filter((value) => typeof value === "number");
  }

  static getNames(enumType: any): Array<string> {
    return Object.keys(enumType)
      .map((key) => enumType[key])
      .filter((value) => typeof value === "string");
  }
}
