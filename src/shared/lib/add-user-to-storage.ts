import { createGuid } from './createGuid';

type Args = {
  userName: string;
};

export const addUserToStorage = ({ userName }: Args) => {
  const userId = createGuid();
  localStorage.setItem('userId', userId);
  localStorage.setItem('userName', userName);

  return { userId, userName };
};
