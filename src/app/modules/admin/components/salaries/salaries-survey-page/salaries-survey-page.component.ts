import { formatNumber } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ExpectationReplyType, SalariesSurveyReplyDataItem, SalariesSurveyStatData, SurveyService, UsefulnessReplyType } from "@services/salaries-survey.service";
import { TitleService } from "@services/title.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";

interface ProgressBarData {
  color: string;
  textColor: string;
  value: string;
  width: number;
  maxValue: string;
  label: string;
}

interface ProgressBarColorData {
  label: string;
  cssBackground: string;
  cssText: string;
}

@Component({
  templateUrl: "./salaries-survey-page.component.html",
  styleUrl: "./salaries-survey-page.component.scss",
})
export class SalariesSurveyPageComponent implements OnInit, OnDestroy {

  static readonly defaultColor: ProgressBarColorData = {
    label: "Нет данных",
    cssBackground: "bg-light",
    cssText: "-text-dark",
  };

  readonly usefullnesLegendItems: Array<ProgressBarColorData>;
  readonly expectationLegendItems: Array<ProgressBarColorData>;

  static readonly colorsByUsefulness: Map<
    UsefulnessReplyType,
    ProgressBarColorData
  > = new Map([
    [UsefulnessReplyType.Yes, {
        label: "Да",
        cssBackground: "bg-success",
        cssText: "",
      }
    ],
    [UsefulnessReplyType.No, {
      label: "Нет",
      cssBackground: "bg-warning",
      cssText: "text-dark",
    }],
    [UsefulnessReplyType.NotSure, {
      label: "Не уверен",
      cssBackground: "bg-light border border-2",
      cssText: "text-dark",
    }],
  ]);

  static readonly colorsByExpectation: Map<
    ExpectationReplyType,
    ProgressBarColorData
    > = new Map([
    [ExpectationReplyType.Expected, {
        label: "Ожидаемо",
        cssBackground: "bg-info",
        cssText: "text-dark",
      }
    ],
    [ExpectationReplyType.MoreThanExpected, {
      label: "Выше ожидаемого",
      cssBackground: "bg-success",
      cssText: "",
    }],
    [ExpectationReplyType.LessThanExpected, {
      label: "Ниже ожидаемого",
      cssBackground: "bg-warning",
      cssText: "text-dark",
    }],
  ]);

  data: SalariesSurveyStatData | null = null;

  progressBarForUsefullness: Array<ProgressBarData> | null = null;
  progressBarForExpectation: Array<ProgressBarData> | null = null;

  showPercents = true;

  constructor(
    private readonly service: SurveyService,
    private readonly titleService: TitleService
  ) {
    this.titleService.setTitle("Результаты опроса о пользе статистики");

    this.usefullnesLegendItems = [
      SalariesSurveyPageComponent.colorsByUsefulness.get(UsefulnessReplyType.Yes) ?? SalariesSurveyPageComponent.defaultColor,
      SalariesSurveyPageComponent.colorsByUsefulness.get(UsefulnessReplyType.No) ?? SalariesSurveyPageComponent.defaultColor,
      SalariesSurveyPageComponent.colorsByUsefulness.get(UsefulnessReplyType.NotSure) ?? SalariesSurveyPageComponent.defaultColor,
    ];

    this.expectationLegendItems = [
      SalariesSurveyPageComponent.colorsByExpectation.get(ExpectationReplyType.Expected) ?? SalariesSurveyPageComponent.defaultColor,
      SalariesSurveyPageComponent.colorsByExpectation.get(ExpectationReplyType.MoreThanExpected) ?? SalariesSurveyPageComponent.defaultColor,
      SalariesSurveyPageComponent.colorsByExpectation.get(ExpectationReplyType.LessThanExpected) ?? SalariesSurveyPageComponent.defaultColor,
    ];

    console.log(this.usefullnesLegendItems);
    console.log(this.expectationLegendItems);
  }

  ngOnInit(): void {
    this.data = null;
    this.service
      .getSalariesStatSurveyData()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.data = x;
        this.initCharts();
      });
  }

  ngOnDestroy(): void {
    // ignored
  }

  toggleCountAndPercent(): void {
    this.showPercents = !this.showPercents;
    this.initCharts();
  }

  private initCharts(): void {
    if (this.data == null) {
      return;
    }

    this.progressBarForUsefullness = this.prepareData<UsefulnessReplyType>(
      this.data.usefulnessData,
      this.data.countOfRecords,
      this.showPercents,
      (replyType) => {
        const colorData = SalariesSurveyPageComponent.colorsByUsefulness.get(replyType);
        return colorData ?? SalariesSurveyPageComponent.defaultColor;
      }
    );

    this.progressBarForExpectation = this.prepareData<ExpectationReplyType>(
      this.data.expectationData,
      this.data.countOfRecords,
      this.showPercents,
      (replyType) => {
        const colorData = SalariesSurveyPageComponent.colorsByExpectation.get(replyType);
        return colorData ?? SalariesSurveyPageComponent.defaultColor;
      }
    );
  }

  private prepareData<TEnum>(
    data: Array<SalariesSurveyReplyDataItem<TEnum>>,
    totalCount: number,
    showPercents: boolean,
    giveColorData: (replyType: TEnum) => ProgressBarColorData
  ): Array<ProgressBarData> {

    var result: Array<ProgressBarData> = [];
    data
      .forEach((item, index) => {

        const colorData = giveColorData(item.replyType);
        const value = showPercents
          ? formatNumber(item.data.partitionInPercent, "en-US", "1.0-2") + "%"
          : formatNumber(item.data.countOfReplies, "en-US", "1.0-0");

        const maxValue = showPercents
          ? "100"
          : formatNumber(totalCount, "en-US", "1.0-0");

        result.push({
          color: colorData.cssBackground,
          textColor: colorData.cssText,
          value: value,
          maxValue: maxValue,
          width: item.data.partitionInPercent,
          label: colorData.label,
        });
      });

    return result;
  }
}
