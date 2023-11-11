import { PokerCard } from 'pages/room/entities';
import { ReactNode } from 'react';
import { CardList, CardValue } from 'shared';

type Args = { shown: boolean; cards: CardList };

export const splitCards = ({ shown, cards }: Args) => {
  const list = Object.entries(cards).map(([id, value]) => ({
    id,
    value,
  }));

  return list.reduce<
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
  value: CardValue;
  shown: boolean;
}) {
  return <PokerCard key={id} shown={shown} value={value} />;
}
