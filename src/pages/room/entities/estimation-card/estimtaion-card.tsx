import { useUnit } from 'effector-react';
import { FC } from 'react';
import tw, { styled } from 'twin.macro';
import { task_estimated } from './model';

type Props = {
  assessment: string;
};

export const EstimationCard: FC<Props> = ({ assessment }) => {
  const onEstimate = useUnit(task_estimated);

  return (
    <CardStyled onClick={() => onEstimate(assessment)}>{assessment}</CardStyled>
  );
};

const CardStyled = styled.article`
  ${tw`w-14 h-20 rounded-lg cursor-pointer`}
  ${tw`flex justify-center items-center shrink-0`}
  ${tw`border-2 border-emerald-400 border-solid`}
  ${tw`transition-[transform,background-color] hover:(-translate-y-3 bg-emerald-50)`}
`;
