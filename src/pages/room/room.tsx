import { FC, Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Page, SocketActions, Typography } from 'shared';
import { Socket } from 'socket.io-client';
import { useAuth, useRoomEvents } from './hooks';
import { Estimation, Table } from './widgets';

export const Room: FC = () => {
  const { roomId } = useParams();

  const socketRef = useRef<Socket | null>(null);

  const { userId, userName, users } = useAuth({
    roomId: roomId || '',
    socketRef,
  });

  const { cards, shown, handleGetCards } = useRoomEvents({
    socketRef,
  });

  return (
    <Page tw="grid grid-rows-[auto,1fr,auto] grid-cols-1 justify-items-center items-center">
      <header tw="mb-auto">
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
      </header>

      <Table socketRef={socketRef} shown={shown} cards={cards} />

      <Estimation
        socketRef={socketRef}
        userId={userId}
        cardValue={cards[userId]}
      />
    </Page>
  );
};
