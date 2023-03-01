import React, { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';

import { ADD_USER } from 'core/graphql/client';
import { Sender } from 'core/types';

interface LoginProps {
  setSender: Dispatch<SetStateAction<Sender>>;
}

const Login = ({ setSender }: LoginProps) => {
  const [name, setName] = useState('');
  const [addUser, error] = useMutation(ADD_USER);

  const sendUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (name.length > 0) {
      addUser({
        variables: {
          name: name
        }
      }).then((data) => {
        if (!!error) {
          setSender({ name, id: Number(data.data.addUser) });
        }
      });
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 p-0 grid justify-center'>
      <div className='self-center'>
        <div className='pb-2 text-xl text-center'>Please, introduce yourself.</div>
        <form onSubmit={sendUser} className='flex h-16'>
          <input
            className='flex-grow m-2 py-2 px-4 mr-1 rounded-xl border border-gray-300 bg-white resize-none'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <button className='m-2 bg-blue-500 hover:bg-blue-700 ease-linear duration-100 text-white px-5 rounded-xl'>
            Send
          </button>
        </form>
        {error.error?.message && <div className='text-center text-red-600'>{error.error?.message}</div>}
      </div>
    </div>
  );
};

export default Login;
