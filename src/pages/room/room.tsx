import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Estimation, Table } from './widgets';
import { useGate, useUnit } from 'effector-react';
import { $room_name, $user_name } from 'shared/model/coords';
import { Page, Typography } from 'shared/ui';
import { CreateUser, $create_user_form } from './features/create-user';
import { RoomGate } from './model';

export const Room: FC = () => {
  const { roomId } = useParams();
  const userId = localStorage.getItem('userId') || '';

  const [createUserForm, userName, roomName] = useUnit([
    $create_user_form,
    $user_name,
    $room_name,
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
          </header>

          <Table />
          <Estimation />
        </Page>
      )}
    </Fragment>
  );
};
