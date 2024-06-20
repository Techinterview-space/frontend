import {
  ExpectationReplyType,
  UsefulnessReplyType,
} from "./salaries-survey.service";

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
  localExpectationPercentage: ExpectationPercentage[];
  remoteExpectationPercentage: ExpectationPercentage[];
}

export interface UsefulnessPercentage {
  replyType: UsefulnessReplyType;
  percentage: number;
}

export interface ExpectationPercentage {
  replyType: ExpectationReplyType;
  percentage: number;
}

export interface SurveyResultsByWeeksChartGradeItem {
  grade: number;
  localCount: number;
  remoteCount: number;
  totalCount: number;
  localUsefulnessPercentage: UsefulnessPercentage[];
  remoteUsefulnessPercentage: UsefulnessPercentage[];
  localExpectationPercentage: ExpectationPercentage[];
  remoteExpectationPercentage: ExpectationPercentage[];
}
