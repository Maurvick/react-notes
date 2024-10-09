import { useRef } from 'react';
import NoteSidebar from './NoteSidebar';

export default function NoteEditor() {
  const noteTitleRef = useRef<HTMLTextAreaElement>(null);
  const noteContentRef = useRef<HTMLTextAreaElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <NoteSidebar
        noteTitleRef={noteTitleRef}
        noteContentRef={noteContentRef}
        searchRef={searchRef}
      />

      <div className='editor'>
        <textarea
          className='note-title'
          ref={noteTitleRef}
          placeholder='Title'
        />

        <textarea
          className='note-content'
          ref={noteContentRef}
          placeholder='Write your note here...'
        />
      </div>
    </>
  );
}
