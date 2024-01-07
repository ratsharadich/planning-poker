import { useUnit } from 'effector-react';
import { FC } from 'react';
import { Button } from 'shared/ui';
import { $disabled } from '../model';

export const Submit: FC = () => {
  const disabled = useUnit($disabled);
  return (
    <Button type="submit" dimension="l" tw="w-full mt-2" disabled={disabled}>
      Создать игру
    </Button>
  );
};
