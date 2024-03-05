import React, { useEffect } from 'react';

import PageContainer from '../../../components/pageContainer';
import { useParams } from 'react-router-dom';
import { service } from '@awesome/shared/utils/service';

const LeadDetails: React.FC = () => {
  const { leadId } = useParams();

  const getLeadDetails = async () => {
    if (!leadId || isNaN(Number(leadId))) {
      console.log('No id or id is not a number');
      return;
    }
    const getLead = service<Lead>('/api/crm/leads/get', { method: 'POST' })({
      data: { searchCriteria: { id: Number(leadId) } },
    });
    const getLeadTasks = service<PaginatedResponse<LeadTask>>(
      '/api/crm/tasks',
      { method: 'POST' }
    )({ data: { searchCriteria: { leadId: Number(leadId) } } });
    const getLeadTimeline = service<PaginatedResponse<LeadTimelineEvent>>(
      '/api/crm/events',
      { method: 'POST' }
    )({ data: { searchCriteria: { leadId: Number(leadId) } } });

    const [lead, tasks, timeline] = await Promise.allSettled([
      getLead,
      getLeadTasks,
      getLeadTimeline,
    ]);
    console.log({ lead, tasks, timeline });
  };

  useEffect(() => {
    getLeadDetails().catch(console.log);
  }, []);

  return (
    <PageContainer>
      <div>LeadDetails</div>
    </PageContainer>
  );
};

export default LeadDetails;
