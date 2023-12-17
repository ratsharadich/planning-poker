import { AxiosResponse } from 'axios';
import { api } from './constants';

export const createRoom = async ({
  roomName,
  userId,
}: {
  roomName: string;
  userId: string;
}): Promise<string | undefined> => {
  const response: AxiosResponse<{ data: string }> = await api.post(`/room`, {
    name: roomName,
    userId,
  });
  if (response.status === 201) return response.data.data;
  throw new Error(`Request failed with status ${response.status}`);
};
