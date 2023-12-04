import { Button, Card, Text } from '@fluentui/react-components';
import { Add20Regular } from '@fluentui/react-icons';
import { Form, Input, message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';

import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const Topics: React.FC = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [topics, setTopics] = useState<any | null>(null);

  const getTopicsService = service('/api/community/topics');
  const createTopicService = service('/api/community/topic/create');

  const handleCreateTopic = async () => {
    try {
      await form.validateFields();
      await createTopicService({
        method: 'POST',
        data: { name: form.getFieldValue('name') },
      });
      form.resetFields();
      setOpenModal(false);
      getTopics().catch(console.log);
    } catch (err: any) {
      console.log(err);
      message.error('Error in creating topic');
    }
  };

  const getTopics = async () => {
    const response = await getTopicsService({
      method: 'POST',
      data: {
        searchCriteria: { deleted: false },
        paginationOptions: { limit: 10, page: 1 },
      },
    });
    setTopics(response.data);
  };

  useEffect(() => {
    getTopics().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer>
      <Modal
        footer={null}
        open={openModal}
        title='Create a new topic'
        onCancel={() => setOpenModal(false)}
      >
        <Form form={form} onFinish={handleCreateTopic} layout='vertical'>
          <Form.Item name='name' label='Name' rules={[{ required: true }]}>
            <Input placeholder='Enter your topic' />
          </Form.Item>

          <div className='flex gap-2 justify-end'>
            <Button
              appearance='primary'
              icon={<Add20Regular />}
              onSubmit={handleCreateTopic}
            >
              Create Topic
            </Button>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          </div>
        </Form>
      </Modal>

      <Card>
        <Button
          appearance='primary'
          icon={<Add20Regular />}
          onClick={() => setOpenModal(true)}
        >
          Create Topic
        </Button>
      </Card>

      <div className='flex flex-wrap gap-2 mt-2'>
        {(topics.docs || []).map((topic: any) => {
          return (
            <Card id={topic.id} className='w-64'>
              <Text as='strong'>#{topic.name}</Text>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Topics;
