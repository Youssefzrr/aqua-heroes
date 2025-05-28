import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importez useNavigate
import './LevelSelect.css';

interface Level {
  id: number;
  stars: number;
  locked: boolean;
}

const levels: Level[] = [
  { id: 1, stars: 3, locked: false },
  { id: 2, stars: 3, locked: true },
  { id: 3, stars: 3, locked: true },
  { id: 4, stars: 2, locked: true },
  { id: 5, stars: 1, locked: true },
  { id: 6, stars: 3, locked: true },
  { id: 7, stars: 2, locked: true },
  { id: 8, stars: 0, locked: true },
  { id: 9, stars: 0, locked: true },
  { id: 10, stars: 0, locked: true },
];

const LevelSelect: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const levelsPerPage = 10;
  const navigate = useNavigate(); // Initialisez useNavigate

  const startIndex = (currentPage - 1) * levelsPerPage;
  const endIndex = startIndex + levelsPerPage;
  const currentLevels = levels.slice(startIndex, endIndex);

  const totalPages = Math.ceil(levels.length / levelsPerPage);
  const hasPreviousPage = currentPage > 1;
  const hasNextPage = currentPage < totalPages;

  const renderStars = (level: Level) => {
    const totalStars = 3;
    return (
      <div className="stars">
        {[...Array(totalStars)].map((_, index) => (
          <span 
            key={index} 
            className={`star ${index < level.stars ? 'filled' : 'empty'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  // Fonction pour gérer le clic sur un niveau
  const handleLevelClick = (levelId: number, locked: boolean) => {
    if (!locked) {
      navigate(`/game/${levelId}`); // Redirige vers la page du jeu avec le levelId
    } else {
      alert('Ce niveau est verrouillé !');
    }
  };

  return (
    <div className="game-container">
      <div className="background-clouds">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
      </div>
      
      <div className="level-select-board">
        <div className="title-banner">
          <h1>Level Select</h1>
        </div>
        
        <button className="close-btn">×</button>
        
        <div className="levels-container">
          <div className="levels-grid">
            {currentLevels.map((level) => (
              <div
                key={level.id}
                className={`level-box ${level.locked ? 'locked' : 'unlocked'}`}
                onClick={() => handleLevelClick(level.id, level.locked)} // Gère le clic
              >
                {level.locked && <div className="lock-icon">🔒</div>}
                <div className="level-number">{level.id}</div>
                {renderStars(level)}
              </div>
            ))}
          </div>
        </div>
        
        <div className="navigation">
          <button 
            className="nav-btn prev-btn"
            disabled={!hasPreviousPage}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            ◀
          </button>
          
          <div className="page-dots">
            {[...Array(totalPages)].map((_, index) => (
              <span 
                key={index}
                className={`dot ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => setCurrentPage(index + 1)}
              ></span>
            ))}
          </div>
          
          <button 
            className="nav-btn next-btn"
            disabled={!hasNextPage}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            ▶
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;