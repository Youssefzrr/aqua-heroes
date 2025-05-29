import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/FirstPage.css';

const FirstPage: React.FC = () => {
  return (
    <div className="first-page-container">
      <div className="content-wrapper">
        <h1>Welcome to AquaHeroes</h1>
        <p>Join the wave of water conservation champions!</p>
        <div className="button-container">
          <Link to="/login">
            <button className="start-button">Log In</button>
          </Link>
          <Link to="/signup">
            <button className="create-account-button">Sign Up</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FirstPage;