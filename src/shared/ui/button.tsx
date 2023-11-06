import { FC, HTMLAttributes, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = {
  intent?: 'primary' | 'secondary';
  size?: 's' | 'm' | 'l';
  children: ReactNode;
} & HTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  children,
  intent = 'primary',
  size = 'm',
  ...native
}) => {
  return (
    <ButtonStyled intent={intent} size={size} {...native}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<Omit<Props, 'children'>>`
  ${tw`rounded-lg border-2 border-solid cursor-pointer`}
  ${tw`transition-colors duration-300`}

  ${({ intent }) =>
    intent === 'primary' &&
    css`
      ${tw`bg-emerald-300 border-emerald-400 text-emerald-900`}
      ${tw`hover:(bg-yellow-400 text-yellow-900 border-yellow-500)`}
    `}
    
  ${({ size }) => size === 'l' && tw`min-w-[6.25rem] min-h-[3.125rem]`}
`;
