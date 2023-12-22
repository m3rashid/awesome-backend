import React, { useEffect, useState } from 'react';

import PageContainer from '../../../components/pageContainer';
import Board, { BoardItems } from '../../../components/crm/board';
import { Button } from '@fluentui/react-components';
import AddLead from '../../../components/crm/addLead';
import { Lead, leadStatus } from '@awesome/shared/types/crm';
import { service } from '@awesome/shared-web/utils/service';
import { PaginatedResponse } from '@awesome/shared/types/base';

const Leads: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<BoardItems>(
    leadStatus.reduce<BoardItems>(
      (acc, status) => ({ ...acc, [status]: [] }),
      {} as BoardItems
    )
  );

  const getLeads = async () => {
    const { data } = await service<PaginatedResponse<Lead>>('/api/crm/leads', {
      method: 'POST',
    })({ data: { searchCriteria: {} } });
    const filtered = data.docs.reduce<BoardItems>(
      (acc, lead) => ({ ...acc, [lead.status]: [...acc[lead.status], lead] }),
      {
        done: [],
        in_progress: [],
        todo: [],
        backlog: [],
        blocked: [],
        review: [],
      }
    );
    setItems(filtered);
  };

  useEffect(() => {
    getLeads().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      header={{
        title: 'Leads',
        extra: <Button onClick={() => setOpen(true)}>Add Lead</Button>,
      }}
    >
      <Board {...{ items, setItems }} />

      <AddLead {...{ open, setOpen, onSuccess: getLeads }} />
    </PageContainer>
  );
};

export default Leads;
