import { FC } from 'react';
import { CardList } from 'shared';
import tw, { styled } from 'twin.macro';
import { splitCards } from './lib';

type Props = {
  shown: boolean;
  cards: CardList;
};

export const Table: FC<Props> = ({ shown, cards }) => {
  const { left, top, right, bottom } = splitCards({ shown, cards });

  return (
    <Container>
      <Top>{top}</Top>
      <Left>{left}</Left>

      <div tw="p-4 col-start-2 col-end-2">
        <TableStyled></TableStyled>
      </div>

      <Right>{right}</Right>
      <Bottom>{bottom}</Bottom>
    </Container>
  );
};

const Container = styled.section`
  ${tw`grid grid-cols-[2.5rem,1fr,2.5rem] grid-rows-[4.375rem,1fr,4.375rem]`}
  ${tw`w-full max-w-[50rem] px-4`}
`;

const TableStyled = styled.div`
  ${tw`bg-black rounded-3xl`}
  ${tw`w-full min-w-[10rem] h-[13.375rem]`}
`;

const Top = tw.div`col-start-2 row-start-1 flex justify-center items-center`;
const Left = tw.div`col-start-1 row-start-2 flex justify-center items-center`;
const Right = tw.div`col-start-3 row-start-2 flex justify-center items-center`;
const Bottom = tw.div`col-start-2 row-start-3 flex justify-center items-center`;
