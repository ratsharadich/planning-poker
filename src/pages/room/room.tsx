import { FC, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { RoomType, getRoom, useReducerAsState } from 'shared';

type Props = {};

export const Room: FC<Props> = ({}) => {
  const [state, setState] = useReducerAsState<Partial<RoomType>>({});

  const { roomId } = useParams();

  useEffect(() => {
    if (roomId) {
      getRoom(roomId).then(result => setState(result));
    }
  }, [roomId]);

  return (
    <Fragment>
      {state.users?.map(({ id, name }) => (
        <div tw="flex gap-2" key={id}>
          <span>{id}</span>
          <span>{name}</span>
        </div>
      ))}
    </Fragment>
  );
};
