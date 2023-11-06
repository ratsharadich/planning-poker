import { NavigateFunction } from 'react-router-dom';
import { socket } from 'shared/config';

export const joinRoom = ({
  userName,
  roomName,
  onSessionJoined,
}: {
  userName: string;
  roomName: string;
  onSessionJoined: (args: { roomId: string }) => void;
}) => {
  socket.connect();

  if (userName && roomName) {
    socket.emit('join', { userName, roomName });

    socket.on('session-joined', ({ roomId }) => {
      onSessionJoined({ roomId });
    });
  }
};
