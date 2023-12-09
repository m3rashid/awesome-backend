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
  Link,
  Spinner,
} from '@fluentui/react-components';
import { Add20Regular } from '@fluentui/react-icons';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';
import useForm from '../../../hooks/form';

const Topics: React.FC = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [topics, setTopics] = useState<any | null>(null);

  const getTopicsService = service('/api/community/topics', { method: 'POST' });

  const { loading, onSubmit, form } = useForm<{ name: string }>({
    submitEndpoint: '/api/community/topics/create',
    onFinally: () => {
      setOpenModal(false);
      getTopics().catch(console.log);
    },
  });

  const getTopics = async () => {
    const response = await getTopicsService({
      data: {
        searchCriteria: { deleted: false },
        paginationOptions: { limit: 20, page: 1 },
      },
    });
    setTopics(response.data);
  };

  useEffect(() => {
    getTopics().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer
      header={{
        title: 'Community Topics',
        extra: (
          <DialogTrigger disableButtonEnhancement>
            <Button
              appearance='primary'
              icon={<Add20Regular />}
              onClick={() => setOpenModal(true)}
            >
              Create Topic
            </Button>
          </DialogTrigger>
        ),
      }}
    >
      <Dialog
        open={openModal}
        onOpenChange={(_, { open }) => setOpenModal(open)}
      >
        <DialogSurface>
          <DialogBody>
            <DialogTitle>Create a new Topic</DialogTitle>

            <DialogContent>
              <form onSubmit={onSubmit}>
                <Field label='Label' required>
                  <Input type='text' {...form.register('name')} />
                </Field>
              </form>
            </DialogContent>

            <DialogActions>
              <DialogTrigger disableButtonEnhancement>
                <Button appearance='secondary'>Close</Button>
              </DialogTrigger>
              <Button
                onClick={onSubmit}
                appearance='primary'
                icon={
                  loading ? <Spinner size='tiny' appearance='inverted' /> : null
                }
              >
                Create Topic
              </Button>
            </DialogActions>
          </DialogBody>
        </DialogSurface>
      </Dialog>

      <div className='flex flex-wrap gap-2 mt-2'>
        {(topics?.docs || []).map((topic: any) => {
          return (
            <Card key={topic.id} className='w-64'>
              {/* <Text as='strong'>#{topic.name}</Text> */}
              <Link
                onClick={() =>
                  navigate(`/app/community/posts?topicId=${topic.id}`)
                }
              >
                #{topic.name}
              </Link>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Topics;
