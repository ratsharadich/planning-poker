import { AxiosResponse } from 'axios';
import { api } from './constants';

export const createUser = async ({
  userName,
}: {
  userName: string;
}): Promise<string | undefined> => {
  console.log('sdfsddddd', userName);

  const response: AxiosResponse<{ data: string }> = await api.post(`/user`, {
    name: userName,
  });
  if (response.status === 201) return response.data.data;
  throw new Error(`Request failed with status ${response.status}`);
};
