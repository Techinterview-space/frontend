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
  localChartItems: number[];
  remoteChartItems: number[];
}
