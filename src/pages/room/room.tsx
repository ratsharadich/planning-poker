import { FC, Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, userAuth } from 'shared';
import tw, { css } from 'twin.macro';

export const Room: FC = () => {
  const { roomId } = useParams();

  const { userId, userName, users, socketRef } = userAuth({
    roomId: roomId || '',
  });

  console.log('users', users);

  const handleCardRotate = () => {
    // console.log(socketRef.current, 'socketRef.current');
    socketRef.current?.emit('card:rotate');
  };

  const [rotate, setRotate] = useState(0);

  useEffect(() => {
    socketRef.current?.on('card', card => {
      console.log(card, 'card');
      setRotate(card);
    });
  }, []);

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

      <div
        css={[
          tw`h-[200px] w-[100px] bg-black mt-8 ml-28`,
          css`
            transform: rotate(${rotate}deg);
          `,
        ]}
        onClick={handleCardRotate}
      />
    </Fragment>
  );
};
