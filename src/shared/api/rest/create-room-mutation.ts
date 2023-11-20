import axios, { AxiosResponse } from 'axios';
import { api } from './constants';

const handleApiError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.error(`Failed to create room: ${error.message}`);
  } else if (error instanceof Error) {
    console.error(
      `An unexpected error occurred while creating room!: ${error.message}`,
    );
  }
};

export const createRoom = async ({
  roomName,
  userId,
}: {
  roomName: string;
  userId: string;
}): Promise<string | undefined> => {
  try {
    const response: AxiosResponse<{ data: string }> = await api.post(`/room`, {
      name: roomName,
      userId,
    });
    if (response.status === 201) return response.data.data;
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    handleApiError(error);
    return;
  }
};
