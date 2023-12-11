import { useAuthValue } from '@awesome/shared/atoms/auth';
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
  Select,
  Subtitle2Stronger,
  Tag,
  Textarea,
} from '@fluentui/react-components';
import { Add20Regular } from '@fluentui/react-icons';
import React, { useEffect, useState } from 'react';

import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';
import useForm from '../../../hooks/form';

const AllChats: React.FC = () => {
  const auth = useAuthValue();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { onSubmit, form } = useForm<{ name: string; description: string }>({
    submitEndpoint: '/api/community/groups/create',
    beforeSubmit: (data) => ({
      body: { ...data, members: [], createdById: auth?.user.id },
      resourceIndex: {
        name: data.name,
        description: data.description,
        resourceType: 'community_groups',
      },
    }),
  });

  const getAllUserChats = async () => {
    const { data } = await service('/api/community/groups', { method: 'POST' })(
      {
        data: {
          searchCriteria: {
            members: auth?.user.id,
          },
          populate: ['Members'],
        },
      }
    );
    console.log(data);
  };

  useEffect(() => {
    getAllUserChats().catch(console.log);
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
    </PageContainer>
  );
};

export default AllChats;
