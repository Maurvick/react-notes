import { useEffect, useState } from 'react';
import { useNotes } from '../hooks/useNotes';
import NoteList from './NoteList';

interface NoteSidebarProps {
  noteTitleRef?: React.RefObject<HTMLTextAreaElement>;
  noteContentRef?: React.RefObject<HTMLTextAreaElement>;
  searchRef?: React.RefObject<HTMLInputElement>;
}

export default function NoteSidebar({
  noteTitleRef,
  noteContentRef,
  searchRef,
}: NoteSidebarProps) {
  const { notes, createNote, removeNote } = useNotes();
  const [sortedNotes, setSortedNotes] = useState(notes);

  const handleAddNote = () => {
    const titleValue = noteTitleRef?.current!.value;
    const contentValue = noteContentRef?.current!.value;
    if (!titleValue || !contentValue) {
      return;
    }
    const note = {
      id: (notes.length + 1).toString(),
      title: noteTitleRef.current?.value || '',
      content: noteContentRef.current?.value || '',
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };
    createNote(note);
    // Reset all input fields
    noteTitleRef.current!.value = '';
    noteContentRef.current!.value = '';
    searchRef!.current!.value = '';
  };

  const handleSearch = () => {
    const searchValue = searchRef!.current!.value.toLowerCase();
    if (searchValue.length <= 0) {
      // Reset to default notes when input is empty
      setSortedNotes(notes);
    } else {
      // Filter notes based on search value
      const filteredNotes = notes.filter((note) =>
        note.title.toLowerCase().includes(searchValue)
      );
      setSortedNotes(filteredNotes);
    }
  };

  // Update sortedNotes when notes changed
  useEffect(() => {
    setSortedNotes(notes);
  }, [notes]);

  return (
    <div className='sidebar'>
      <h1>Notes</h1>

      <input
        type='text'
        placeholder='Search...'
        ref={searchRef}
        onInput={() => handleSearch()}
      />

      {/* TODO: Add drag&drop */}
      {/* TODO: Add note union */}
      {/* TODO: Add note tags */}
      {/* TODO: Add scrollbar */}
      {/* TODO: Add folders */}
      {/* TODO: Add checks */}

      <NoteList notes={sortedNotes} removeNote={removeNote} />

      <button className='button-blue' onClick={() => handleAddNote()}>
        Add Note
      </button>
    </div>
  );
}
