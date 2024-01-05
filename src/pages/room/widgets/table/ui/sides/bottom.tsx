import { useUnit } from 'effector-react';
import { FC, memo } from 'react';
import { $bottom_cards } from '../../model';
import { BottomStyled } from './styles';

export const Bottom: FC = memo(() => {
  const cards = useUnit($bottom_cards);
  return <BottomStyled>{cards}</BottomStyled>;
});
