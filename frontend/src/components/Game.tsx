import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Level1 from './Level1';
import robinetImg from '../assets/roubini.png';
import '../styles/Game.css';

interface GameProps {
  levelId: number;
}

const Game: React.FC<GameProps> = ({ levelId }) => {
  const [isWaterFlowing, setIsWaterFlowing] = useState(true);

  // Render Level1 component when levelId is 1
  if (levelId === 1) {
    return <Level1 />;
  }

  const toggleWater = () => {
    setIsWaterFlowing(!isWaterFlowing);
  };

  // Default view for other levels with faucet functionality
  return (
    <div className="game-container">
      <div className="content-wrapper">
        <h2>Welcome to Level {levelId}!</h2>
        <p>Help save water by turning off the faucet!</p>
        
        <div className="faucet-area">
          <img src={robinetImg} alt="Faucet" className="robinet-image" />
          <button 
            className={`water-button ${isWaterFlowing ? 'active' : ''}`}
            onClick={toggleWater}
          >
            {isWaterFlowing ? 'Turn Off' : 'Turn On'}
          </button>
          {isWaterFlowing && (
            <div className="water-flow">
              <div className="drop"></div>
              <div className="drop"></div>
              <div className="drop"></div>
            </div>
          )}
          <div className="water-puddle"></div>
        </div>

        <Link to="/level-select">
          <button className="back-button">Back to Level Select</button>
        </Link>
      </div>
    </div>
  );
};

export default Game;