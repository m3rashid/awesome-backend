import {
  Avatar,
  Body1,
  Body2,
  Button,
  Card,
  CardHeader,
  Divider,
  Input,
  Persona,
} from '@fluentui/react-components';
import { Send20Regular, Settings16Regular } from '@fluentui/react-icons';
import dayjs from 'dayjs';
import _ from 'lodash-es';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { emoticonToEmoji } from 'to-emoji';

import PageContainer from '../../../components/pageContainer';
import useWebSocketConnection from '../../../components/websockets/useConnection';
import { service } from '@awesome/shared/utils/service';

const SingleChat: React.FC = () => {
  const { chatId } = useParams();
  const auth = useAuthValue();
  const navigate = useNavigate();
  const [chatText, setChatText] = useState('');
  const [chats, setChats] = useState<any | null>(null);
  const [group, setGroup] = useState<any | null>(null);
  const { newWebsocketMessage } = useWebSocketConnection();

  const getChatHistory = async (id: string) => {
    const { data } = await service('/api/community/chats', { method: 'POST' })({
      data: {
        searchCriteria: { groupId: Number(id) },
        populate: ['Sender'],
      },
    });
    setChats({ ...data, docs: data.docs.reverse() });
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

  const sendMessage = () => {
    newWebsocketMessage({
      data: {
        senderId: auth?.user.id,
        body: chatText,
        groupId: Number(group.id),
      },
      actionType: 'community_chat_message',
    });
    setChatText('');
  };

  useEffect(() => {
    if (!chatId || isNaN(Number(chatId))) return;
    Promise.allSettled([getChatHistory(chatId), getGroup(chatId)]).catch(
      console.log
    );
  }, [chatId]);

  if (!group) return null;
  return (
    <PageContainer>
      <div className='flex justify-center items-start gap-4 h-[calc(100vh-102px)]'>
        <Card className='w-[320px] max-w-[320px]'>
          <Body2>{group.name}</Body2>
          <Body1 className='my-0'>{group.description}</Body1>

          <Divider className='mb-2' />

          {group.members.map((member: any) => {
            return (
              <Persona
                key={member.id}
                name={member.name}
                secondaryText={member.email}
                {...(group.createdBy.id === member.id
                  ? {
                      presence: {
                        status: 'unknown',
                        icon: <Settings16Regular />,
                      },
                    }
                  : {})}
              />
            );
          })}
        </Card>

        <Card className='w-[720px] max-w-full h-full flex flex-col justify-between'>
          <div className='flex-grow h-full overflow-auto hide-scrollbar flex flex-col gap-2'>
            {(chats?.docs || []).map((chat: any) => {
              return (
                <Card
                  key={chat.id}
                  className={`max-w-[320px] ${
                    chat.sender.id === auth?.user.id ? 'self-end' : ''
                  }`}
                  style={{ padding: 8 }}
                >
                  <CardHeader
                    onClick={() =>
                      navigate(`/app/community/profile/${chat.sender.id}`)
                    }
                    image={<Avatar name={chat.sender.name} />}
                    header={
                      <Body1>
                        <b>{_.truncate(chat.sender.name, { length: 20 })}</b>
                        &nbsp;<b>·</b>
                        &nbsp;
                        {dayjs(chat.createdAt).fromNow()}
                      </Body1>
                    }
                    description={chat.sender.email}
                  />
                  <Body1 className='my-0'>{chat.body}</Body1>
                </Card>
              );
            })}
          </div>

          <div className='flex gap-2'>
            <Input
              value={chatText}
              className='flex-grow'
              style={{ paddingRight: 0 }}
              onChange={(e) => setChatText(emoticonToEmoji(e.target.value))}
            />

            <Button
              appearance='primary'
              iconPosition='after'
              onClick={sendMessage}
              icon={<Send20Regular />}
            >
              Send
            </Button>
          </div>
        </Card>
      </div>
    </PageContainer>
  );
};

export default SingleChat;
