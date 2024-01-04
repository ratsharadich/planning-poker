import { PokerCard } from 'pages/room/entities';
import { ReactNode } from 'react';
import { Card } from 'src/shared/types';

type Args = { shown: boolean; cards: Card[] };

export const getSplittedCards = ({ shown, cards }: Args) => {
  return cards.reduce<
    Record<'left' | 'top' | 'right' | 'bottom', Array<ReactNode>>
  >(
    (acc, curr, index) => {
      const pokerCard = (
        <PokerCard key={curr.id} shown={shown} value={curr.value} />
      );

      if (index >= 0 && index < 1) {
        acc.left.push(pokerCard);
      }

      if (index >= 1 && index < 5) {
        acc.top.push(pokerCard);
      }

      if (index >= 5 && index < 7) {
        acc.right.push(pokerCard);
      }

      if (index >= 7 && index < 9) {
        acc.bottom.push(pokerCard);
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
