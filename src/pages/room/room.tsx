import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { $roomName, $userId, $userName, Page, Typography } from 'shared';
import { Estimation, Table } from './widgets';
import { $createUserForm, CreateUser } from './features';
import { useGate, useUnit } from 'effector-react';
import { $cards, $cardsShown, RoomGate, cardsGotten } from './model';

export const Room: FC = () => {
  const { roomId } = useParams();
  const userId = localStorage.getItem('userId') || '';

  const [
    createUserForm,
    userName,
    roomName,
    cards,
    cardsShown,
    handleGetCards,
  ] = useUnit([
    $createUserForm,
    $userName,
    $roomName,
    $cards,
    $cardsShown,
    cardsGotten,
  ]);

  useGate(RoomGate, {
    roomId: roomId || '',
    userId,
  });

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
            <Typography.H2>userId: {userId}</Typography.H2>
            <Typography.H2>userName: {userName}</Typography.H2>
            <Typography.H2>roomName: {roomName}</Typography.H2>

            <Typography.H2>Юзеры</Typography.H2>
            {cards.map(({ id }) => (
              <div key={id}>
                <span>{id}</span>
              </div>
            ))}

            <button onClick={handleGetCards}>Обновить карты</button>
          </header>

          <Table shown={cardsShown} cards={cards} />

          <Estimation
            userId={userId}
            cardValue={cards.find(user => user.userId === userId)?.value || ''}
          />
        </Page>
      )}
    </Fragment>
  );
};
