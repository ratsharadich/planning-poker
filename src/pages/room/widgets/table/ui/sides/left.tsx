import { useUnit } from 'effector-react';
import { FC, memo } from 'react';
import { $left_cards } from '../../model';
import { LeftStyled } from './styles';

export const Left: FC = memo(() => {
  const cards = useUnit($left_cards);
  return <LeftStyled>{cards}</LeftStyled>;
});
