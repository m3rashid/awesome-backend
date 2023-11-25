export type DashboardBuilderMode = 'preview' | 'edit';

export type Widget = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

export type DashboardBuilder = {
  mode: DashboardBuilderMode;
  dashboardId: string;
  widgets: Widget[];
};

export const dashboardBuilderDefault: DashboardBuilder = {
  mode: 'edit',
  dashboardId: '',
  widgets: [],
};
