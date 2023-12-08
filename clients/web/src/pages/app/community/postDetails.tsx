import { Button, Card, Link, Spinner, Text } from '@fluentui/react-components';
import { Edit20Regular } from '@fluentui/react-icons';
import { Form, Input, message, Modal, Select } from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const PostDetails: React.FC = () => {
  // const auth = useAuthValue();
  const params = useParams();
  const [form] = Form.useForm();
  const [topics, setTopics] = useState<any | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [post, setPost] = useState<any | null>(null);

  const getTopicsService = service('/api/community/topics', { method: 'POST' });
  const updatePostService = service('/api/community/post/update', {
    method: 'POST',
  });
  const getPostDetailsService = service('/api/community/post/get', {
    method: 'POST',
  });

  const getPostDetails = async (postId: string) => {
    const response = await getPostDetailsService({
      data: { searchCriteria: { id: Number(postId) }, populate: ['Topic'] },
    });
    setPost(response.data);
  };

  const getTopics = async () => {
    const response = await getTopicsService({
      data: {
        searchCriteria: { deleted: false },
        paginationOptions: { limit: 10, page: 1 },
      },
    });
    setTopics(response.data);
  };

  const handleEditPost = async () => {
    try {
      await form.validateFields();
      await updatePostService({
        data: {
          searchCriteria: { id: post.id },
          update: { ...form.getFieldsValue() },
        },
      });
      form.resetFields();
      setModalOpen(false);
      if (params.postId) getPostDetails(params.postId).catch(console.log);
    } catch (err: any) {
      console.log(err);
      message.error('Error in updating post');
    }
  };

  useEffect(() => {
    if (!params.postId) return;
    Promise.allSettled([getTopics(), getPostDetails(params.postId)]).catch(
      console.log
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.postId]);

  if (!post) return <Spinner size='extra-large' />;

  return (
    <PageContainer>
      <Modal
        footer={null}
        open={modalOpen}
        title='Edit new topic'
        onCancel={() => setModalOpen(false)}
      >
        <Form
          form={form}
          layout='vertical'
          initialValues={post}
          onFinish={handleEditPost}
        >
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
            <Button
              appearance='primary'
              // type='primary'
              // htmlType='submit'
              icon={<Edit20Regular />}
            >
              Update Post
            </Button>
            <Button onClick={() => setModalOpen(false)}>Cancel</Button>
          </div>
        </Form>
      </Modal>

      <div className='flex items-center justify-center mt-2'>
        <Card
          {...{
            style: { minWidth: 320, maxWidth: 640 },
            ...(post.title ? { title: post.title } : {}),
            // ...(post.userId === auth?.user.id
            //   ? {
            //       extra: (
            //         <Button
            //           type='link'
            //           icon={<EditOutlined />}
            //           onClick={() => setModalOpen(true)}
            //         />
            //       ),
            //     }
            //   : {}),
          }}
        >
          <Text>{post.body}</Text>
          <Link>#{post.topic.name}</Link>
        </Card>
      </div>
    </PageContainer>
  );
};

export default PostDetails;
