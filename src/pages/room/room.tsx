import { FC, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { Estimation, Table } from './widgets';
import { useGate, useUnit } from 'effector-react';
import { $room_name, $user_name } from 'shared/model/coords';
import { Typography } from 'shared/ui';
import { CreateUser, $create_user_form } from './features/create-user';
import { RoomGate } from './model';
import tw, { styled } from 'twin.macro';

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
    <Container createUserForm={createUserForm}>
      {createUserForm && <CreateUser />}

      {!createUserForm && (
        <Fragment>
          <header tw="mb-auto">
            <Typography.H2>userId: {userId}</Typography.H2>
            <Typography.H2>userName: {userName}</Typography.H2>
            <Typography.H2>roomName: {roomName}</Typography.H2>
          </header>

          <Table />
          <Estimation />
        </Fragment>
      )}
    </Container>
  );
};

const Container = styled.div<{ createUserForm: boolean }>`
  ${tw`items-center h-full w-full`}
  ${({ createUserForm }) =>
    createUserForm
      ? tw`flex justify-center`
      : tw`grid grid-rows-[auto,1fr,auto] grid-cols-1 justify-items-center`}
`;
