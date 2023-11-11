import { ButtonHTMLAttributes, FC, ReactNode } from 'react';
import tw, { css, styled } from 'twin.macro';

type ButtonIntent = 'primary' | 'white';

type Props = {
  variant?: ButtonIntent;
  dimension?: 'm' | 'l';
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({
  children,
  variant: intent = 'primary',
  dimension: variant = 'm',
  ...native
}) => {
  return (
    <ButtonStyled variant={intent} dimension={variant} {...native}>
      {children}
    </ButtonStyled>
  );
};

const ButtonStyled = styled.button<Omit<Props, 'children'>>`
  ${tw`transition-colors duration-300`}
  ${tw`rounded-lg border-2 border-solid cursor-pointer px-2 relative`}

  ${({ variant: intent, disabled }) =>
    intent === 'primary' &&
    !disabled &&
    css`
      ${tw`bg-emerald-300 border-emerald-400 text-emerald-900`}
      ${tw`hover:(bg-yellow-400 text-yellow-900 border-yellow-500)`}
    `}

    ${({ variant: intent, disabled }) =>
    intent === 'white' &&
    !disabled &&
    css`
      ${tw`bg-white border-white text-emerald-900 transition-shadow`}
      ${tw`shadow-[0_0_0.75rem_white] hover:shadow-[0_0_1.5rem_0.5rem_white]`}
    `}
      
      
  ${({ dimension }) => dimension === 'l' && tw`min-w-[6.25rem] min-h-[2.5rem]`}
  ${({ dimension }) => dimension === 'm' && tw`min-w-[5rem] min-h-[1.875rem]`}

  ${({ disabled }) =>
    disabled &&
    tw`border-gray-400 bg-gray-100 text-gray-500 placeholder:text-gray-500`}
`;
