import React, { useState, useEffect } from 'react';
import EffortLevelBar from './EffortLevelBar';
import ExpectedPower from './ExpectedPower';
import {useNavigate} from 'react-router-dom';
/**
 * A SpinningSession component that simulates a spinning workout session with multiple segments.
 */
const SpinningSession = ({ training, users, autoplay }) => {
  // Define segment data for different training plans
  const navigate = useNavigate();
  const trainingPlans = {
    'HIIT Training': [
      { effort: 1, rpm: 80, duration: 10 },
      { effort: 5, rpm: 70, duration: 15 },
      { effort: 7, rpm: 40, duration: 20 },
      { effort: 10, rpm: 100, duration: 25 },
    ],
    'Low Cadence': [
      { effort: 3, rpm: 60, duration: 15 },
      { effort: 5, rpm: 65, duration: 20 },
      { effort: 7, rpm: 70, duration: 25 },
      { effort: 8, rpm: 75, duration: 30 },
    ],
  };

  const segments = trainingPlans[training] || [];
  const [currentSegment, setCurrentSegment] = useState(0);
  const [timeLeft, setTimeLeft] = useState(segments[0]?.duration || 0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (currentSegment < segments.length - 1) {
              setCurrentSegment((prevSegment) => prevSegment + 1);
              return segments[currentSegment + 1].duration;
            } else {
              setIsRunning(false);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, currentSegment, segments]);

  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(segments[currentSegment]?.duration || 0);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  useEffect(() => {
    if (autoplay) {
      handleStart();
    }
  }, [autoplay]);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-100 p-4">
        
        <div className="justify-start">
          <ExpectedPower users={users} currentSegment={segments[currentSegment]} />
        </div>
        
        <div className="justify-end">
          {/* Control buttons Component*/}
          <div className="mt-6 flex flex-col items-center gap-4">
            <div className="flex gap-4">
              <button
                onClick={handleStart}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
              >Start</button>
              <button
                onClick={handleStop}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
              >Stop</button>
            </div>
            <button
              onClick={() => navigate('/')}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition"
            >Home</button>
          </div>
          
          
        </div>
        
        
      </div>
      {/* Main content panel */}
      <div className="w-4/5 p-6 bg-white flex flex-col justify-between">
        
        <div className="flex items-center justify-around mb-4">
          
          {/* TimeLeft component */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl">
              {timeLeft}
            </div>
            <p className="mt-2 text-gray-600">Time Left</p>
          </div>
          {/* Current segment effort */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-green-500 text-white flex items-center justify-center text-xl">
              {segments[currentSegment]?.effort || 0}
            </div>
            <p className="mt-2 text-gray-600">Effort</p>
          </div>
          {/* Current segment RPM */}
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-xl">
              {segments[currentSegment]?.rpm || 0}
            </div>
            <p className="mt-2 text-gray-600">RPM</p>
          </div>
        
        </div>

        {/* Horizontal Line */}
        <div className="h-24">
          {/* Effort Level Bar */}
          <EffortLevelBar segments={segments} currentSegment={currentSegment} />
        </div>
        
      
      </div>
    </div>
  );
};

export default SpinningSession;
