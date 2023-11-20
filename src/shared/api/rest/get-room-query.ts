import axios, { AxiosError, AxiosResponse } from 'axios';
import { api } from './constants';
import { Room } from 'shared';

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error(`Failed to fetch room: ${error.message}`);
  } else if (error instanceof Error) {
    console.error(
      `An unexpected error occurred while fetching room!: ${error.message}`,
    );
  }
};

export const getRoom = async ({
  roomId,
}: {
  roomId: string;
}): Promise<Room | undefined> => {
  try {
    const response: AxiosResponse<{ data: Room }> = await api.get(
      `/room/${roomId}`,
    );
    if (response.status === 200) return response.data.data;
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    handleApiError(error);
    return;
  }
};
