import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageSelector from './LanguageSelector';
import '../styles/FirstPage.css';
import waterdrop02 from '../assets/waterdrop02.png';
import arrow05 from '../assets/arrow05.png';

const FirstPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="first-page-container">
      {/* Language Selector at the top */}
      <div className="language-selector-container">
        <LanguageSelector />
      </div>

      {/* Floating bubbles background */}
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      
      <div className="content-wrapper">
        <h1>{t('title')}</h1>
        <div className="mascot-speech">{t('subtitle')}</div>
        <div className="button-container">
          <Link to="/level-select">
            <button className="start-button">{t('startButton')}</button>
          </Link>
        </div>
        
        {/* Water drop mascot image */}
        <img 
          src={waterdrop02} 
          alt="Water Drop Mascot" 
          className="water-drop-mascot" 
          />
        <div className="water-drop-mascot" ></div>

        {/* Arrow image */}
        <img 
          src={arrow05}
          alt="Arrow" 
          className="arrow-image" 
        />
        
      </div>
    </div>
  );
};

export default FirstPage;