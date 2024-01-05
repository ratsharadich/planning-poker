import { useUnit } from 'effector-react';
import { FC, memo } from 'react';
import { Input } from 'shared/ui';
import { $user_name, user_name_changed } from 'shared/model/coords';

export const UserName: FC = memo(() => {
  const [userName, onChange] = useUnit([$user_name, user_name_changed]);
  return (
    <Input variant="l" label="Ваше имя" value={userName} onChange={onChange} />
  );
});
