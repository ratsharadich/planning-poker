import { PokerCard } from 'pages/room/entities';
import { ReactNode } from 'react';
import { Card } from 'src/shared/types';

type Args = { shown: boolean; cards: Card[] };

export const splitCards = ({ shown, cards }: Args) => {
  return cards.reduce<
    Record<'left' | 'top' | 'right' | 'bottom', Array<ReactNode>>
  >(
    (acc, curr, index) => {
      if (index >= 0 && index < 1) {
        acc.left.push(getCard({ ...curr, shown }));
      }

      if (index >= 1 && index < 5) {
        acc.top.push(getCard({ ...curr, shown }));
      }

      if (index >= 5 && index < 7) {
        acc.right.push(getCard({ ...curr, shown }));
      }

      if (index >= 7 && index < 9) {
        acc.bottom.push(getCard({ ...curr, shown }));
      }

      return acc;
    },
    {
      left: [],
      top: [],
      right: [],
      bottom: [],
    },
  );
};

function getCard({
  id,
  value,
  shown,
}: {
  id: string;
  value: string;
  shown: boolean;
}) {
  return <PokerCard key={id} shown={shown} value={value} />;
}
