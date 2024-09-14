import React, { useState } from 'react';
import SpinningSession from './SpinningSession';
import IntroPage from './IntroPage';
import './App.css';

const App = () => {
  const [isConfigured, setIsConfigured] = useState(false);
  const [training, setTraining] = useState('');
  const [users, setUsers] = useState([]);

  const handleStart = (selectedTraining, usersList) => {
    setTraining(selectedTraining);
    setUsers(usersList);
    setIsConfigured(true);
  };

  return (
    <div className="app">
      {!isConfigured ? (
        <IntroPage onStart={handleStart} />
      ) : (
        <SpinningSession training={training} users={users} />
      )}
    </div>
  );
};

export default App;
