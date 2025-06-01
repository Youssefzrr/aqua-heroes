import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LevelSelect.css';

interface Level {
  id: number;
  stars: number;
  locked: boolean;
  title: string;
  waterSaved: number;
}

const levels: Level[] = [
  { 
    id: 1, 
    stars: 0, 
    locked: false,
    title: " Water & Lake Conservation",
    waterSaved: 0
  },
  { 
    id: 2, 
    stars: 0, 
    locked: true,
    title: "Water-Conscious Pool Manager",
    waterSaved: 0
  },
  { 
    id: 3, 
    stars: 0, 
    locked: true,
    title: "Eco-Friendly Garden Expert",
    waterSaved: 0
  },
  { 
    id: 4, 
    stars: 0, 
    locked: true,
    title: "Efficient Laundry Specialist",
    waterSaved: 0
  },
  { 
    id: 5, 
    stars: 0, 
    locked: true,
    title: "Sustainable Car Washing",
    waterSaved: 0
  },
  { 
    id: 6, 
    stars: 0, 
    locked: true,
    title: "Water-Conscious Pool Manager 2",
    waterSaved: 0
  },
  { 
    id: 7, 
    stars: 0, 
    locked: true,
    title: "Rainwater Harvesting Pro",
    waterSaved: 0
  },
  { 
    id: 8, 
    stars: 0, 
    locked: true,
    title: "Water Conservation Detective",
    waterSaved: 0
  },
  { 
    id: 9, 
    stars: 0, 
    locked: true,
    title: "Environmental Water Explorer",
    waterSaved: 0
  },
  { 
    id: 10, 
    stars: 0, 
    locked: true,
    title: "Ultimate Water Champion",
    waterSaved: 0
  }
];

const LevelSelect: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalWaterSaved, setTotalWaterSaved] = useState(0);
  const levelsPerPage = 5;
  const navigate = useNavigate();

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
            ⭐
          </span>
        ))}
      </div>
    );
  };

  const handleLevelClick = (levelId: number, locked: boolean) => {
    if (!locked) {
      navigate(`/Level${levelId}`);
    } else {
      alert('Complete the previous level first to unlock this one!');
    }
  };

  return (
    <div className="game-container">
      
      
      <div className="level-select-board">
        <div className="title-banner">
          <h1>Water-Saving Adventures</h1>
          <p className="subtitle">Choose your next mission!</p>
        </div>
        
        <div className="levels-container">
          <div className="levels-grid">
            {currentLevels.map((level) => (
              <div
                key={level.id}
                className={`level-box ${level.locked ? 'locked' : 'unlocked'}`}
                onClick={() => handleLevelClick(level.id, level.locked)}
              >
                <div className="level-content">
                  {level.locked ? (
                    <div className="lock-icon">🔒</div>
                  ) : (
                    <div className="level-icon">
                      {level.id === 1 ? '🚰' :
                       level.id === 2 ? '🍽️' :
                       level.id === 3 ? '🌱' :
                       level.id === 4 ? '👕' :
                       level.id === 5 ? '🚗' :
                       level.id === 6 ? '🏊' :
                       level.id === 7 ? '☔' :
                       level.id === 8 ? '🔍' :
                       level.id === 9 ? '🌍' : '👑'}
                    </div>
                  )}
                  <div className="level-number">Level {level.id}</div>
                  <div className="level-title">{level.title}</div>
                  
                  {renderStars(level)}
                  {!level.locked && level.waterSaved > 0 && (
                    <div className="water-saved-badge">
                      <span className="droplet">💧</span>
                      {level.waterSaved}L saved
                    </div>
                  )}
                </div>
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
            🌊 Previous
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
            Next 🌊
          </button>
        </div>
      </div>
    </div>
  );
};

export default LevelSelect;