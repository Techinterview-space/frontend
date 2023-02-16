export interface HealthReport {
  status: string;
  errors: Array<KeyValue>;
}

export interface KeyValue {
  key: string;
  value: string;
}
