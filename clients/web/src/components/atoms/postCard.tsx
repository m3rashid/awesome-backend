import {
  Avatar,
  Body1,
  Caption1,
  Card,
  CardHeader,
} from '@fluentui/react-components';
import dayjs from 'dayjs';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import AddPostComment from './addPostComment';
import PostCommentSection from './postCommentSection';

export type PostCardProps = {
  post: any;
  type: 'detail' | 'list';
};

const PostCard: React.FC<PostCardProps> = ({ post, type }) => {
  const navigate = useNavigate();

  return (
    <>
      <Card key={post.id} className='w-[720px] max-w-full h-full'>
        <CardHeader
          image={
            <Avatar
              className='cursor-pointer'
              onClick={() => navigate(`/app/community/profile/${post.user.id}`)}
            />
          }
          header={
            <Body1
              onClick={() => navigate(`/app/community/profile/${post.user.id}`)}
            >
              <b className='cursor-pointer'>{post.user.name}</b>
              &nbsp;&#x2022;&nbsp;
              {dayjs(post.createdAt).fromNow()}
            </Body1>
          }
          description={<Caption1>{post.user.email}</Caption1>}
        />

        <div
          className={`mb-1 ${type === 'list' ? 'cursor-pointer' : ''}`}
          onClick={() => {
            if (type === 'list') navigate(`/app/community/posts/${post.id}`);
          }}
          dangerouslySetInnerHTML={{
            __html: post.body.replace(/\n/g, '<br />'),
          }}
        ></div>
      </Card>

      {type === 'detail' ? (
        <Card>
          <AddPostComment postId={post.id} />
          <PostCommentSection postId={post.id} />
        </Card>
      ) : null}
    </>
  );
};

export default PostCard;
