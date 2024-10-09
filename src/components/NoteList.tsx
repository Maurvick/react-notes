import { useNavigate } from 'react-router-dom';
import { Note } from '../models/Note';

interface NoteListProps {
  notes: Note[];
  removeNote: (id: string) => void;
}

export default function NoteList({
  notes: sortedNotes,
  removeNote,
}: NoteListProps) {
  const navigate = useNavigate();

  const handleItemClick = (id: string): void => {
    navigate(`/note/${id}`);
  };

  return (
    <ul className='note-list'>
      {sortedNotes.map((note) => (
        <li
          className='note-item'
          key={note.id}
          onClick={() => handleItemClick(note.id)}
        >
          {note.title}
          <span className='button-close' onClick={() => removeNote(note.id)}>
            &times;
          </span>
        </li>
      ))}
    </ul>
  );
}
