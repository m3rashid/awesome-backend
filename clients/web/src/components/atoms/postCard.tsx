import {
  Avatar,
  Body1,
  Caption1,
  Card,
  CardHeader,
  Link,
  Text,
} from '@fluentui/react-components';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { useNavigate } from 'react-router-dom';
dayjs.extend(relativeTime);

import AddPostComment from './addPostComment';
import PostCommentSection from './postCommentSection';

export type PostCardProps = {
  post: any;
  type: 'detail' | 'list';
};

const PostCard: React.FC<PostCardProps> = ({ post, type }) => {
  const navigate = useNavigate();

  return (
    <Card key={post.id} className='w-[720px] max-w-full cursor-pointer h-full'>
      <CardHeader
        image={<Avatar />}
        header={
          <Body1
            onClick={() => navigate(`/app/community/profile/${post.user.id}`)}
          >
            <b>{post.user.name}</b>&nbsp;&#x2022;&nbsp;
            {dayjs(post.createdAt).fromNow()}
          </Body1>
        }
        description={<Caption1>{post.user.email}</Caption1>}
      />

      <Link
        onClick={() => navigate(`/app/community/posts?topicId=${post.topicId}`)}
      >
        #{post.topic.name}
      </Link>
      <Text onClick={() => navigate(`/app/community/posts/${post.id}`)}>
        {post.body}
      </Text>

      {type === 'detail' ? (
        <>
          <AddPostComment postId={post.id} />
          <PostCommentSection postId={post.id} />
        </>
      ) : null}
    </Card>
  );
};

export default PostCard;
