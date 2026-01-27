export interface MetricData {
  label: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: string;
}

export interface ChartDataPoint {
  name: string;
  [key: string]: string | number;
}

export interface CategoryData extends ChartDataPoint {
  name: string;
  value: number;
  color: string;
  [key: string]: string | number;
}