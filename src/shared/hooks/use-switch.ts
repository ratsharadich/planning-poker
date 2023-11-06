import { useCallback, useState } from 'react';

export const useSwitch = (initial: boolean) => {
  const [state, setState] = useState(initial);
  const on = useCallback(() => setState(true), []);
  const off = useCallback(() => setState(false), []);
  const toggle = useCallback(() => setState(prev => !prev), []);
  return [state, { on, off, toggle }] as const;
};
