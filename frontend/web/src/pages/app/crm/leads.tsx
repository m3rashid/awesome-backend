import React, { useEffect } from 'react';
import { Button } from '@fluentui/react-components';

import Board from '../../../components/crm/board';
import AddLead from '../../../components/crm/addLead';
import useLeads from '../../../components/crm/useLeads';
import PageContainer from '../../../components/pageContainer';

const Leads: React.FC = () => {
  const { getLeads, setAddEditModalOpen } = useLeads();

  useEffect(() => {
    getLeads().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      header={{
        title: 'Leads',
        extra: (
          <Button onClick={() => setAddEditModalOpen(true)}>Add Lead</Button>
        ),
      }}
    >
      <Board />
      <AddLead />
    </PageContainer>
  );
};

export default Leads;
