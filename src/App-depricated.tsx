import { useReducerAsState } from 'shared';
import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const serverUrl = 'http://192.168.0.16:3000';
const socket = io(serverUrl);

const App: React.FC = () => {
  const [{ name, room, sessionId }, setState] = useReducerAsState({
    name: '',
    room: '',
    sessionId: '',
  });

  const handleJoin = () => {
    if (name && room) {
      socket.emit('join', name, room);

      socket.on('sessionJoined', ({ sessionId }) => {
        setState({ sessionId });
      });
    }
  };

  useEffect(() => {
    socket.on('userList', usernames => {
      console.log(usernames);
    });

    return () => {
      socket.off('userList');
    };
  }, []);

  return (
    <div>
      <p>Session ID: {sessionId}</p>
      <input
        placeholder="Enter your nickname"
        value={name}
        onChange={e => setState({ name: e.target.value })}
      />

      <input
        placeholder="Enter room name"
        value={room}
        onChange={e => setState({ room: e.target.value })}
      />
      <button onClick={handleJoin}>Join Room</button>
    </div>
  );
};

export default App;
