import React from 'react';
import { createGlobalStyle } from 'styled-components';
import Game from './components/Game';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    background: #4CAF50;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background 0.3s ease;

    &:hover {
      background: #45a049;
    }
  }
`;

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <Game />
    </>
  );
};

export default App; 