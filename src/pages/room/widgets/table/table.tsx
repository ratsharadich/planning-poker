import { FC } from 'react';
import tw, { styled } from 'twin.macro';
import { useGate } from 'effector-react';
import { TableGate } from './model';
import { Bottom, Desk, Left, Right, Top } from './ui';

export const Table: FC = () => {
  useGate(TableGate);

  return (
    <Container>
      <Top />
      <Left />

      <Desk />

      <Right />
      <Bottom />
    </Container>
  );
};

const Container = styled.section`
  ${tw`grid grid-cols-[2.5rem,1fr,2.5rem] grid-rows-[4.375rem,1fr,4.375rem]`}
  ${tw`w-full max-w-[30rem] px-4`}
`;
