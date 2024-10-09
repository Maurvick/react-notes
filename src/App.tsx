import './App.css';

import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NoteDetails from './components/NoteDetails';
import NoteEditor from './components/NoteEditor';
import { useNotes } from './hooks/useNotes';

function App() {
  const { notes } = useNotes();

  return (
    <Router>
      <Routes>
        <Route path='/' element={<NoteEditor />} />
        <Route path='/note/:id' element={<NoteDetails notes={notes} />} />
      </Routes>
    </Router>
  );
}

export default App;
