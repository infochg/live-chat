import React, { useState } from 'react';

import { Sender } from 'core/types';

import Chat from 'components/Chat';
import Login from 'components/Login';

const App = () => {
  const [sender, setSender] = useState<Sender>({ name: '', id: -1 });

  return sender.name !== '' ? <Chat sender={sender} /> : <Login setSender={setSender} />;
};

export default App;
