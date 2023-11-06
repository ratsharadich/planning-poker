import tw, { styled } from 'twin.macro';

const Body1_400 = styled.span`
  ${tw`text-base font-normal`}
`;
const Body1_700 = styled.span`
  ${tw`text-base font-bold`}
`;

const H1 = styled.h1`
  ${tw`font-bold text-3xl m-0`}
`;
const H2 = styled.h2`
  ${tw`font-bold text-2xl m-0`}
`;
const H3 = styled.h3`
  ${tw`font-bold text-xl m-0`}
`;

export const Typography = {
  Body1_400,
  Body1_700,
  H1,
  H2,
  H3,
};
