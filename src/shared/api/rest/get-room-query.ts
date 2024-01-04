import { AxiosResponse } from 'axios';
import { api } from './constants';
import { Room } from 'shared/types';

export const getRoom = async (roomId: string): Promise<Room> => {
  const response: AxiosResponse<{ data: Room }> = await api.get(
    `/room/${roomId}`,
  );
  if (response.status === 200) return response.data.data;
  throw new Error(`Request failed with status ${response.status}`);
};
