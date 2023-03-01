import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useSubscription } from '@apollo/client';

import { Message, Sender } from 'core/types';
import { GET_MESSAGES, POST_MESSAGE, SUBSCRIBE_MESSAGES } from 'core/graphql/client';

import Messages from 'components/Messages';
import Footer from 'components/Footer';
import Head from 'components/Head';

interface ChatProps {
  sender: Sender;
}

const Chat = ({ sender }: ChatProps) => {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const queryMessages = useQuery(GET_MESSAGES);
  const [postMessage, error] = useMutation(POST_MESSAGE);
  const subscribeMessage = useSubscription(SUBSCRIBE_MESSAGES);

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (text.length > 0 && sender.name.length > 0) {
      postMessage({
        variables: {
          user: sender.name,
          userId: Number(sender.id),
          text: text
        }
      });
      setText('');
    }
  };

  useEffect(() => {
    if (queryMessages.data && queryMessages.data.messages) {
      setMessages(queryMessages.data.messages);
    }
  }, [queryMessages.data]);

  useEffect(() => {
    if (subscribeMessage.data && subscribeMessage.data.message) {
      const messagesArray = messages.slice(0);
      messagesArray.push(subscribeMessage.data.message);
      setMessages(messagesArray);
    }
  }, [subscribeMessage.data]);

  return (
    <div className='min-h-screen bg-gray-100 p-0'>
      <Head sender={sender} />
      <Messages sender={sender} messages={messages} />
      <Footer text={text} setText={setText} sendMessage={sendMessage} error={error || queryMessages.error} />
    </div>
  );
};

export default Chat;
