import tw, { styled } from 'twin.macro';

const Body14_400 = styled.span`
  ${tw`text-sm font-normal`}
`;
const Body14_700 = styled.span`
  ${tw`text-sm font-bold`}
`;

const Body16_400 = styled.span`
  ${tw`text-base font-normal`}
`;
const Body16_700 = styled.span`
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
  Body14_400,
  Body14_700,
  Body16_400,
  Body16_700,
  H1,
  H2,
  H3,
};
