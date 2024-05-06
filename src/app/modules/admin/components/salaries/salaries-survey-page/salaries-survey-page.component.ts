import { formatNumber } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { ExpectationReplyType, SalariesSurveyStatData, SalariesSurveyStatDataItem, SurveyService, UsefulnessReplyType } from "@services/salaries-survey.service";
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

  colorsByUsefulness: Map<
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
      cssBackground: "bg-secondary",
      cssText: "",
    }],
    [UsefulnessReplyType.NotSure, {
      label: "Не уверен",
      cssBackground: "bg-warning",
      cssText: "text-dark",
    }],
  ]);

  colorsByExpectation: Map<
    ExpectationReplyType,
    ProgressBarColorData
    > = new Map([
    [ExpectationReplyType.Expected, {
        label: "Ожидаемо",
        cssBackground: "bg-light",
        cssText: "text-dark",
      }
    ],
    [ExpectationReplyType.MoreThanExpected, {
      label: "Выше ожидаемого",
      cssBackground: "bg-success",
      cssText: "",
    }],
    [ExpectationReplyType.LessThanExpected, {
      label: "Ьутьшу ожидаемого",
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
  }

  ngOnInit(): void {
    this.data = null;
    this.service
      .getSalariesStatSurveyData()
      .pipe(untilDestroyed(this))
      .subscribe((x) => {
        this.data = x;
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

    this.progressBarForUsefullness = this.prepareData(
      this.data.usefulnessData,
      this.data.countOfRecords,
      this.showPercents
    );

    this.progressBarForExpectation = this.prepareData(
      this.data.expectationData,
      this.data.countOfRecords,
      this.showPercents
    );
  }

  private prepareData(
    dictionary: Map<UsefulnessReplyType | ExpectationReplyType, SalariesSurveyStatDataItem>,
    totalCount: number,
    showPercents: boolean
  ): Array<ProgressBarData> {

    var result: Array<ProgressBarData> = [];
    dictionary
      .forEach((item, index) => {

        let cssBackground = "";
        let cssText = "";
        let label = "";

        if (this.isInstance(index, UsefulnessReplyType)) {
          const usefulnessColorData = this.colorsByUsefulness.get(index as UsefulnessReplyType) ?? SalariesSurveyPageComponent.defaultColor;
          cssBackground = usefulnessColorData.cssBackground;
          cssText = usefulnessColorData.cssText;
          label = usefulnessColorData.label;
        } else if (this.isInstance(index, ExpectationReplyType)) {

          const expectationColorData = this.colorsByExpectation.get(index as ExpectationReplyType) ?? SalariesSurveyPageComponent.defaultColor;
          cssBackground = expectationColorData.cssBackground;
          cssText = expectationColorData.cssText;
          label = expectationColorData.label;
        }

        const value = showPercents
          ? formatNumber(item.partitionInPercent, "en-US", "1.0-2") + "%"
          : formatNumber(item.countOfReplies, "en-US", "1.0-0");

        const maxValue = showPercents
          ? "100"
          : formatNumber(totalCount, "en-US", "1.0-0");

        result.push({
          color: cssBackground,
          textColor: cssText,
          value: value,
          maxValue: maxValue,
          width: item.partitionInPercent,
          label: label,
        });
      });

    return result;
  }

  // TODO mgorbatyuk: move to utils
  private isInstance<T extends object>(value: string | number, type: T): type is T {
    return Object.values(type).includes(value)
  }
}
