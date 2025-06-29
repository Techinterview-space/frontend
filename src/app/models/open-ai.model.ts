export interface OpenAiBodyReportMetadata {
  reportDate: string;
  currency: string;
  periodType: string;
}

export interface OpenAiBodyReportRoleSalaryData {
  average: number;
  median: number;
  min: number | null;
  max: number | null;
  count: number;
}

export interface OpenAiBodyReportRoleHistoricalData {
  date: string;
  average: number;
  percentChange: number;
}

export interface OpenAiBodyReportRole {
  roleName: string;
  currentSalary: OpenAiBodyReportRoleSalaryData;
  historicalData: Array<OpenAiBodyReportRoleHistoricalData>;
}

export interface OpenAiReport {
  reportMetadata: OpenAiBodyReportMetadata;
  roles: Array<OpenAiBodyReportRole>;
}

export interface OpenAiAnalysis {
  analysis: string;
  bearer: string;
  report: OpenAiReport;
}

export interface OpenAiChatChoise {
  message: {
    role: string;
    content: string;
  };
}

export interface OpenAiChatResult {
  isSuccess: boolean;
  choises: Array<OpenAiChatChoise>;
}
