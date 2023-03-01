import React from 'react';

import { getBgColorByName } from 'core/utils/get-color-by-string';

interface AvatarProps {
  name: string;
  isSender: boolean;
}

const Avatar = (props: AvatarProps) => {
  if (props.name && props.name !== '') {
    const nameAsArray = props.name.split(' ');
    return (
      <div
        className={`${
          props.isSender ? 'order-2 ml-2' : 'order-1 mr-2'
        } h-10 w-10 flex justify-center items-center rounded-full text-white`}
        style={{ backgroundColor: getBgColorByName(props.name) }}
      >
        {nameAsArray
          .map((item) => item.slice(0, 1))
          .join('')
          .toUpperCase()}
      </div>
    );
  }

  return null;
};

export default Avatar;
