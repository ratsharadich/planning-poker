import { FC, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

type Props = {
  className?: string;
  children: ReactNode;
};

export const Page: FC<Props> = ({ className, children }) => {
  return <Container className={className}>{children}</Container>;
};

const Container = styled.section`
  ${tw`h-[100dvh] w-[100dvw] p-2`}
`;
