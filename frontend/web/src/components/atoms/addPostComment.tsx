import { Button, Input, Spinner } from '@fluentui/react-components';
import React from 'react';

import useForm from '@awesome/shared/hooks/form';

export type AddPostCommentProps = {
  postId: number;
  repliedToId?: number;
  onSuccess?: () => void;
};

const AddPostComment: React.FC<AddPostCommentProps> = ({
  postId,
  repliedToId,
  onSuccess,
}) => {
  const auth = useAuthValue();
  const { form, loading, onSubmit } = useForm<{ body: string }>({
    submitEndpoint: '/api/community/comments/create',
    beforeSubmit: (data) => ({
      body: {
        ...data,
        repliedToId,
        postId: postId,
        userId: auth?.user.id,
      },
    }),
    onSuccess: () => {
      form.reset();
      if (onSuccess) onSuccess();
    },
  });

  return (
    <form
      onSubmit={onSubmit}
      className='w-[696px] max-w-full flex items-center justify-between'
    >
      <Input
        type='text'
        className='flex-grow'
        placeholder='Say something about it'
        {...form.register('body')}
      />

      <Button
        onClick={onSubmit}
        appearance='subtle'
        icon={loading ? <Spinner size='tiny' appearance='inverted' /> : null}
      >
        Comment
      </Button>
    </form>
  );
};

export default AddPostComment;
