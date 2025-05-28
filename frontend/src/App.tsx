import React from 'react';
import Game from './components/Game';
import LevelSelect from './components/LevelSelect';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Route pour la page de sélection des niveaux */}
          <Route path="/" element={<LevelSelect />} />
          {/* Route pour la page du jeu (niveau spécifique) */}
          <Route path="/game/:levelId" element={<Game />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App; 