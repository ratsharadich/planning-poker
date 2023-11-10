import { FC } from 'react';
import { CardValue, UserId } from 'shared';
import tw, { css, styled } from 'twin.macro';

type Props = {
  shown: boolean;
  value: CardValue;
};

export const Card: FC<Props> = ({ shown, value }) => {
  return (
    <CardStyled className="group">
      <Face shown={shown}>{value}</Face>
      <Back hide={shown} highlighted={Boolean(value)} />
    </CardStyled>
  );
};

const CardStyled = styled.article`
  ${tw`w-10 h-[4.375rem] relative`}
  ${css`
    perspective: 150rem;
  `}
`;

const Side = styled.div`
  ${tw`absolute h-full w-full rounded-lg`}
  ${tw`transition-transform duration-[0.8s]`}
  ${css`
    backface-visibility: hidden;
  `}
`;

const Face = styled(Side)<{ shown: boolean }>`
  ${tw`flex justify-center items-center text-emerald-800`}
  ${tw`border-2 border-emerald-400 border-solid`}
  ${css`
    transform: rotateY(180deg) rotateZ(50deg);
  `}
  ${({ shown }) =>
    shown &&
    css`
      transform: rotateY(0);
    `}
`;

const Back = styled(Side)<{ highlighted: boolean; hide: boolean }>`
  ${({ highlighted }) => (highlighted ? tw`bg-emerald-200` : tw`bg-gray-200`)}
  ${({ hide }) =>
    hide &&
    css`
      transform: rotateY(-180deg) rotateZ(-50deg);
    `}
`;
