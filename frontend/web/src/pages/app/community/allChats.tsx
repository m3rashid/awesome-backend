import {
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogBody,
  DialogContent,
  DialogSurface,
  DialogTitle,
  DialogTrigger,
  Field,
  Input,
  Textarea,
} from '@fluentui/react-components';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Add20Regular } from '@fluentui/react-icons';

import useForm from '@awesome/shared/hooks/form';
import { service } from '@awesome/shared/utils/service';
import { useAuthValue } from '@awesome/shared/atoms/auth';

import PageContainer from '../../../components/pageContainer';

const AllChats: React.FC = () => {
  const auth = useAuthValue();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [groups, setGroups] = useState<any | null>(null);

  const { onSubmit, form } = useForm<{ name: string; description: string }>({
    submitEndpoint: '/api/community/groups/create',
    onFinally: () => setDialogOpen(false),
    onSuccess: () => getAllUserChats().catch(console.log),
    beforeSubmit: (data) => ({
      body: { ...data, members: [auth?.user], createdById: auth?.user.id },
      resourceIndex: {
        name: data.name,
        description: data.description,
        resourceType: 'community_groups',
      },
    }),
  });

  const getAllUserChats = async () => {
    const { data } = await service('/api/community/groups', { method: 'POST' })(
      { data: { searchCriteria: { userId: auth?.user.id } } }
    );
    setGroups(data);
  };

  useEffect(() => {
    getAllUserChats().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      header={{
        title: 'Your Chats',
        extra: (
          <div className='flex gap-4'>
            <Button
              appearance='primary'
              icon={<Add20Regular />}
              onClick={() => setDialogOpen(true)}
            >
              Create a group
            </Button>

            <Button appearance='primary' icon={<Add20Regular />}>
              New Chat
            </Button>
          </div>
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
              <DialogTitle>Create a new Group</DialogTitle>
              <DialogContent>
                <Field label='Group Name' required>
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

      <div className='flex'>
        {(groups?.docs || []).map((group: any) => {
          return (
            <Card
              key={group.id}
              className='w-[720px] max-w-full'
              onClick={() => navigate(`/app/community/chats/${group.id}`)}
            >
              <p>{group.name}</p>
              <p>{group.description}</p>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default AllChats;
