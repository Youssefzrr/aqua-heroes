import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { auth } from './services/firebaseConfig';
import { User } from 'firebase/auth';
import { LanguageProvider } from './contexts/LanguageContext';
import FirstPage from './components/first_page';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import LogoutPage from './components/LogoutPage';
import LevelSelect from './components/LevelSelect';
import Level1 from './components/Level1';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <LanguageProvider>
      <Router>
        <Routes>
          <Route path="/" element={<FirstPage />} />
          <Route path="/login" element={user ? <Navigate to="/level-select" /> : <LoginPage />} />
          <Route path="/signup" element={user ? <Navigate to="/level-select" /> : <SignupPage />} />
          <Route path="/logout" element={user ? <LogoutPage /> : <Navigate to="/login" />} />
          <Route path="/level-select" element={user ? <LevelSelect /> : <Navigate to="/login" />} />
          <Route path="/Level1" element={user ? <Level1 /> : <Navigate to="/login" />} />
        </Routes>
      </Router>
    </LanguageProvider>
  );
}

export default App;