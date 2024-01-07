import { FC } from 'react';
import { Back, CardStyled, Container, Face } from './styles';
import { useUnit } from 'effector-react';
import { $are_cards_uncovered } from '../../model';
import { Typography } from 'src/shared/ui';

type Props = {
  userName: string;
  value: string;
};

export const PokerCard: FC<Props> = ({ userName, value }) => {
  const shown = useUnit($are_cards_uncovered);

  return (
    <Container>
      <CardStyled className="group">
        <Face shown={shown}>{value}</Face>
        <Back hide={shown} highlighted={Boolean(value)} />
      </CardStyled>

      <Typography.Body14_700>{userName}</Typography.Body14_700>
    </Container>
  );
};
