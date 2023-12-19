import { atom, useRecoilState } from 'recoil';
import { StringParam, useQueryParams, withDefault } from 'use-query-params';

import {
  DataIngestor,
  dataIngestorDefault,
  dataIngestorStep,
} from '../constants/dataIngestion';

const dataIngestorAtom = atom<DataIngestor>({
  key: 'dataIngestor',
  default: dataIngestorDefault,
});

const useDataIngestion = () => {
  const [dataIngestor, setDataIngestor] = useRecoilState(dataIngestorAtom);
  const [currentStep] = useQueryParams({
    step: withDefault(StringParam, dataIngestorStep[dataIngestor.step]),
  });

  console.log(currentStep);

  const changeStep = (stepIndex: number) => {
    if (stepIndex < 0 || stepIndex > dataIngestorStep.length - 1) return;
    setDataIngestor((p) => ({ ...p, step: stepIndex }));
  };

  const changeDataModel = (model: Record<string, string>) => {
    setDataIngestor({ ...dataIngestorDefault, model });
  };

  return {
    dataIngestor,
    changeStep,
    changeDataModel,
  };
};

export default useDataIngestion;
