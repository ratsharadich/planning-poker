import tw, { css, styled } from 'twin.macro';

export const CardStyled = styled.article`
  ${tw`w-10 h-[4.375rem] relative shrink-0`}
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

export const Face = styled(Side)<{ shown: boolean }>`
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

const cardShirt = (color: string) => css`
  background: linear-gradient(90deg, ${color} 50%, transparent 0),
    linear-gradient(${color} 50%, transparent 0);
  background-size: 1rem 1rem;
`;

export const Back = styled(Side)<{ highlighted: boolean; hide: boolean }>`
  ${({ highlighted }) =>
    highlighted
      ? cardShirt('rgba(245, 158, 11, 0.6)')
      : cardShirt('rgba(16, 185, 129, 0.6)')}
  ${({ hide }) =>
    hide &&
    css`
      transform: rotateY(-180deg) rotateZ(-50deg);
    `}
`;
