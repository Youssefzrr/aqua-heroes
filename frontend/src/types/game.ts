export interface Player {
  id: string;
  name: string;
  level: number;
  hearts: number;
  maxHearts: number;
  experience: number;
  completedMissions: string[];
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  requiredLevel: number;
  waterSaved: number; // in liters
  timeLimit?: number; // in minutes
  consequences: {
    plant?: {
      name: string;
      health: number;
    };
    animal?: {
      name: string;
      health: number;
    };
  };
}

export interface GameState {
  player: Player;
  currentMission: Mission | null;
  gameTime: number;
  isPaused: boolean;
} 