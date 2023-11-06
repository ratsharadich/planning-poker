import axios, { AxiosError } from 'axios';
import { api } from 'shared/config';

export type RoomType = {
  room: {
    id: string;
    name: string;
  };
  users: Array<{
    id: string;
    name: string;
  }>;
  timestamp: number;
};

export const getRoom = async (roomId: string): Promise<RoomType> => {
  try {
    const response = await api.get(`/users`, {
      params: {
        roomId,
      },
    });
    if (response.status === 200) return response.data;
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    } else {
      throw new Error('An unexpected error occurred while fetching users.');
    }
  }
};
