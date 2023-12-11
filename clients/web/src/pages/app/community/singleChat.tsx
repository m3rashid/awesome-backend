import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PageContainer from '../../../components/pageContainer';
import { service } from '../../../helpers/service';

const SingleChat: React.FC = () => {
  const { chatId } = useParams();
  const [chats, setChats] = useState<any | null>(null);
  const [group, setGroup] = useState<any | null>(null);

  const getChatHistory = async (id: string) => {
    const { data } = await service('/api/community/chats', { method: 'POST' })({
      data: { searchCriteria: { groupId: Number(id) } },
    });
    setChats(data);
  };

  const getGroup = async (id: string) => {
    const { data } = await service('/api/community/groups/get', {
      method: 'POST',
    })({
      data: {
        searchCriteria: { id: Number(id) },
        populate: ['Members', 'CreatedBy'],
      },
    });
    setGroup(data);
  };

  useEffect(() => {
    if (!chatId || isNaN(Number(chatId))) return;
    Promise.allSettled([getChatHistory(chatId), getGroup(chatId)]).catch(
      console.log
    );
  }, [chatId]);

  if (!group) return null;

  return (
    <PageContainer header={{ title: group.name }}>
      {JSON.stringify(chats, null, 2)}
      <br />
      <br />
      {JSON.stringify(group, null, 2)}
    </PageContainer>
  );
};

export default SingleChat;
