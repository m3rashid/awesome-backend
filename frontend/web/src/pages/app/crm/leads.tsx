import React, { useEffect, useState } from 'react';

import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const Leads: React.FC = () => {
  const [loads, setLeads] = useState<any | null>(null);

  const getLeads = async () => {
    const { data } = await service('/api/crm/leads', { method: 'POST' })({
      data: { searchCriteria: {} },
    });
    console.log({ data });
    setLeads(data);
  };

  useEffect(() => {
    getLeads().catch(console.log);
  }, []);

  return <PageContainer header={{ title: 'Leads' }}></PageContainer>;
};

export default Leads;
