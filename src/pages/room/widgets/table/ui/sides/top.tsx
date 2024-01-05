import { useUnit } from 'effector-react';
import { FC, memo } from 'react';
import { $top_cards } from '../../model';
import { TopStyled } from './styles';

export const Top: FC = memo(() => {
  const cards = useUnit($top_cards);
  return <TopStyled>{cards}</TopStyled>;
});
