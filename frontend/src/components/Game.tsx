import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Player, Mission, GameState } from '../types/game';

const GameContainer = styled.div`
  width: 100%;
  height: 100vh;
  background: linear-gradient(180deg, #87CEEB 0%, #1E90FF 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const StatusBar = styled.div`
  width: 100%;
  max-width: 800px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: rgba(255, 255, 255, 0.9);
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

const HeartContainer = styled.div`
  display: flex;
  gap: 5px;
`;

const Heart = styled.div<{ active: boolean }>`
  width: 30px;
  height: 30px;
  background: ${props => props.active ? '#ff4444' : '#ccc'};
  clip-path: path('M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402m5.726-20.583c-2.203 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248-3.183 0-6.281 2.187-6.281 6.191 0 4.661 5.571 9.429 12 15.809 6.43-6.38 12-11.148 12-15.809 0-4.011-3.095-6.181-6.274-6.181');
`;

const MissionCard = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
`;

const initialPlayer: Player = {
  id: '1',
  name: 'Aqua Hero',
  level: 1,
  hearts: 5,
  maxHearts: 5,
  experience: 0,
  completedMissions: [],
};

const sampleMission: Mission = {
  id: '1',
  title: 'Save the Desert Rose',
  description: 'The desert rose plant is thirsty! Complete water-saving tasks to help it survive.',
  difficulty: 'easy',
  requiredLevel: 1,
  waterSaved: 10,
  timeLimit: 5,
  consequences: {
    plant: {
      name: 'Desert Rose',
      health: 100,
    },
  },
};

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    player: initialPlayer,
    currentMission: sampleMission,
    gameTime: 0,
    isPaused: false,
  });

  useEffect(() => {
    if (!gameState.isPaused) {
      const timer = setInterval(() => {
        setGameState(prev => ({
          ...prev,
          gameTime: prev.gameTime + 1,
        }));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [gameState.isPaused]);

  const handleMissionComplete = () => {
    setGameState(prev => ({
      ...prev,
      player: {
        ...prev.player,
        experience: prev.player.experience + 100,
        completedMissions: [...prev.player.completedMissions, prev.currentMission?.id || ''],
      },
    }));
  };

  return (
    <GameContainer>
      <StatusBar>
        <div>Level: {gameState.player.level}</div>
        <HeartContainer>
          {Array.from({ length: gameState.player.maxHearts }).map((_, index) => (
            <Heart key={index} active={index < gameState.player.hearts} />
          ))}
        </HeartContainer>
        <div>XP: {gameState.player.experience}</div>
      </StatusBar>

      {gameState.currentMission && (
        <MissionCard>
          <h2>{gameState.currentMission.title}</h2>
          <p>{gameState.currentMission.description}</p>
          <p>Difficulty: {gameState.currentMission.difficulty}</p>
          <p>Water to save: {gameState.currentMission.waterSaved}L</p>
          {gameState.currentMission.timeLimit && (
            <p>Time limit: {gameState.currentMission.timeLimit} minutes</p>
          )}
          <button onClick={handleMissionComplete}>Complete Mission</button>
        </MissionCard>
      )}
    </GameContainer>
  );
};

export default Game; 