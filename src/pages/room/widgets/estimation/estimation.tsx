import { EstimationCard } from 'pages/room/entities';
import { FC, memo } from 'react';
import { fibonacci } from './constants';
import { useUnit } from 'effector-react';
import { SocketActions } from 'shared/api';
import { $socket } from 'shared/model/socket';

type Props = {
  userId: string;
  cardValue: string | number;
};

const { updateCard } = SocketActions;

export const Estimation: FC<Props> = memo(({ userId, cardValue }) => {
  const socket = useUnit($socket);

  const hadnelUpdate = (assessment: string | number) => {
    if (socket) {
      updateCard({
        socket,
        value: assessment === cardValue ? '' : String(assessment),
        userId,
      });
    }
  };

  return (
    <footer tw="h-24 w-full flex flex-wrap gap-1 items-end justify-center">
      {fibonacci.map((assessment, index) => (
        <EstimationCard
          key={index}
          assessment={assessment}
          onEstimate={hadnelUpdate}
        />
      ))}
    </footer>
  );
});
