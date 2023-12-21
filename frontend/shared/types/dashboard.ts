import { BaseSchema, SqlID } from './base';

// TODO
export const dashboardWidgetChartType = ['line', 'bar', 'pie'] as const;
export type DashboardWidget = BaseSchema & {
  name: string;
  xField: string;
  yField: string;
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  chartType: (typeof dashboardWidgetChartType)[number];
  dashboardId: SqlID;
  dashboard?: Dashboard;
};

export const dashboardStatsu = ['draft', 'published'] as const;
export type Dashboard = BaseSchema & {
  name: string;
  description?: string;
  status: (typeof dashboardStatsu)[number];
};
