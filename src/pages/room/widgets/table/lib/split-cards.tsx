import { PokerCard } from 'pages/room/entities';
import { ReactNode } from 'react';
import { Card } from 'shared/types';

export const getSplittedCards = (cards: Card[]) => {
  return cards.reduce<
    Record<'left' | 'top' | 'right' | 'bottom', Array<ReactNode>>
  >(
    (acc, curr, index) => {
      const pokerCard = (
        <PokerCard key={curr.id} userName={curr.user.name} value={curr.value} />
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
