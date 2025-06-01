import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FirstPage from './components/first_page';
import LevelSelect from './components/LevelSelect';
import Game from './components/Game';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/level-select" element={<LevelSelect />} />
        <Route path="/game/:levelId" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;