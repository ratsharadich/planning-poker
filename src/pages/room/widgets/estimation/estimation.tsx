import { EstimationCard } from 'pages/room/entities';
import { FC, memo } from 'react';
import { fibonacci } from './constants';

export const Estimation: FC = memo(() => {
  return (
    <footer tw="h-24 w-full flex flex-wrap gap-1 items-end justify-center">
      {fibonacci.map((assessment, index) => (
        <EstimationCard key={index} assessment={assessment} />
      ))}
    </footer>
  );
});
