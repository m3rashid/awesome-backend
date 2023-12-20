import { Button } from '@fluentui/react-components';
import { Add20Regular } from '@fluentui/react-icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddUpdateProjectTask from '../../../components/atoms/addUpdateProjectTask';
import PageContainer from '../../../components/pageContainer';
import { service } from '@awesome/shared-web/utils/service';

const ProjectTasks: React.FC = () => {
  const { projectId } = useParams();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [project, setProject] = useState<any | null>(null);
  const [projectTasks, setProjectTasks] = useState<any | null>(null);

  const getTasks = async (id: string) => {
    const { data } = await service('/api/projects/tasks', { method: 'POST' })({
      data: { searCriteria: { projectId: Number(id) } },
    });
    setProjectTasks(data);
  };

  const getProject = async (id: string) => {
    const { data } = await service('/api/projects/get', { method: 'POST' })({
      data: { searCriteria: { id: Number(id) } },
    });
    setProject(data);
  };

  useEffect(() => {
    if (!projectId || isNaN(Number(projectId))) return;
    Promise.allSettled([getProject(projectId), getTasks(projectId)]).catch(
      console.log
    );
  }, [projectId]);

  if (!project) return null;

  return (
    <PageContainer
      header={{
        title: project.name,
        extra: (
          <Button
            appearance='primary'
            icon={<Add20Regular />}
            onClick={() => setDialogOpen(true)}
          >
            Create a new Task
          </Button>
        ),
      }}
    >
      <AddUpdateProjectTask
        {...{ dialogOpen, getTasks, projectId: projectId!, setDialogOpen }}
      />

      {/* show tasks kanban board */}
      {JSON.stringify(projectTasks, null, 2)}
    </PageContainer>
  );
};

export default ProjectTasks;
