import { Button } from '@fluentui/react-components';
import { Add20Regular } from '@fluentui/react-icons';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import AddUpdateProjectTask from '../../../components/projects/addUpdateProjectTask';
import PageContainer from '../../../components/pageContainer';
import { service } from '@awesome/shared/utils/service';
import AddRemoveMembersToProject from '../../../components/projects/addRemoveMembers';

const ProjectTasks: React.FC = () => {
  const { projectId } = useParams();
  const [addUpdateProjectTaskDialogOpen, setAddUpdateProjectTaskDialogOpen] =
    useState(false);
  const [addOrRemoveMembersDialogOpen, setAddOrRemoveMembersDialogOpen] =
    useState(false);

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
          <div className='flex items-center gap-2'>
            <Button
              icon={<Add20Regular />}
              onClick={() => setAddUpdateProjectTaskDialogOpen(true)}
            >
              Create Task
            </Button>

            <Button onClick={() => setAddOrRemoveMembersDialogOpen(true)}>
              Add or Remove Members
            </Button>
          </div>
        ),
      }}
    >
      <AddUpdateProjectTask
        {...{
          getTasks,
          projectId: projectId!,
          dialogOpen: addUpdateProjectTaskDialogOpen,
          setDialogOpen: setAddUpdateProjectTaskDialogOpen,
        }}
      />

      <AddRemoveMembersToProject
        {...{
          dialogOpen: addOrRemoveMembersDialogOpen,
          setDialogOpen: setAddOrRemoveMembersDialogOpen,
          projectId: projectId!,
        }}
      />

      {/* show tasks kanban board */}
      {JSON.stringify(projectTasks, null, 2)}
    </PageContainer>
  );
};

export default ProjectTasks;
