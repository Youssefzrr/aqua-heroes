import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/level-select'); // Changed from '/game' to '/level-select'
    } catch (err: any) {
      console.log(err);
      let errorMessage = 'An error occurred during login.';
      switch (err.code) {
        case 'auth/user-not-found':
          errorMessage = 'No user found with this email.';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Incorrect password.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Invalid email address.';
          break;
        case 'auth/operation-not-allowed':
          errorMessage = 'Email/Password authentication is not enabled.';
          break;
        default:
          errorMessage = err.message || errorMessage;
      }
      setError(errorMessage);
    }
  };

  return (
    <div className="login-container">
      <div className="content-wrapper">
        <h2>Log In to AquaHeroes</h2>
        <p>Access your account to continue your water-saving journey!</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">Log In</button>
        </form>
        <p className="redirect-text">
          Don't have an account?{' '}
          <a href="/signup" className="redirect-link">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;