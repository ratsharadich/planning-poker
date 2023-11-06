import { Reducer, useReducer } from 'react';

export type ReducerAsStateAction<T> =
  | Partial<T>
  | ((state: T) => Partial<T> | null);

const defaultReducer = <T>(state: T, partialState: ReducerAsStateAction<T>) => {
  const changes =
    typeof partialState === 'function' ? partialState(state) : partialState;

  if (changes === null || changes === state) return state;

  const newState = { ...state, ...changes };

  return newState;
};

export const useReducerAsState = <T extends Record<string, unknown>>(
  initial: T | (() => T),
) => {
  return useReducer<Reducer<T, ReducerAsStateAction<T>>>(
    defaultReducer,
    typeof initial === 'function' ? initial() : initial,
  );
};
