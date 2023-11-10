import { FC, Fragment, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Page, SocketActions, Typography } from 'shared';
import { Socket } from 'socket.io-client';
import { useAuth, useRoomEvents } from './hooks';
import { Table } from './widgets';

export const Room: FC = () => {
  const { roomId } = useParams();

  const socketRef = useRef<Socket | null>(null);

  const { userId, userName, users } = useAuth({
    roomId: roomId || '',
    socketRef,
  });

  const { cards, shown, handleGetCards, handleUpdateCard } = useRoomEvents({
    userId,
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

      <Table shown={shown} cards={cards} />

      <footer>
        <div tw="flex gap-1">
          {Array.from(Array(3), (_, index) => (
            <div
              key={index}
              tw="bg-black h-8 w-8 text-white"
              onClick={() => handleUpdateCard(index + 1)}
            >
              {index + 1}
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            if (socketRef.current) {
              SocketActions.setCardsShown({
                socket: socketRef.current,
                show: !shown,
              });
            }
          }}
        >
          Открыть карты
        </button>
      </footer>
    </Page>
  );
};
