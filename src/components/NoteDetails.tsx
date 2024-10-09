import { useParams } from 'react-router-dom';
import { Note } from '../models/Note';
import NoteSidebar from './NoteSidebar';

export interface NoteDetailsProps {
  notes: Note[];
}

export default function NoteDetails({ notes }: NoteDetailsProps) {
  const { id } = useParams();
  const note = notes.find((note) => note.id === id)!;

  if (!note) {
    return <h2>Note not found</h2>;
  }

  return (
    <>
      <NoteSidebar />

      <div className='note-details'>
        <h1>{note.title}</h1>
        <p>{note.content}</p>
      </div>
    </>
  );
}
