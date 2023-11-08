import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';

type Props = {
  intent?: 'primary' | 'secondary' | 'error';
  variant?: 's' | 'm' | 'l';
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  children,
  intent = 'primary',
  variant = 'm',
  ...native
}) => {
  return (
    <ButtonStyled intent={intent} variant={variant} {...native}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<Omit<Props, 'children'>>`
  ${tw`transition-colors duration-300`}
  ${tw`rounded-lg border-2 border-solid cursor-pointer px-2`}

  ${({ intent, disabled }) =>
    intent === 'primary' &&
    !disabled &&
    css`
      ${tw`bg-emerald-300 border-emerald-400 text-emerald-900`}
      ${tw`hover:(bg-yellow-400 text-yellow-900 border-yellow-500)`}
    `}
    
  ${({ variant }) => variant === 'l' && tw`min-w-[6.25rem] min-h-[2.5rem]`}

  ${({ disabled }) =>
    disabled &&
    tw`border-gray-400 bg-gray-100 text-gray-500 placeholder:text-gray-500`}
`;
