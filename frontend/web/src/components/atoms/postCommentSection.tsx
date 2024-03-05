import {
  Avatar,
  Body1,
  Button,
  Caption1,
  Card,
  CardHeader,
} from '@fluentui/react-components';
import { Chat20Regular } from '@fluentui/react-icons';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';

import { service } from '@awesome/shared/utils/service';
import AddPostComment from './addPostComment';

export type PostCommentSectionProps = {
  postId: number;
};

const PostCommentSection: React.FC<PostCommentSectionProps> = ({ postId }) => {
  const [comments, setComments] = useState<any | null>(null);
  const [replyTo, setReplyTo] = useState<number | null>(null);

  const getCommentsService = service('/api/community/comments', {
    method: 'POST',
  });

  const getComments = async () => {
    const response = await getCommentsService({
      method: 'POST',
      data: {
        searchCriteria: {
          deleted: false,
          postId: postId,
        },
        populate: ['User'],
        paginationOptions: { limit: 10, page: 1 },
      },
    });
    setComments(response.data);
  };

  useEffect(() => {
    if (!postId) return;
    getComments().catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  return (
    <>
      {(comments?.docs || []).map((comment: any) => (
        <Card key={comment.id}>
          <CardHeader
            image={<Avatar />}
            header={
              <div className='flex justify-between w-full'>
                <div className='flex flex-col'>
                  <Body1>
                    <b>{comment.user.name}</b> &nbsp;&#x2022;&nbsp;
                    {dayjs(comment.createdAt).fromNow()}
                  </Body1>
                  <Caption1>{comment.user.email}</Caption1>
                </div>

                <Button
                  appearance='subtle'
                  size='small'
                  icon={replyTo === comment.id ? null : <Chat20Regular />}
                  onClick={() =>
                    setReplyTo((prev) =>
                      prev === comment.id ? null : comment.id
                    )
                  }
                >
                  {replyTo === comment.id ? 'Cancel' : 'Reply'}
                </Button>
              </div>
            }
          />
          <p>{comment.body}</p>

          {replyTo === comment.id ? (
            <AddPostComment
              postId={postId}
              repliedToId={comment.id}
              onSuccess={() => setReplyTo(null)}
            />
          ) : null}
        </Card>
      ))}
    </>
  );
};

export default PostCommentSection;
