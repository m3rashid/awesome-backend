import dayjs from 'dayjs';
import {
  Avatar,
  Body1,
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Subtitle2Stronger,
  Tag,
  Textarea,
} from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Add20Regular } from '@fluentui/react-icons';

import useForm from '@awesome/shared/hooks/form';
import { service } from '@awesome/shared/utils/service';

import PageContainer from '../../../components/pageContainer';
import { useAuthValue } from '@awesome/shared/atoms/auth';

const Projects: React.FC = () => {
  const auth = useAuthValue();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [projects, setProjects] = useState<any | null>(null);

  const { onSubmit, form } = useForm<{ name: string; description: string }>({
    submitEndpoint: '/api/projects/create',
    onFinally: () => setDialogOpen(false),
    onSuccess: () => getProjects().catch(console.log),
    beforeSubmit: (data) => ({
      body: {
        ...data,
        projectOwnerId: auth?.user.id,
        members: [auth?.user],
      },
      resourceIndex: {
        name: data.name,
        resourceType: 'projects',
        description: data.description,
      },
    }),
  });

  const getProjects = async () => {
    const { data } = await service('/api/projects', { method: 'POST' })({
      data: {
        searchCriteria: { deleted: false },
        populate: ['ProjectOwner'],
      },
    });
    setProjects(data);
  };

  useEffect(() => {
    getProjects().catch(console.log);
  }, []);

  return (
    <PageContainer
      header={{
        title: 'All Projects',
        extra: (
          <Button
            appearance='primary'
            icon={<Add20Regular />}
            onClick={() => setDialogOpen(true)}
          >
            Create a new Project
          </Button>
        ),
      }}
    >
      <Dialog
        open={dialogOpen}
        onOpenChange={(_, { open }) => setDialogOpen(open)}
      >
        <DialogSurface>
          <form onSubmit={onSubmit}>
            <DialogBody>
              <DialogTitle>Create a new Project</DialogTitle>
              <DialogContent>
                <Field label='Project Name' required>
                  <Input {...form.register('name')} />
                </Field>

                <Field label='Description'>
                  <Textarea {...form.register('description')} />
                </Field>
              </DialogContent>

              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance='secondary'>Close</Button>
                </DialogTrigger>
                <Button appearance='primary' onClick={onSubmit}>
                  Create
                </Button>
              </DialogActions>
            </DialogBody>
          </form>
        </DialogSurface>
      </Dialog>

      <div className='flex gap-4'></div>
      {(projects?.docs || [])?.map((project: any) => (
        <Card key={project.id} className='w-[720px] max-w-full h-full'>
          <CardHeader
            image={
              <Avatar
                className='cursor-pointer'
                onClick={() =>
                  navigate(`/app/community/profile/${project.projectOwner.id}`)
                }
              />
            }
            header={
              <div className='flex justify-between w-full'>
                <Body1
                  onClick={() =>
                    navigate(
                      `/app/community/profile/${project.projectOwner.id}`
                    )
                  }
                >
                  <b className='cursor-pointer'>{project.projectOwner.name}</b>
                  &nbsp;&#x2022;&nbsp;
                  {dayjs(project.createdAt).fromNow()}
                </Body1>

                <Tag
                  size='extra-small'
                  style={{
                    backgroundColor: project.completed ? '#86efac' : '#fca5a5',
                  }}
                >
                  {project.completed ? 'Completed' : 'Under Development'}
                </Tag>
              </div>
            }
            description={<Caption1>{project.projectOwner.email}</Caption1>}
          />

          <div
            className='my-2 flex flex-col cursor-pointer'
            onClick={() => navigate(`/app/projects/${project.id}`)}
          >
            <Subtitle2Stronger>{project.name}</Subtitle2Stronger>
            <Body1>{project.description}</Body1>
          </div>

          <CardFooter>
            <Button
              disabled={project.completed}
              onClick={() => navigate(`/app/projects/${project.id}`)}
            >
              Go to Project
            </Button>
          </CardFooter>
        </Card>
      ))}
    </PageContainer>
  );
};

export default Projects;
