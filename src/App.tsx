import './App.css';

import { useEffect, useRef, useState } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { INote } from './models/INote';

function App() {
  const [notes, setNotes] = useLocalStorage<INote[]>('notes');
  const [sortedNotes, setSortedNotes] = useState(notes);
  const title = useRef<HTMLTextAreaElement>(null);
  const content = useRef<HTMLTextAreaElement>(null);
  const searchInput = useRef<HTMLInputElement>(null);

  const handleAddNote = () => {
    setNotes([
      ...notes,
      {
        id: (notes.length + 1).toString(),
        title: title.current?.value || '',
        content: content.current?.value || '',
        createdAt: Date.now().toString(),
        updatedAt: Date.now().toString(),
      },
    ]);
    // Reset all input fields
    title.current!.value = '';
    content.current!.value = '';
    searchInput.current!.value = '';
  };

  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter((note: INote) => note.id !== id));
  };

  const handleSearch = () => {
    const searchValue = searchInput.current!.value.toLowerCase();
    if (searchValue.length <= 0) {
      // Reset to default notes when input is empty
      setSortedNotes(notes);
    } else {
      // Filter notes based on search value
      const filteredNotes = notes.filter((note: INote) =>
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
    <>
      <div className='sidebar'>
        <h1>Notes</h1>

        <input
          type='text'
          placeholder='Search...'
          ref={searchInput}
          onInput={() => handleSearch()}
        />

        <ul className='note-list'>
          {sortedNotes.map((note: INote) => (
            <li className='note-item' key={note.id}>
              {note.title}
              <span
                className='button-close'
                onClick={() => handleDeleteNote(note.id)}
              >
                &times;
              </span>
            </li>
          ))}
        </ul>

        <button className='button-blue' onClick={() => handleAddNote()}>
          Add Note
        </button>
      </div>

      <div className='editor'>
        <textarea className='note-title' ref={title} placeholder='Title' />

        <textarea
          className='note-content'
          ref={content}
          placeholder='Write your note here...'
        />
      </div>
    </>
  );
}

export default App;
