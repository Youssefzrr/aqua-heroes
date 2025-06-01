import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully');
      navigate('/level-select');
    } catch (err: any) {
      console.log(err);
      let errorMessage = t('errorLogin');
      switch (err.code) {
        case 'auth/user-not-found':
          errorMessage = t('errorUserNotFound');
          break;
        case 'auth/wrong-password':
          errorMessage = t('errorWrongPassword');
          break;
        case 'auth/invalid-email':
          errorMessage = t('errorInvalidEmail');
          break;
        case 'auth/operation-not-allowed':
          errorMessage = t('errorAuthDisabled');
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
        <h2>{t('loginTitle')}</h2>
        <p>{t('loginSubtitle')}</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={t('emailPlaceholder')}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder={t('passwordPlaceholder')}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="login-button">{t('loginButton')}</button>
        </form>
        <p className="redirect-text">
          {t('noAccount')}{' '}
          <a href="/signup" className="redirect-link">{t('signUpLink')}</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;