import { useUnit } from 'effector-react';
import { FC, memo } from 'react';
import tw, { styled } from 'twin.macro';
import { cards_uncovered } from '../model';
import { Button } from 'shared/ui';

export const Desk: FC = memo(() => {
  const uncoverCards = useUnit(cards_uncovered);

  return (
    <div tw="p-4 col-start-2 col-end-2">
      <DeskStyled>
        <Button dimension="l" variant="white" onClick={uncoverCards}>
          Показать карты
        </Button>
      </DeskStyled>
    </div>
  );
});

const DeskStyled = styled.div`
  ${tw`flex justify-center items-center`}
  ${tw`bg-emerald-300 rounded-3xl relative`}
  ${tw`transition-[height] duration-300`}
  ${tw`w-full min-w-[10rem] h-[13.375rem] md:h-[9.375rem]`}
`;
