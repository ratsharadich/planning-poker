import { FC } from 'react';
import { Back, CardStyled, Face } from './styles';

type Props = {
  shown: boolean;
  value: string;
};

export const PokerCard: FC<Props> = ({ shown, value }) => {
  return (
    <CardStyled className="group">
      <Face shown={shown}>{value}</Face>
      <Back hide={shown} highlighted={Boolean(value)} />
    </CardStyled>
  );
};
