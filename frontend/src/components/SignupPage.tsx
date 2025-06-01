import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/SignupPage.css';

const SignupPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User created successfully');
      navigate('/login');
    } catch (err: any) {
      console.log(err);
      let errorMessage = t('errorSignup');
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = t('errorEmailInUse');
          break;
        case 'auth/invalid-email':
          errorMessage = t('errorInvalidEmail');
          break;
        case 'auth/weak-password':
          errorMessage = t('errorWeakPassword');
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
    <div className="signup-container">
      <div className="content-wrapper">
        <h2>{t('signupTitle')}</h2>
        <p>{t('signupSubtitle')}</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSignup}>
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
          <button type="submit" className="signup-button">{t('signupButton')}</button>
        </form>
        <p className="redirect-text">
          {t('haveAccount')}{' '}
          <a href="/login" className="redirect-link">{t('loginLink')}</a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;