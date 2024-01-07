import { useUnit } from 'effector-react';
import { FC, memo } from 'react';
import { Input } from 'shared/ui';
import { $room_name, room_name_changed } from 'shared/model/coords';

export const RoomName: FC = memo(() => {
  const [roomName, onChange] = useUnit([$room_name, room_name_changed]);
  return (
    <Input
      variant="l"
      label="Название игры"
      value={roomName}
      onChange={onChange}
    />
  );
});
