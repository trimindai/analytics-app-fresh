export interface Profile {
  id: string;
  name: string;
  nameAr: string;
  icon: string;
  color: string;
  colorLight: string;
  industries: string[];
  industriesAr: string[];
  cardCount: number | null;
  dashboardCount: number | null;
  isPremium?: boolean;
  dashboards: Dashboard[];
}

export interface Dashboard {
  id: string;
  name: string;
  nameAr: string;
}

export interface KPI {
  id: string;
  title: string;
  titleAr: string;
  value: string | number;
  change: number;
  changeLabel: string;
  changeLabelAr: string;
  icon: string;
  trend: 'up' | 'down' | 'neutral';
  sparklineData?: number[];
}

export interface Insight {
  id: string;
  priority: 'high' | 'medium' | 'low';
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  source: string;
  module: string;
  confidence: number;
  actions?: string[];
}

export interface ChartData {
  id: string;
  title: string;
  titleAr: string;
  type: 'line' | 'bar' | 'pie' | 'donut' | 'area' | 'heatmap' | 'gauge' | 'funnel';
  data: any;
  source?: string;
  updatedAt?: string;
}

export interface DataSource {
  id: string;
  name: string;
  rows: number;
  type: 'xlsx' | 'csv' | 'json';
  uploadedAt: string;
}

export type Language = 'en' | 'ar';
