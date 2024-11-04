import { useCallback, useState } from 'react';

export const useToggle = (
  initialState: boolean = false
): {
  isToggleOn: boolean;
  toggleOn: () => void;
  toggleOff: () => void;
  toggle: () => void;
} => {
  const [isToggleOn, setIsOn] = useState(initialState);

  const toggleOn = useCallback(() => setIsOn(true), []);
  const toggleOff = useCallback(() => setIsOn(false), []);
  const toggle = useCallback(() => setIsOn((state) => !state), []);

  return { isToggleOn, toggleOn, toggleOff, toggle };
};
