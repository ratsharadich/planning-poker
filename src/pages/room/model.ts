import { createGate } from 'effector-react';

// gates
export const RoomGate = createGate<{ roomId: string }>();

// side effects
RoomGate.open.watch(props => console.log(props));
