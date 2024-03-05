import React, { useEffect, useState } from 'react';
import PageContainer from '../../../components/pageContainer';
import { Button } from '@fluentui/react-components';
import { service } from '@awesome/shared/utils/service';

export type WorkflowsProps = {
  //
};

const Workflows: React.FC<WorkflowsProps> = () => {
  const [workflows, setWorkflows] =
    useState<PaginatedResponse<Workflow> | null>(null);
  const createWorkflow = () => {};

  const getWorkflows = async () => {
    const { data } = await service<PaginatedResponse<Workflow>>(
      '/api/workflow',
      { method: 'POST' }
    )({ data: { searchCriteria: {}, populate: [] } });
    setWorkflows(data);
  };

  useEffect(() => {
    getWorkflows().catch(console.log);
  }, []);

  return (
    <PageContainer
      header={{
        title: 'Workflows',
        extra: <Button onClick={createWorkflow}>Create Workflow</Button>,
      }}
    >
      {JSON.stringify(workflows, null, 2)}
    </PageContainer>
  );
};

export default Workflows;
