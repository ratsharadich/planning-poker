import { FC, InputHTMLAttributes } from 'react';
import tw, { css, styled } from 'twin.macro';
import { Typography } from './typography';

type Props = {
  intent?: 'primary' | 'secondary' | 'error';
  variant?: 's' | 'm' | 'l';
  label?: string;
  disabled?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<Props> = ({
  intent = 'primary',
  variant = 'm',
  label,
  disabled,
  ...native
}) => {
  return (
    <label tw="flex flex-col">
      {label && <Typography.Body14_400>{label}</Typography.Body14_400>}

      <InputStyled
        intent={intent}
        variant={variant}
        disabled={disabled}
        {...native}
      />
    </label>
  );
};

const InputStyled = styled.input<
  Pick<Props, 'intent' | 'variant' | 'disabled'>
>`
  ${tw`w-full rounded-lg border-solid border-2 px-2`}
  ${tw`transition-[outline-width] box-border`}

  ${({ intent, disabled }) =>
    intent === 'primary' &&
    !disabled &&
    css`
      ${tw`border-emerald-400 bg-emerald-100 text-emerald-900 placeholder:text-emerald-900`}
      ${tw`group-hover:(outline outline-2 outline-emerald-200 bg-emerald-50)`}
      ${tw`focus:(outline outline-2 outline-emerald-200 bg-emerald-50)`}
    `}

  ${({ variant }) => variant === 'l' && tw`h-9`}

  ${({ disabled }) =>
    disabled &&
    tw`border-gray-400 bg-gray-100 text-gray-500 placeholder:text-gray-500`}
`;
