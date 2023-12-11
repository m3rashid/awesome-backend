import React from 'react';
import { useParams } from 'react-router-dom';

import PageContainer from '../../../components/pageContainer';

const SingleChat: React.FC = () => {
  const { chatId } = useParams();
  console.log(chatId);

  return <PageContainer header={{ title: '' }}></PageContainer>;
};

export default SingleChat;
