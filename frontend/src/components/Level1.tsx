import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import child1Img from '../assets/1.png';
import child2Img from '../assets/2.png';
import child3Img from '../assets/3.png';
import child4Img from '../assets/4.png';
import child5Img from '../assets/5.png';
import borderImg from '../assets/background.png';
import robinetImg from '../assets/roubini.png';
import dirtyImg from '../assets/dirty.png';
import '../styles/Level1.css';
import '../styles/Level1Message.css';

interface Position {
  x: number;
  y: number;
}

interface Bubble {
  id: number;
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

const Level1: React.FC = () => {
  const navigate = useNavigate();
  const [gameStarted, setGameStarted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [position, setPosition] = useState<Position>({ x: Math.min(1300, window.innerWidth - 200), y: window.innerHeight - 200 });
  const [isMoving, setIsMoving] = useState(false);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const [isWaterFlowing, setIsWaterFlowing] = useState(true);
  const [showFaucetDialog, setShowFaucetDialog] = useState(false);
  const [faucetDialogShown, setFaucetDialogShown] = useState(false);
  const [backgroundFrames, setBackgroundFrames] = useState<string[]>([]);
  const [currentBackgroundFrame, setCurrentBackgroundFrame] = useState(0);
  const imgRef = useRef<HTMLImageElement>(null);
  const backgroundImgRef = useRef<HTMLImageElement>(null);
  const currentIndexRef = useRef(0);
  const moveSpeed = 3;

  // Walking animation frames
  const frames = [child1Img, child2Img, child3Img, child4Img, child5Img];

  // Faucet position (matching CSS: top:950px; right: 315px; width: 40px; height: 60px)
  const faucetPosition = { 
    x: window.innerWidth - 315, // Right edge minus right offset
    y: 950 // Top position from CSS
  };

  // Check if character is near faucet
  const isNearFaucet = (charPos: Position) => {
    const distance = Math.sqrt(
      Math.pow(charPos.x - faucetPosition.x, 2) + Math.pow(charPos.y - faucetPosition.y, 2)
    );
    console.log('=== PROXIMITY CHECK ===');
    console.log('Character pos:', charPos);
    console.log('Faucet pos:', faucetPosition);
    console.log('Distance:', distance);
    console.log('Is near? (distance > 1000):', distance > 1000);
    console.log('Game started?', gameStarted);
    console.log('Dialog shown?', faucetDialogShown);
    console.log('Water flowing?', isWaterFlowing);
    return distance > 1200; // Fixed condition based on actual behavior
  };

  // Load background animation frames
  useEffect(() => {
    const loadBackgroundFrames = async () => {
      const framePromises = [];
      for (let i = 1; i <= 51; i++) {
        const frameNumber = i.toString().padStart(3, '0');
        framePromises.push(import(`../assets/ezgif-frame-${frameNumber}.png`));
      }
      
      try {
        const loadedFrames = await Promise.all(framePromises);
        setBackgroundFrames(loadedFrames.map(frame => frame.default));
      } catch (error) {
        console.log('Some background frames missing, using static background');
        // Fallback to static background if animated frames not available
        import('../assets/background.png').then(bg => {
          setBackgroundFrames([bg.default]);
        });
      }
    };

    loadBackgroundFrames();
  }, []);

  // Background animation effect
  useEffect(() => {
    if (backgroundFrames.length <= 1) return;

    const backgroundInterval = setInterval(() => {
      setCurrentBackgroundFrame(prev => (prev + 1) % backgroundFrames.length);
    }, 100); // 10 FPS for background animation

    return () => clearInterval(backgroundInterval);
  }, [backgroundFrames.length]);

  // Update background image when frame changes
  useEffect(() => {
    if (backgroundImgRef.current && backgroundFrames.length > 0) {
      backgroundImgRef.current.src = backgroundFrames[currentBackgroundFrame];
    }
  }, [currentBackgroundFrame, backgroundFrames]);

  // Generate bubbles for message overlay
  useEffect(() => {
    const generatedBubbles = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 30 + 10,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }));
    setBubbles(generatedBubbles);
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleFaucetResponse = (turnOff: boolean) => {
    if (turnOff) {
      setIsWaterFlowing(false);
    }
    setShowFaucetDialog(false);
    setFaucetDialogShown(true);
  };

  useEffect(() => {
    if (!gameStarted) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeysPressed(prev => new Set(prev).add(e.key));
      setIsMoving(true);
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeysPressed(prev => {
        const newSet = new Set(prev);
        newSet.delete(e.key);
        return newSet;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameStarted]);

  // Separate time-based animation effect
  useEffect(() => {
    if (!gameStarted || !isMoving) {
      if (imgRef.current) {
        imgRef.current.src = child1Img;
        currentIndexRef.current = 0;
      }
      return;
    }

    const animationInterval = setInterval(() => {
      if (imgRef.current) {
        currentIndexRef.current = (currentIndexRef.current + 1) % frames.length;
        imgRef.current.src = frames[currentIndexRef.current];
      }
    }, 5);

    return () => clearInterval(animationInterval);
  }, [gameStarted, isMoving, frames]);

  // Movement effect with proximity detection
  useEffect(() => {
    if (!gameStarted) {
      setIsMoving(false);
      return;
    }

    if (keysPressed.size === 0) {
      setIsMoving(false);
      return;
    }

    const gameLoop = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        if (keysPressed.has('ArrowLeft')) {
          newX = Math.max(50, prev.x - moveSpeed);
        }
        if (keysPressed.has('ArrowRight')) {
          newX = Math.min(window.innerWidth - 180, prev.x + moveSpeed);
        }
        if (keysPressed.has('ArrowUp')) {
          newY = Math.max(50, prev.y - moveSpeed);
        }
        if (keysPressed.has('ArrowDown')) {
          newY = Math.min(window.innerHeight - 50, prev.y + moveSpeed); // Allow character to go lower
        }

        const newPosition = { x: newX, y: newY };
        
        return newPosition;
      });
    }, 16);

    return () => clearInterval(gameLoop);
  }, [gameStarted, keysPressed, moveSpeed, gameStarted]);

  // Separate effect to check proximity every frame when character moves
  useEffect(() => {
    if (!gameStarted || faucetDialogShown || !isWaterFlowing) return;

    const checkProximity = () => {
      if (isNearFaucet(position)) {
        console.log('🎯 PROXIMITY TRIGGERED! Showing dialog...');
        setShowFaucetDialog(true);
      }
    };

    checkProximity();
  }, [position, gameStarted, faucetDialogShown, isWaterFlowing]);

  return (
    <div className="level1-container">
      {/* Message Overlay - shown when game hasn't started */}
      {!gameStarted && (
        <div className="level1-message-overlay">
          <div className="message-wrapper">
            {/* Animated bubbles */}
            <div className="bubbles-container">
              {bubbles.map((bubble) => (
                <div
                  key={bubble.id}
                  className="bubble"
                  style={{
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    left: `${bubble.left}%`,
                    top: `${bubble.top}%`,
                    animationDuration: `${bubble.duration}s`,
                    animationDelay: `${bubble.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Message box */}
            <div className="message-box">
              {/* Wave decoration at top */}
              <div className="wave-top">
                <div className="wave-shape" />
              </div>

              {/* Content */}
              <div className="message-content">
                <h2 className="message-title">WATER HERO MISSION</h2>

                <div className="objectives-box">
                  <p className="objectives-text">
                    Welcome to the Garden of Conservation! Your mission: 
                    <br />🚶‍♂️ Explore the beautiful garden path
                    <br />🚰 Find the water-wasting faucet
                    <br />💧 Turn off the faucet to save water
                    <br />🌱 Help protect our precious water resources!
                  </p>
                </div>

                {/* Start Button */}
                <div className="button-container">
                  <button
                    className={`start-button ${isHovered ? 'hovered' : ''}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleStartGame}
                  >
                    <span className="button-text">START MISSION!</span>
                    {isHovered && (
                      <div className="button-bubbles">
                        <div className="button-bubble bubble1" />
                        <div className="button-bubble bubble2" />
                        <div className="button-bubble bubble3" />
                      </div>
                    )}
                  </button>
                </div>
              </div>

              {/* Wave decoration at bottom */}
              <div className="wave-bottom">
                <div className="wave-shape" />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="fish-left">🐠</div>
            <div className="fish-right">🐟</div>
            <div className="droplet-1">💧</div>
            <div className="droplet-2">💧</div>
          </div>
        </div>
      )}

      {/* Faucet Dialog - shown when near faucet */}
      {showFaucetDialog && (
        <div className="level1-message-overlay">
          <div className="message-wrapper">
            {/* Animated bubbles */}
            <div className="bubbles-container">
              {bubbles.map((bubble) => (
                <div
                  key={bubble.id}
                  className="bubble"
                  style={{
                    width: `${bubble.size}px`,
                    height: `${bubble.size}px`,
                    left: `${bubble.left}%`,
                    top: `${bubble.top}%`,
                    animationDuration: `${bubble.duration}s`,
                    animationDelay: `${bubble.delay}s`,
                  }}
                />
              ))}
            </div>

            {/* Message box */}
            <div className="message-box">
              {/* Wave decoration at top */}
              <div className="wave-top">
                <div className="wave-shape" />
              </div>

              {/* Content */}
              <div className="message-content">
                <h2 className="message-title">💧 WATER CONSERVATION ALERT! 💧</h2>

                <div className="objectives-box">
                  <p className="objectives-text">
                    You found a running faucet wasting precious water!
                    <br />💧 Every drop counts for our planet
                    <br />🌍 Help save our precious water resources
                    <br />🚰 What would you like to do?
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="button-container">
                  <button
                    className="start-button yes-button-styled"
                    onClick={() => handleFaucetResponse(true)}
                  >
                    <span className="button-text">Yes, Turn Off!</span>
                  </button>
                  <button
                    className="start-button no-button-styled"
                    onClick={() => handleFaucetResponse(false)}
                  >
                    <span className="button-text">No, Leave It</span>
                  </button>
                </div>
              </div>

              {/* Wave decoration at bottom */}
              <div className="wave-bottom">
                <div className="wave-shape" />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="fish-left">🐠</div>
            <div className="fish-right">🐟</div>
            <div className="droplet-1">💧</div>
            <div className="droplet-2">💧</div>
          </div>
        </div>
      )}

      <div className="garden-background">
        {/* Animated Background */}
        {backgroundFrames.length > 0 && (
          <img 
            ref={backgroundImgRef}
            src={backgroundFrames[0]} 
            alt="Garden Animation" 
            className="garden-path" 
          />
        )}
        
        {/* Faucet Area */}
        <div className="faucet-area">
          {/* Task indicator */}
          <img src={dirtyImg} alt="Dirty" className="task-indicator-image" />
          <img src={robinetImg} alt="Faucet" className="robinet-image" />
          {isWaterFlowing && (
            <div className="water-flow">
              <div className="drop"></div>
              <div className="drop"></div>
              <div className="drop"></div>
              <div className="drop"></div>
              <div className="drop"></div>
            </div>
          )}
          <div className="water-puddle"></div>
          {/* Debug: Proximity circle */}
          {gameStarted && !faucetDialogShown && (
            <div className="proximity-indicator"></div>
          )}
        </div>
        
        {/* Character walking on path */}
        <div 
          className={`character ${isMoving ? 'walking' : 'idle'}`}
          style={{ 
            left: `${position.x}px`, 
            top: `${position.y}px`
          }}
        >
          <img ref={imgRef} src={child1Img} alt="Child character" />
        </div>
      </div>

      {gameStarted }
    </div>
  );
};

export default Level1; 