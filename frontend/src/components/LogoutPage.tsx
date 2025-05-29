import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';
import { signOut } from 'firebase/auth';
import '../styles/LogoutPage.css';

const LogoutPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      navigate('/login');
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const handleCancel = () => {
    navigate('/game'); // Redirect back to the game page
  };

  return (
    <div className="logout-container">
      <div className="content-wrapper">
        <h2>Log Out of AquaHeroes</h2>
        <p>Are you sure you want to log out?</p>
        <div className="button-container">
          <button className="logout-button" onClick={handleLogout}>
            Log Out
          </button>
          <button className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;