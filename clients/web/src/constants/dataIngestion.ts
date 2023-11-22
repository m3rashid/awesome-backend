import { UserOutlined } from '@ant-design/icons';

export const ingestibleDataModels = ['users', 'usergroups'];

export const dataIngestorStep = [
  'Choose',
  'Upload',
  'Map',
  'Validate',
  'Confirm',
] as const;

export type DataIngestorStep = (typeof dataIngestorStep)[number];

export type DataIngestor = {
  step: number;
};

export const dataModelSteps: Record<DataIngestorStep, any> = {
  Choose: ['Choose Data Model', UserOutlined],
  Upload: ['Upload File', UserOutlined],
  Map: ['Map Data Items', UserOutlined],
  Validate: ['Validate Data', UserOutlined],
  Confirm: ['Confirm and ingest data', UserOutlined],
};
