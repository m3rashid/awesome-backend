import { Select, Steps, theme } from 'antd';
import _ from 'lodash-es';
import React from 'react';

import PageContainer from '../../../components/pageContainer';
import {
  dataIngestorStep,
  dataModelSteps,
  ingestibleDataModels,
} from '../../../constants/dataIngestion';
import useDataIngestion from '../../../hooks/dataIngestion';

const DataIngestor: React.FC = () => {
  const { token } = theme.useToken();
  const { dataIngestor, changeStep } = useDataIngestion();

  return (
    <PageContainer header={{ title: 'Data Ingestor' }}>
      <div className='flex gap-4'>
        <div className='w-[250px] bg-white p-4 pl-2 rounded-sm h-full'>
          <Steps
            direction='vertical'
            onChange={changeStep}
            current={dataIngestor.step}
            items={Object.entries(dataModelSteps).map(
              ([title, [description, Icon]], stepIndex) => ({
                title,
                key: title,
                description,
                icon: (
                  <Icon
                    style={{
                      padding: 8,
                      fontSize: 16,
                      borderRadius: 16,
                      color:
                        stepIndex === dataIngestor.step ? 'white' : 'black',
                      backgroundColor:
                        stepIndex === dataIngestor.step
                          ? token.colorPrimary
                          : 'white',
                    }}
                  />
                ),
              })
            )}
          />
        </div>

        <div className='bg-white px-2 py-4 rounded-sm w-full'>
          <Select
            placeholder='Select a data model'
            options={ingestibleDataModels.map((modelName) => ({
              value: modelName,
              label: _.startCase(modelName),
            }))}
          />
        </div>
      </div>
      {/* choose data model to ingest */}
      {/* upload the xlsx file */}
      {/* map the data items */}
      {/* validate the data */}
      {/* confirm */}
    </PageContainer>
  );
};

export default DataIngestor;
