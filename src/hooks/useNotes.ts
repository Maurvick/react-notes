import { useDispatch, useSelector } from 'react-redux';
import { Note } from '../models/Note';
import { addNote, deleteNote } from '../redux/noteSlice';
import { AppDispatch } from '../redux/store';
import { RootState } from '../redux/store';

export function useNotes() {
  const notes = useSelector((state: RootState) => state.notes.notes);
  const dispatch: AppDispatch = useDispatch();

  const createNote = (note: Note) => {
    dispatch(addNote(note));
  };

  const removeNote = (id: string) => {
    dispatch(deleteNote(id));
  };

  return {
    notes,
    createNote,
    removeNote,
  };
}
