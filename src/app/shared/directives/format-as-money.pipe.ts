import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "formatAsMoney",
})
export class FormatAsMoneyPipe implements PipeTransform {
  transform(value: number | null, fractionSize: number = 2): string {
    return FormatAsMoneyPipe.formatNumber(value, fractionSize);
  }

  public static formatNumber(
    value: number | null | undefined,
    fractionSize: number = 2
  ): string {
    if (value == null) {
      return "";
    }

    return value.toFixed(fractionSize).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }
}
