import _ from 'lodash-es';
import {
  Button,
  Card,
  Field,
  Spinner,
  Text,
  Textarea,
} from '@fluentui/react-components';
import { Add20Regular } from '@fluentui/react-icons';
import React, { useEffect, useState } from 'react';

import useForm from '@awesome/shared/hooks/form';
import { service } from '@awesome/shared/utils/service';
import { useAuthValue } from '@awesome/shared/atoms/auth';

import PostCard from '../../../components/atoms/postCard';
import PageContainer from '../../../components/pageContainer';

const Posts: React.FC = () => {
  const auth = useAuthValue();
  const [posts, setPosts] = useState<any | null>(null);

  const getPostsService = service('/api/community/posts', { method: 'POST' });

  const { loading, onSubmit, form } = useForm<{ body: string }>({
    submitEndpoint: '/api/community/post/create',
    onFinally: () => {
      getPosts().catch(console.log);
    },
    beforeSubmit: (values) => ({
      body: { ...values, userId: auth?.user.id },
      resourceIndex: { resourceType: 'posts', name: values.body },
    }),
  });

  const getPosts = async () => {
    const response = await getPostsService({
      data: {
        populate: ['User'],
        searchCriteria: { deleted: false },
        paginationOptions: { limit: 10, page: 1 },
      },
    });
    setPosts(response.data);
  };

  useEffect(() => {
    getPosts().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PageContainer header={{ title: 'Community' }}>
      <div className='flex justify-center flex-col md:flex-row gap-4 mt-2'>
        <div className='flex items-center justify-center flex-col gap-4'>
          <Card className='w-[720px] max-w-full'>
            <form onSubmit={onSubmit} className='flex flex-col gap-2'>
              <Field>
                <Textarea
                  placeholder='Share something insightful'
                  {...form.register('body')}
                />
              </Field>

              <Button
                onClick={onSubmit}
                appearance='primary'
                className='w-40'
                icon={
                  loading ? (
                    <Spinner size='tiny' appearance='inverted' />
                  ) : (
                    <Add20Regular />
                  )
                }
              >
                Create Post
              </Button>
            </form>
          </Card>

          <div className='flex flex-col gap-4'>
            {(posts?.docs || []).map((post: any) => {
              return (
                <PostCard
                  type='list'
                  key={post.id}
                  post={{
                    ...post,
                    body: _.truncate(post.body, { length: 200 }),
                  }}
                />
              );
            })}
          </div>
        </div>

        <div className='flex flex-col'>
          <Card className='w-[320px] max-w-full'>
            <Text>Friend Requests</Text>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default Posts;
