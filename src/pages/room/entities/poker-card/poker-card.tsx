import { FC } from 'react';
import { Back, CardStyled, Face } from './styles';
import { useUnit } from 'effector-react';
import { $are_cards_uncovered } from '../../model';

type Props = {
  value: string;
};

export const PokerCard: FC<Props> = ({ value }) => {
  const shown = useUnit($are_cards_uncovered);

  return (
    <CardStyled className="group">
      <Face shown={shown}>{value}</Face>
      <Back hide={shown} highlighted={Boolean(value)} />
    </CardStyled>
  );
};
