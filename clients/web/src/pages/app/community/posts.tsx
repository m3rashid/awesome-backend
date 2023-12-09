import { useAuthValue } from '@awesome/shared/atoms/auth';
import {
  Button,
  Card,
  Field,
  Select,
  Spinner,
  Textarea,
} from '@fluentui/react-components';
import { Add20Regular } from '@fluentui/react-icons';
import _ from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { NumberParam, useQueryParam } from 'use-query-params';

import PostCard from '../../../components/atoms/postCard';
import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';
import useForm from '../../../hooks/form';

const Posts: React.FC = () => {
  const auth = useAuthValue();
  const [posts, setPosts] = useState<any | null>(null);
  const [topics, setTopics] = useState<any | null>(null);
  const [topicId] = useQueryParam('topicId', NumberParam);

  const getPostsService = service('/api/community/posts', { method: 'POST' });
  const getTopicsService = service('/api/community/topics', { method: 'POST' });

  const { loading, onSubmit, form } = useForm<{
    body: string;
    topicId: number;
  }>({
    submitEndpoint: '/api/community/post/create',
    onFinally: () => {
      getPosts().catch(console.log);
    },
    beforeSubmit: (values) => ({
      ...values,
      userId: auth?.user.id,
      topicId: Number(values.topicId),
    }),
  });

  const getPosts = async () => {
    const response = await getPostsService({
      data: {
        searchCriteria: {
          deleted: false,
          ...(topicId ? { topicId: topicId } : {}),
        },
        populate: ['User', 'Topic'],
        paginationOptions: { limit: 10, page: 1 },
      },
    });
    setPosts(response.data);
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

  useEffect(() => {
    Promise.allSettled([getPosts(), getTopics()]).catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  return (
    <PageContainer header={{ title: 'Community' }}>
      <div className='flex items-center justify-center flex-col gap-4 mt-2'>
        {!topicId ? (
          <Card className='w-[720px] max-w-full cursor-pointer h-full'>
            <form onSubmit={onSubmit}>
              <Field>
                <Textarea
                  placeholder='Share something insightful'
                  {...form.register('body')}
                />
              </Field>

              <div className='flex gap-4 items-center justify-between mt-4'>
                <Select
                  placeholder='Select a topic'
                  className='flex-grow max-w-[200px]'
                  {...form.register('topicId')}
                >
                  {(topics?.docs || []).map((topic: any) => {
                    return (
                      <option key={topic.id} value={topic.id}>
                        {topic.name}
                      </option>
                    );
                  })}
                </Select>

                <Button
                  onClick={onSubmit}
                  appearance='primary'
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
              </div>
            </form>
          </Card>
        ) : null}

        {(posts?.docs || []).map((post: any) => {
          return (
            <PostCard
              type='list'
              key={post.id}
              post={{ ...post, body: _.truncate(post.body, { length: 200 }) }}
            />
          );
        })}
      </div>
    </PageContainer>
  );
};

export default Posts;
