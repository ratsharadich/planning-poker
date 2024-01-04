import { FC, useCallback } from 'react';
import tw, { styled } from 'twin.macro';
import { splitCards } from './lib';
import { useUnit } from 'effector-react';
import { Card } from 'shared/types';
import { $socket, toggleRoomShowStateFx } from 'shared/model/socket';
import { Button } from 'shared/ui';
import { $cardsShown } from '../../model';

type Props = {
  cards: Card[];
};

export const Table: FC<Props> = ({ cards }) => {
  const [socket, shown, toggleShown] = useUnit([
    $socket,
    $cardsShown,
    toggleRoomShowStateFx,
  ]);

  const { left, top, right, bottom } = splitCards({ shown, cards });

  const toggleShowCards = useCallback(
    () => socket && toggleShown(socket),
    [socket],
  );

  return (
    <Container>
      <Top>{top}</Top>
      <Left>{left}</Left>

      <div tw="p-4 col-start-2 col-end-2">
        <TableStyled>
          <Button dimension="l" variant="white" onClick={toggleShowCards}>
            Показать карты
          </Button>
        </TableStyled>
      </div>

      <Right>{right}</Right>
      <Bottom>{bottom}</Bottom>
    </Container>
  );
};

const Container = styled.section`
  ${tw`grid grid-cols-[2.5rem,1fr,2.5rem] grid-rows-[4.375rem,1fr,4.375rem]`}
  ${tw`w-full max-w-[30rem] px-4`}
`;

const TableStyled = styled.div`
  ${tw`flex justify-center items-center`}
  ${tw`bg-emerald-300 rounded-3xl relative`}
  ${tw`transition-[height] duration-300`}
  ${tw`w-full min-w-[10rem] h-[13.375rem] md:h-[9.375rem]`}
`;

const Side = tw.div`flex justify-center items-center gap-8`;
const Top = tw(Side)`col-start-2 row-start-1`;
const Left = tw(Side)`col-start-1 row-start-2`;
const Right = tw(Side)`col-start-3 row-start-2`;
const Bottom = tw(Side)`col-start-2 row-start-3`;
