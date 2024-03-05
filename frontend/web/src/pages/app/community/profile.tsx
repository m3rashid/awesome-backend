import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PostCard from '../../../components/atoms/postCard';
import PageContainer from '../../../components/pageContainer';
import { service } from '@awesome/shared/utils/service';

const CommunityProfile: React.FC = () => {
  const { userId } = useParams();
  const auth = useAuthValue();
  const [user, setUser] = useState<any | null>(null);
  const [posts, setPosts] = useState<any | null>(null);

  useEffect(() => {
    if (!userId || isNaN(Number(userId))) return;

    const getUserDetails = async () => {
      const { data } = await service('/api/auth/user', {
        method: 'POST',
      })({ data: { id: Number(userId) } });
      setUser(data);
    };

    const getUserPosts = async () => {
      const { data } = await service('/api/community/posts', {
        method: 'POST',
      })({ data: { userId: Number(userId) } });
      setPosts(data);
    };
    Promise.allSettled([getUserDetails(), getUserPosts()]).catch(console.log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  if (!user && !posts) return null;

  return (
    <PageContainer header={{ title: user.name }}>
      {JSON.stringify(user, null, 2)}

      <br />
      <div className='flex items-center justify-center flex-col gap-4 mt-2'>
        {(posts?.docs || []).map((post: any) => {
          return <PostCard post={{ ...post, user: auth?.user }} type='list' />;
        })}
      </div>
    </PageContainer>
  );
};

export default CommunityProfile;
