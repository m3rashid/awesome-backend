import { atom, useRecoilState } from 'recoil';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import { DataIngestor, dataIngestorStep } from '../constants/dataIngestion';

const dataIngestorDefault: DataIngestor = {
  step: 0,
};

const dataIngestorAtom = atom<DataIngestor>({
  key: 'dataIngestor',
  default: dataIngestorDefault,
});

const useDataIngestion = () => {
  const [dataIngestor, setDataIngestor] = useRecoilState(dataIngestorAtom);
  const [currentStep] = useQueryParams({
    step: withDefault(StringParam, dataIngestorStep[dataIngestor.step]),
  });

  const changeStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex > dataIngestorStep.length - 1) return;
    setDataIngestor((p) => ({ ...p, step: stepIndex }));
  };

  return {
    dataIngestor,
    changeStep,
  };
};

export default useDataIngestion;
