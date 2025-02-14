export interface HistoricalSurveyChartResponse {
  surveyResultsByWeeksChart: SurveyResultsByWeeksChart;
  shouldAddOwnSalary: boolean;
  hasAuthentication: boolean;
  from: Date;
  to: Date;
  chartFrom: Date;
  chartTo: Date;
  hasRecentSurveyReply: boolean;
}

export interface SurveyResultsByWeeksChart {
  weekEnds: Date[];
  items: SurveyResultsByWeeksChartItem[];
  gradeItems: SurveyResultsByWeeksChartGradeItem[];
  hasGradeItems: boolean;
}

export interface SurveyResultsByWeeksChartItem {
  totalCount: number;
  localUsefulnessPercentage: UsefulnessPercentage[];
  remoteUsefulnessPercentage: UsefulnessPercentage[];
}

export interface UsefulnessPercentage {
  ratingValue: number;
  percentage: number;
}

export interface SurveyResultsByWeeksChartGradeItem {
  grade: number;
  localCount: number;
  remoteCount: number;
  totalCount: number;
  localUsefulnessPercentage: UsefulnessPercentage[];
  remoteUsefulnessPercentage: UsefulnessPercentage[];
}
