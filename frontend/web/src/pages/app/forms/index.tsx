import dayjs from 'dayjs';
import {
  Avatar,
  Body1,
  Button,
  Caption1,
  Card,
  CardFooter,
  CardHeader,
  Checkbox,
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
import { Add20Regular, Edit20Regular } from '@fluentui/react-icons';

import useForm from '@awesome/shared/hooks/form';
import { service } from '@awesome/shared/utils/service';
import { useAuthValue } from '@awesome/shared/atoms/auth';

import PageContainer from '../../../components/pageContainer';

const Forms: React.FC = () => {
  const auth = useAuthValue();
  const navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [forms, setForms] = useState<any | null>(null);

  const { form, onSubmit } = useForm<{
    title: string;
    description: string;
    authRequired: boolean;
  }>({
    submitEndpoint: '/api/forms/create',
    onFinally: () => setDialogOpen(false),
    onSuccess: () => getForms().catch(console.log),
    beforeSubmit: (values) => ({
      body: {
        ...values,
        jsonSchema: '{}',
        createdById: auth?.user.id,
        authRequired: values.authRequired ?? false,
      },
      resourceIndex: {
        name: values.title,
        resourceType: 'forms',
      },
    }),
  });

  const getForms = async () => {
    const { data } = await service('/api/forms', { method: 'POST' })({
      data: {
        searchCriteria: { deleted: false },
        populate: ['CreatedBy'],
      },
    });
    setForms(data);
  };

  useEffect(() => {
    getForms().catch(console.log);
  }, []);

  return (
    <PageContainer
      header={{
        title: 'Forms',
        extra: (
          <Button
            appearance='primary'
            icon={<Add20Regular />}
            onClick={() => setDialogOpen(true)}
          >
            Create Form
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
              <DialogTitle>Create a new Form</DialogTitle>
              <DialogContent>
                <Field label='Title' required>
                  <Input {...form.register('title')} />
                </Field>

                <Field label='Description'>
                  <Textarea {...form.register('description')} />
                </Field>

                <Field>
                  <Checkbox
                    defaultChecked
                    label='Auth Required ?'
                    {...form.register('authRequired')}
                  />
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

      <div className='flex gap-4 flex-wrap'>
        {(forms?.docs || []).map((form: any) => {
          return (
            <Card key={form.id} className='w-[720px] max-w-full h-full'>
              <CardHeader
                image={
                  <Avatar
                    className='cursor-pointer'
                    onClick={() =>
                      navigate(`/app/community/profile/${form.createdBy.id}`)
                    }
                  />
                }
                header={
                  <div className='flex justify-between w-full'>
                    <Body1>
                      <b
                        className='cursor-pointer'
                        onClick={() =>
                          navigate(
                            `/app/community/profile/${form.createdBy.id}`
                          )
                        }
                      >
                        {form.createdBy.name}
                      </b>
                      &nbsp;&#x2022;&nbsp;
                      {dayjs(form.createdAt).fromNow()}
                    </Body1>

                    <Tag
                      size='extra-small'
                      style={{
                        backgroundColor: form.published ? '#86efac' : '#fca5a5',
                      }}
                    >
                      {form.published ? 'Published' : 'Not Published'}
                    </Tag>
                  </div>
                }
                description={<Caption1>{form.createdBy.email}</Caption1>}
              />

              <div className='my-2 flex flex-col'>
                <Subtitle2Stronger>{form.title}</Subtitle2Stronger>
                <Body1>{form.description}</Body1>
              </div>

              <CardFooter>
                <Button
                  icon={<Edit20Regular />}
                  disabled={form.published}
                  onClick={() => navigate(`/app/forms/${form.id}/builder`)}
                >
                  Edit Form
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Forms;
