import { useUnit } from 'effector-react';
import { FC, memo } from 'react';
import { $right_cards } from '../../model';
import { RightStyled } from './styles';

export const Right: FC = memo(() => {
  const cards = useUnit($right_cards);
  return <RightStyled>{cards}</RightStyled>;
});
