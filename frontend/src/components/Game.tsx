import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Game.css';

interface GameProps {
  levelId: number;
}

const Game: React.FC<GameProps> = ({ levelId }) => {
  return (
    <div className="game-container">
      <div className="content-wrapper">
        <h2>Welcome to Level {levelId}!</h2>
        <p>Start your water-saving adventure here.</p>
        <Link to="/logout">
          <button className="logout-button">Log Out</button>
        </Link>
      </div>
    </div>
  );
};

export default Game;