import axios, { AxiosError } from 'axios';
import { api } from './constants';

export const createUser = async ({ userName }: { userName: string }) => {
  const url = `${api.defaults.baseURL}/user`;
  console.log(`Request URL: ${url}`);

  try {
    const response = await api.post(`/user`, {
      name: userName,
    });
    if (response.status === 201) return response.data;
    throw new Error(`Request failed with status ${response.status}`);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Failed to create user: ${error.message}`);
    } else if (error instanceof Error) {
      console.error(
        `An unexpected error occurred while creating user!: ${error.message}`,
      );
    }
  }
};
