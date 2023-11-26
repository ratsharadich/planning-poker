import { EstimationCard } from 'pages/room/entities';
import { FC, MutableRefObject, memo, useCallback } from 'react';
import { SocketActions } from 'shared';
import { Socket } from 'socket.io-client';
import { fibonacci } from './constants';

type Props = {
  userId: string;
  cardValue: string | number;
  socketRef: MutableRefObject<Socket | null>;
};

const { updateCard } = SocketActions;

export const Estimation: FC<Props> = memo(
  ({ socketRef, userId, cardValue }) => {
    const hadnelUpdate = (assessment: string | number) => {
      if (socketRef.current) {
        updateCard({
          socket: socketRef.current,
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
  },
);
