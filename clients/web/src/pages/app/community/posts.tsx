import { PlusOutlined } from '@ant-design/icons';
import { useAuthValue } from '@awesome/shared/atoms/auth';
import { Button, Card, Text } from '@fluentui/react-components';
import { Form, Input, message, Modal, Select } from 'antd';
import _ from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const Posts: React.FC = () => {
  const auth = useAuthValue();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [posts, setPosts] = useState<any | null>(null);
  const [topics, setTopics] = useState<any | null>(null);

  const getPostsService = service('/api/community/posts');
  const getTopicsService = service('/api/community/topics');
  const createPostService = service('/api/community/post/create');

  const handleCreatePost = async () => {
    try {
      await form.validateFields();
      await createPostService({
        method: 'POST',
        data: { ...form.getFieldsValue(), userId: auth?.user.id },
      });
      form.resetFields();
      setOpenModal(false);
      getPosts().catch(console.log);
    } catch (err: any) {
      console.log(err);
      message.error('Error in creating topic');
    }
  };

  const getPosts = async () => {
    const response = await getPostsService({
      method: 'POST',
      data: {
        searchCriteria: { deleted: false },
        paginationOptions: { limit: 10, page: 1 },
      },
    });
    setPosts(response.data);
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
    Promise.allSettled([getPosts(), getTopics()]).catch(console.log);
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
        <Form form={form} onFinish={handleCreatePost} layout='vertical'>
          <Form.Item name='title' label='Title'>
            <Input placeholder='Enter title for your post' />
          </Form.Item>

          <Form.Item name='body' label='Body'>
            <Input.TextArea placeholder='Your article here' />
          </Form.Item>

          <Form.Item name='topicId' label='Topic'>
            <Select placeholder='Select suitable topic for your article'>
              {(topics?.docs || []).map((topic: any) => {
                return (
                  <Select.Option key={topic.id} value={topic.id}>
                    {topic.name}
                  </Select.Option>
                );
              })}
            </Select>
          </Form.Item>

          <div className='flex gap-2 justify-end'>
            <Button appearance='primary' icon={<PlusOutlined />}>
              Create Post
            </Button>
            <Button onClick={() => setOpenModal(false)}>Cancel</Button>
          </div>
        </Form>
      </Modal>

      <Card>
        <Button
          appearance='primary'
          icon={<PlusOutlined />}
          onClick={() => setOpenModal(true)}
        >
          Create Post
        </Button>
      </Card>

      <div className='flex flex-wrap gap-2 mt-2'>
        {(posts?.docs || []).map((post: any) => {
          const postTopic = (topics?.docs || []).find(
            (topic: any) => topic.id === post.topicId
          )?.name;
          const body = _.truncate(post.body, { length: 200 });

          return (
            <Card
              {...{
                key: post.id,
                className: 'w-72 cursor-pointer',
                ...(post.title ? { title: post.title } : {}),
                onClick: () => navigate(`/app/community/posts/${post.id}`),
              }}
            >
              {postTopic ? (
                <>
                  <Text as='strong'>#{postTopic}</Text>
                  <br />
                </>
              ) : null}
              <Text>{body}</Text>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Posts;
