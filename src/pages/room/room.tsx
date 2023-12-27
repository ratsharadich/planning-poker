import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Page, Typography } from 'shared';
import { useRoomEvents } from './hooks';
import { Estimation, Table } from './widgets';
import { CreateUser } from './features';
import { useGate } from 'effector-react';
import { RoomGate } from './model';

export const Room: FC = () => {
  const { roomId } = useParams();

  const { state, createUserForm, handleGetCards } = useRoomEvents({
    roomId: roomId || '',
  });

  useGate(RoomGate, { roomId: roomId || '' });

  const { shown, user, cards } = state;

  return (
    <Fragment>
      {createUserForm && (
        <Page>
          <CreateUser />
        </Page>
      )}

      {!createUserForm && (
        <Page tw="grid grid-rows-[auto,1fr,auto] grid-cols-1 justify-items-center items-center">
          <header tw="mb-auto">
            <Typography.H2>userId: {user.id}</Typography.H2>
            <Typography.H2>userName: {user.name}</Typography.H2>
            {/* <Typography.H2>roomName: {roomName}</Typography.H2> */}

            <Typography.H2>Юзеры</Typography.H2>
            {cards.map(({ id }) => (
              <div key={id}>
                <span>{id}</span>
              </div>
            ))}

            <button onClick={handleGetCards}>Обновить карты</button>
          </header>

          <Table shown={shown} cards={cards} />

          <Estimation
            userId={user.id}
            cardValue={
              cards.find(({ userId }) => userId === user.id)?.value || ''
            }
          />
        </Page>
      )}
    </Fragment>
  );
};
