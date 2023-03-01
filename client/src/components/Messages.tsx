import React, { useEffect, useRef } from 'react';

import { Message, Sender } from 'core/types';

import Avatar from 'components/Avatar';

interface MessagesProps {
  sender: Sender;
  messages: Array<Message>;
}

const Messages = ({ sender, messages }: MessagesProps) => {
  const messageRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (messageRef.current) {
      messageRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
        inline: 'nearest'
      });
    }
  }, [messages]);

  if (!messages.length) {
    return null;
  }

  return (
    <div className='min-h-screen p-8 pt-24 pb-24' ref={messageRef}>
      <div className='grid grid-cols-1 space-y-6'>
        {messages.map(({ id, user, userId, text }: Message) => {
          const isSender = sender.id === userId;
          return (
            <div
              key={id}
              className={`${
                isSender ? 'place-self-end text-right' : 'place-self-start text-left'
              } space-y-2 flex items-center max-w-full`}
            >
              <Avatar name={user} isSender={isSender} />
              <div
                className={`${isSender ? 'bg-white rounded-tr-none order-1' : 'bg-blue-100 rounded-tl-none order-2'} p-3 rounded-xl`}
              >
                <div className='text-xs font-bold text-ellipsis overflow-hidden ... max-w-[100%]'>
                  {isSender ? 'You' : user}
                </div>
                <div className='text-sm text-ellipsis overflow-hidden ... max-w-[100%]'>{text}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Messages;
