import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FirstPage.css';

const FirstPage: React.FC = () => {
  return (
    <div className="first-page-container">
      {/* Floating bubbles background */}
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      
      <div className="content-wrapper">
        <h1>AquaHeroes</h1>
        <div className="mascot-speech">Save Water, Be a Hero!</div>
        <div className="button-container">
          <Link to="/level-select">
            <button className="start-button">Start Adventure!</button>
          </Link>
        </div>
        
        {/* Water drop mascot image */}
        <img 
          src={`${process.env.PUBLIC_URL}/static/waterdrop02.png`} 
          alt="Water Drop Mascot" 
          className="water-drop-mascot" 
          />
        <div className="water-drop-mascot" ></div>

        {/* Arrow image */}
        <img 
          src={`${process.env.PUBLIC_URL}/static/arrow05.png`} 
          alt="Arrow" 
          className="arrow-image" 
        />
        
      </div>
    </div>
  );
};

export default FirstPage;