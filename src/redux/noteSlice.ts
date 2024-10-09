import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Note } from '../models/Note';
import { getNotes, setNotes } from '../hooks/useLocalStorage';

interface NoteState {
  notes: Note[];
}

const initialState: NoteState = {
  notes: getNotes(),
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    addNote: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload);
      setNotes(state.notes);
    },
    deleteNote: (state, action: PayloadAction<string>) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
      setNotes(state.notes);
    },
    updateNotes: (state, action: PayloadAction<Note[]>) => {
      state.notes = action.payload;
      setNotes(state.notes);
    },
  },
});

export const { addNote, deleteNote, updateNotes } = noteSlice.actions;
export default noteSlice.reducer;
