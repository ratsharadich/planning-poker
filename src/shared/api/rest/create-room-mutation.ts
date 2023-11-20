import axios, { AxiosError } from 'axios';
import { api } from './constants';

export const createRoom = async ({
  roomName,
  userId,
}: {
  roomName: string;
  userId: string;
}) => {
  try {
    const response = await api.post(`/room`, {
      name: roomName,
      userId,
    });
    if (response.status === 201) return response.data;
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to create room: ${error.message}`);
    } else if (error instanceof Error) {
      throw new Error(
        `An unexpected error occurred while creating room!: ${error.message}`,
      );
    }
  }
};
