import React, { useState } from 'react';
import SpinningSession from './SpinningSession';
import IntroPage from './IntroPage';
import './App.css';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();

  const [training, setTraining] = useState('');
  const [users, setUsers] = useState([]);
  const [autoplay, setAutoplay] = useState(false);

  const handleStart = (selectedTraining, usersList, autoplaySetting) => {
    setTraining(selectedTraining);
    setUsers(usersList);
    setAutoplay(autoplaySetting);
    navigate('/app');
  };

  return (
    <div className="app">
      <Routes>
        {/* Intro Page Route */}
        <Route
          path="/intro"
          element={<IntroPage onStart={handleStart} />}
        />

        {/* Spinning Session Route */}
        <Route
          path="/app"
          element={
            <div>
              <button className="home-button" onClick={() => navigate('/intro')}>
                Home
              </button>
              <SpinningSession training={training} users={users} autoplay={autoplay} />
            </div>
          }
        />

        {/* Redirect to /intro by default when accessing the root path */}
        <Route path="/" element={<Navigate to="/intro" />} />
        
        {/* Fallback for any unknown route */}
        <Route path="*" element={<Navigate to="/intro" />} />
      </Routes>
    </div>
  );
};

export default App;
