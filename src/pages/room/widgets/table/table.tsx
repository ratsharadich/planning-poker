import { FC, MutableRefObject, useCallback } from 'react';
import { Button, CardList, SocketActions } from 'shared';
import tw, { styled } from 'twin.macro';
import { splitCards } from './lib';
import { Socket } from 'socket.io-client';

type Props = {
  shown: boolean;
  cards: CardList;
  socketRef: MutableRefObject<Socket | null>;
};

export const Table: FC<Props> = ({ socketRef, shown, cards }) => {
  const { left, top, right, bottom } = splitCards({ shown, cards });

  const handleShowCards = useCallback(() => {
    if (socketRef.current) {
      SocketActions.setCardsShown({
        socket: socketRef.current,
        show: !shown,
      });
    }
  }, [shown]);

  return (
    <Container>
      <Top>{top}</Top>
      <Left>{left}</Left>

      <div tw="p-4 col-start-2 col-end-2">
        <TableStyled>
          <Button dimension="l" variant="white" onClick={handleShowCards}>
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

const Top = tw.div`col-start-2 row-start-1 flex justify-center items-center`;
const Left = tw.div`col-start-1 row-start-2 flex justify-center items-center`;
const Right = tw.div`col-start-3 row-start-2 flex justify-center items-center`;
const Bottom = tw.div`col-start-2 row-start-3 flex justify-center items-center`;
