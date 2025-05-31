import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import child1Img from '../assets/1.png';
import child2Img from '../assets/2.png';
import child3Img from '../assets/3.png';
import child4Img from '../assets/4.png';
import child5Img from '../assets/5.png';
import borderImg from '../assets/border.png';
import '../styles/Level1.css';

interface Position {
  x: number;
  y: number;
}

const Level1: React.FC = () => {
  const navigate = useNavigate();
  const [position, setPosition] = useState<Position>({ x: 100, y: window.innerHeight - 150 }); // Start at bottom-left
  const [isMoving, setIsMoving] = useState(false);
  const [keysPressed, setKeysPressed] = useState<Set<string>>(new Set());
  const imgRef = useRef<HTMLImageElement>(null);
  const currentIndexRef = useRef(0);
  const moveSpeed = 2;

  // Walking animation frames
  const frames = [child1Img, child2Img, child3Img, child4Img, child5Img];

  useEffect(() => {
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
  }, []);

  // Separate time-based animation effect
  useEffect(() => {
    if (!isMoving) {
      // Set to idle frame (first frame) when not moving
      if (imgRef.current) {
        imgRef.current.src = child1Img;
        currentIndexRef.current = 0;
      }
      return;
    }

    // Time-based animation - consistent speed
    const animationInterval = setInterval(() => {
      if (imgRef.current) {
        currentIndexRef.current = (currentIndexRef.current + 1) % frames.length;
        imgRef.current.src = frames[currentIndexRef.current];
      }
    }, 5); // 200ms per frame for smooth animation

    return () => clearInterval(animationInterval);
  }, [isMoving, frames]);

  // Movement effect - constrained to path
  useEffect(() => {
    if (keysPressed.size === 0) {
      setIsMoving(false);
      return;
    }

    const gameLoop = setInterval(() => {
      setPosition(prev => {
        let newX = prev.x;
        let newY = prev.y;

        // Constrain movement to follow the winding path
        if (keysPressed.has('ArrowLeft')) {
          newX = Math.max(50, prev.x - moveSpeed);
        }
        if (keysPressed.has('ArrowRight')) {
          newX = Math.min(window.innerWidth - 150, prev.x + moveSpeed);
        }
        if (keysPressed.has('ArrowUp')) {
          newY = Math.max(50, prev.y - moveSpeed);
        }
        if (keysPressed.has('ArrowDown')) {
          newY = Math.min(window.innerHeight - 150, prev.y + moveSpeed);
        }

        return { x: newX, y: newY };
      });
    }, 16); // ~60 FPS for smooth movement

    return () => clearInterval(gameLoop);
  }, [keysPressed, moveSpeed]);

  return (
    <div className="level1-container">
      <div className="garden-background">
        {/* Background with path */}
        <img src={borderImg} alt="Garden Path" className="garden-path" />
        
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

      <div className="instructions">
        <p>Use arrow keys to move along the garden path!</p>
      </div>
    </div>
  );
};

export default Level1; 