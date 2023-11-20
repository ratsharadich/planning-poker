import axios, { AxiosError } from 'axios';
import { api } from './constants';

export const getRoom = async ({ roomId }: { roomId: string }) => {
  try {
    const response = await api.get(`/room/${roomId}`);
    if (response.status === 200) return response.data;
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Failed to fetch room: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(
        `An unexpected error occurred while fetching room!: ${error.message}`,
      );
    }
  }
};
