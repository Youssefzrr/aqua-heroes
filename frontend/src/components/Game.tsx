import React from 'react';
import { Link } from 'react-router-dom';
import Level1 from './Level1';
import '../styles/Game.css';

interface GameProps {
  levelId: number;
}

const Game: React.FC<GameProps> = ({ levelId }) => {
  // Render Level1 component when levelId is 1
  if (levelId === 1) {
    return <Level1 />;
  }

  // Default view for other levels (placeholder)
  return (
    <div className="game-container">
      <div className="content-wrapper">
        <h2>Welcome to Level {levelId}!</h2>
        <p>This level is under construction.</p>
        <Link to="/level-select">
          <button className="back-button">Back to Level Select</button>
        </Link>
      </div>
    </div>
  );
};

export default Game;