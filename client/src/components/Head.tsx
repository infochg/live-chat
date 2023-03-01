import React from 'react';

import { Sender } from 'core/types';

import Avatar from 'components/Avatar';

interface HeadProps {
  sender: Sender;
}

const Head = ({ sender }: HeadProps) => {
  return (
    <div className='fixed w-full bg-white h-16 pl-8 pr-8 flex justify-center items-center shadow-md max-w-full'>
      <Avatar name={sender.name} isSender={false} />
      <div className='my-3 font-bold text-lg tracking-wide text-ellipsis overflow-hidden ... max-w-[90%] order-2'>
        {sender.name}
      </div>
    </div>
  );
};

export default Head;
