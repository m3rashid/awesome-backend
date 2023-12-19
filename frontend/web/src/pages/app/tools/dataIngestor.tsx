import React from 'react';

import PageContainer from '../../../components/pageContainer';

const DataIngestor: React.FC = () => {
  return (
    <PageContainer header={{ title: 'Data Ingestor' }}>
      <div className='flex gap-4'>
        <div className='w-[250px] bg-white p-4 pl-2 rounded-sm h-full'></div>

        <div className='bg-white px-2 py-4 rounded-sm w-full'></div>
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
