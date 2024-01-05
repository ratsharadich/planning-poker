import { createEffect } from 'effector';
import { router } from 'src/router';

export const go_to_main_page_fx = createEffect(() => router.navigate('/'));

export const go_to_room_fx = createEffect((roomId: string) => {
  router.navigate(`/room/${roomId}`);
});
