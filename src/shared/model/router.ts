import { createEffect } from 'effector';
import { router } from 'src/router';

export const gotToMainPageFx = createEffect(() => router.navigate('/'));

export const goToRoomFx = createEffect((roomId: string) => {
  router.navigate(`/room/${roomId}`);
});
