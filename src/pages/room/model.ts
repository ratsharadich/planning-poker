import { sample } from 'effector';
import { createGate } from 'effector-react';

// gates
export const RoomGate = createGate<{ roomId: string }>();

// handlers
sample({
  clock: RoomGate.open,
});

// wathcers
// RoomGate.open.watch(props => console.log(props));
