import { Component, OnDestroy, OnInit } from "@angular/core";
import { JsonLdService } from "@services/json-ld.service";
import { MetaTagService } from "@services/meta-tags.service";
import { TitleService } from "@services/title.service";
import {
  SalariesChartResponse,
  SalariesByGrade,
  GradeBoxPlotData,
  SalariesByCityChart,
  SalariesByAgeOrExperienceChart,
  ProfessionDistributionData,
  GenderDistributionData,
  SalariesSkillsChartData,
  WorkIndustriesChartData,
  UserSalariesService,
} from "@services/user-salaries.service";
import { untilDestroyed } from "@shared/subscriptions/until-destroyed";
import { FormatAsMoneyPipe } from "@shared/directives/format-as-money.pipe";
import {
  DeveloperGrade,
  DeveloperGradeEnum,
} from "@models/enums/developer-grade.enum";
import { Gender, GenderEnum } from "@models/enums/gender.enum";

@Component({
  templateUrl: "./salaries-overview.component.html",
  styleUrls: ["./salaries-overview.component.scss"],
  standalone: false,
})
export class SalariesOverviewComponent implements OnInit, OnDestroy {
  data: SalariesChartResponse | null = null;
  currentDate: string = new Date().toISOString().split("T")[0];

  constructor(
    private readonly salariesService: UserSalariesService,
    private readonly metaTagService: MetaTagService,
    private readonly jsonLdService: JsonLdService,
    private readonly title: TitleService,
  ) {
    this.metaTagService.setPageMetaTags(
      "IT Salaries in Kazakhstan",
      "Salary statistics for IT professionals in Kazakhstan. Compare salaries by grade, profession, city, and company. Data collected via anonymous surveys.",
      "/salaries/overview",
      MetaTagService.DEFAULT_IMAGE_URL,
    );

    this.jsonLdService.setDatasetSchema(
      "IT Salaries in Kazakhstan — Techinterview.space",
      "Salary statistics for IT professionals in Kazakhstan, collected via anonymous surveys",
      "https://techinterview.space/salaries/overview",
      new Date().toISOString().split("T")[0],
    );
  }

  ngOnInit(): void {
    this.salariesService
      .charts({
        grade: null,
        profsInclude: null,
        cities: null,
        skills: null,
        salarySourceTypes: [],
        quarterTo: null,
        yearTo: null,
        allowReadonly: true,
      })
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.data = data;
      });
  }

  ngOnDestroy(): void {
    this.metaTagService.returnDefaultMetaTags();
    this.jsonLdService.removeAll();
    this.title.resetTitle();
  }

  formatMoney(value: number | null): string {
    return FormatAsMoneyPipe.formatNumber(value, 0);
  }

  gradeLabel(grade: DeveloperGrade): string {
    return DeveloperGradeEnum.getColorData(grade)?.label ?? "Unknown";
  }

  genderLabel(gender: Gender): string {
    return GenderEnum.label(gender);
  }

  get localGrades(): SalariesByGrade[] {
    return this.data?.localSalariesByGrade ?? [];
  }

  get remoteGrades(): SalariesByGrade[] {
    return this.data?.remoteSalariesByGrade ?? [];
  }

  get localBoxPlot(): GradeBoxPlotData[] {
    return this.data?.gradesMinMaxChartData?.localData ?? [];
  }

  get remoteBoxPlot(): GradeBoxPlotData[] {
    return this.data?.gradesMinMaxChartData?.remoteData ?? [];
  }

  get cityChartLocal(): SalariesByCityChart | null {
    return this.data?.salariesByCityChartForLocal ?? null;
  }

  get experienceChartLocal(): SalariesByAgeOrExperienceChart | null {
    return this.data?.salariesByExperienceChartForLocalSalaries ?? null;
  }

  get ageChartLocal(): SalariesByAgeOrExperienceChart | null {
    return this.data?.salariesByUserAgeChartForLocalSalaries ?? null;
  }

  get professionsLocal(): ProfessionDistributionData | null {
    return this.data?.professionsDistributionChartData?.localData ?? null;
  }

  get skillsData(): SalariesSkillsChartData | null {
    return this.data?.salariesSkillsChartData ?? null;
  }

  get industriesData(): WorkIndustriesChartData | null {
    return this.data?.workIndustriesChartData ?? null;
  }

  get genderLocal(): GenderDistributionData | null {
    return this.data?.peopleByGenderChartData?.localData ?? null;
  }
}
