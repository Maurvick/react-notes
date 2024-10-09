import { useEffect, useState } from 'react';
import { Note } from '../models/Note';

export function useLocalStorage<T>(
  key: string
): [T | [], React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const jsonValue = localStorage.getItem(key);
    // return item if jsonValue not null
    if (jsonValue != null) {
      return JSON.parse(jsonValue);
    } else {
      return [];
    }
  });
  // update localStorage if value changed
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

export function getNotes(): Note[] {
  return JSON.parse(localStorage.getItem('notes') || '[]');
}

export function setNotes(notes: Note[]): void {
  localStorage.setItem('notes', JSON.stringify(notes));
}
