import { useEffect, useState } from 'react';

export function useLocalStorage<T>(
  key: string
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    // return use item if jsonValue not null
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    } else {
      return '';
    }
  });

  // update localStorage if value changed
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
