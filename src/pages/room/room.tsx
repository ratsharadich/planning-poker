import { FC, Fragment, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, useReducerAsState, useAuth } from 'shared';
import { Socket } from 'socket.io-client';
import { useRoomEvents } from './hooks';

export const Room: FC = () => {
  const { roomId } = useParams();

  const socketRef = useRef<Socket | null>(null);

  const { userId, userName, users } = useAuth({
    roomId: roomId || '',
    socketRef,
  });

  const { cards, handleGetCards, handleUpdateCard } = useRoomEvents({
    userId,
    socketRef,
  });

  return (
    <Fragment>
      <Typography.H2>userId: {userId}</Typography.H2>
      <Typography.H2>userName: {userName}</Typography.H2>
      {/* <Typography.H2>roomName: {roomName}</Typography.H2> */}

      <Typography.H2>Юзеры</Typography.H2>
      {Object.entries(users).map(([id, { userName, online }]) => (
        <div key={id}>
          <span>{userName}</span>
          <span>{online}</span>
        </div>
      ))}

      <button onClick={handleGetCards}>Обновить карты</button>

      <div tw="flex gap-3">
        {Object.entries(cards).map(([id, { userId: cardUserId, value }]) => (
          <div
            key={id}
            tw="h-[200px] w-[200px] bg-black flex flex-col gap-1 text-white rounded-lg"
            // disabled={cardUserId !== userId}
          >
            <span>{cardUserId}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>

      <div tw="flex gap-1">
        {Array.from(Array(3), (_, index) => (
          <div
            tw="bg-black h-8 w-8 text-white"
            onClick={() => handleUpdateCard(index + 1)}
          >
            {index + 1}
          </div>
        ))}
      </div>
    </Fragment>
  );
};
