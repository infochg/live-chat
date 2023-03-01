import React from 'react';
import { MutationResult } from '@apollo/client';

interface FooterProps {
  text: string;
  setText: (e: string) => void;
  sendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  error: MutationResult;
}

const Footer = ({ text, setText, sendMessage, error }: FooterProps) => {
  return (
    <div className='fixed bottom-0 w-full bg-white'>
      <form onSubmit={sendMessage} className='flex justify-between'>
        <input
          className='flex-grow m-2 py-2 px-4 mr-1 rounded-2xl border border-gray-300 bg-gray-200 resize-none'
          placeholder='Message...'
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className='m-2'>
          <svg
            className='svg-inline--fa text-blue-500 hover:text-blue-700 ease-linear duration-100 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2'
            aria-hidden='true'
            focusable='false'
            data-prefix='fas'
            data-icon='paper-plane'
            role='img'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 512 512'
          >
            <path
              fill='currentColor'
              d='M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z'
            />
          </svg>
        </button>
      </form>
      {error.error?.message && <div className='text-xs pb-2 text-center text-red-600'>{error.error?.message}</div>}
    </div>
  );
};

export default Footer;
