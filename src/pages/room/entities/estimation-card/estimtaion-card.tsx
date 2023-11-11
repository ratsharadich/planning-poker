import { FC } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  assessment: string | number;
  onEstimate: (assesment: string | number) => void;
};

export const EstimationCard: FC<Props> = ({ assessment, onEstimate }) => {
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
