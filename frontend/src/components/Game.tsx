import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams, Navigate } from 'react-router-dom';
import '../styles/Game.css';

const Game: React.FC = () => {
  const { levelId } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [waterSaved, setWaterSaved] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const navigate = useNavigate();

  interface Task {
    id: number;
    description: string;
    waterSaved: number;
    completed: boolean;
    icon: string;
  }

  const getLevelTasks = (level: string): Task[] => {
    const levelNum = parseInt(level);
    switch (levelNum) {
      case 1: // Bathroom Basics
        return [
          {
            id: 1,
            description: "Turn off the tap while brushing teeth",
            waterSaved: 5,
            completed: false,
            icon: "🦷"
          },
          {
            id: 2,
            description: "Fix the leaky faucet",
            waterSaved: 10,
            completed: false,
            icon: "🔧"
          },
          {
            id: 3,
            description: "Take a shorter shower",
            waterSaved: 15,
            completed: false,
            icon: "🚿"
          }
        ];
      case 2: // Kitchen Hero
        return [
          {
            id: 1,
            description: "Use a bowl to wash vegetables",
            waterSaved: 8,
            completed: false,
            icon: "🥬"
          },
          {
            id: 2,
            description: "Fill the dishwasher completely",
            waterSaved: 12,
            completed: false,
            icon: "🍽️"
          },
          {
            id: 3,
            description: "Collect water while waiting for hot water",
            waterSaved: 7,
            completed: false,
            icon: "🚰"
          }
        ];
      // Add more levels here
      default:
        return [];
    }
  };

  useEffect(() => {
    if (levelId) {
      setTasks(getLevelTasks(levelId));
    }
  }, [levelId]);

  const handleTaskComplete = (taskId: number) => {
    setTasks(prevTasks => {
      const newTasks = prevTasks.map(task => {
        if (task.id === taskId && !task.completed) {
          setWaterSaved(prev => prev + task.waterSaved);
          return { ...task, completed: true };
        }
        return task;
      });

      // Check if all tasks are completed
      if (newTasks.every(task => task.completed)) {
        setShowCelebration(true);
        setTimeout(() => {
          navigate('/level-select');
        }, 3000);
      }

      return newTasks;
    });
  };

  if (!levelId) {
    return <Navigate to="/level-select" />;
  }

  return (
    <div className="game-container">
      <div className="water-drop-mascot first-page-mascot">
        <div className="mascot-face">
          <div className="mascot-eyes"></div>
          <div className="mascot-smile"></div>
        </div>
      </div>

      <div className="game-header">
        <h2>Level {levelId}</h2>
        <div className="water-meter">
          <span className="droplet-icon">💧</span>
          <span className="water-amount">{waterSaved}</span>
          <span className="water-label">Liters Saved!</span>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="tasks-container">
          {tasks.map(task => (
            <div 
              key={task.id} 
              className={`task-card ${task.completed ? 'completed' : ''}`}
              onClick={() => handleTaskComplete(task.id)}
            >
              <div className="task-icon">{task.icon}</div>
              <p className="task-description">{task.description}</p>
              <div className="task-water-saved">
                <span className="droplet">💧</span>
                {task.waterSaved}L
              </div>
              {task.completed && (
                <div className="completion-badge">
                  ✨ Great Job! ✨
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="navigation-buttons">
          <Link to="/level-select">
            <button className="back-button">
              <span className="button-icon">🏠</span>
              Back to Levels
            </button>
        </Link>
        </div>
      </div>

      {showCelebration && (
        <div className="celebration-overlay">
          <div className="celebration-content">
            <h2>🎉 Amazing Job! 🎉</h2>
            <p>You saved {waterSaved} liters of water!</p>
            <p>You're a true Water Hero!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;