import { Person20Regular } from '@fluentui/react-icons';
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
  model: Record<string, string> | null;
};

export const dataIngestorDefault: DataIngestor = {
  step: 0,
  model: null,
};

export const dataModelSteps: Record<DataIngestorStep, any> = {
  Choose: ['Choose Data Model', Person20Regular],
  Upload: ['Upload File', Person20Regular],
  Map: ['Map Data Items', Person20Regular],
  Validate: ['Validate Data', Person20Regular],
  Confirm: ['Confirm and ingest data', Person20Regular],
};
