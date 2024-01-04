import { createGate } from 'effector-react';

export const RoomGate = createGate<{ roomId: string; userId: string }>();
