import React from 'react';
import { useParams } from 'react-router-dom';

const Game: React.FC = () => {
  const { levelId } = useParams(); // Récupère le paramètre levelId de l'URL

  return (
    <div className="game-container">
      <h1>Bienvenue dans le niveau {levelId}</h1>
      <p>Ici, vous pouvez implémenter la logique du jeu pour ce niveau.</p>
    </div>
  );
};

export default Game;