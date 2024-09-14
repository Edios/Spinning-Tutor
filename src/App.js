import React, { useState, useEffect } from 'react';
import EffortLevelBar from './EffortLevelBar';
import './App.css';

const SpinningSession = () => {
  // Hardcoded FTP values for multiple users
  const users = [
    { name: 'Alice', ftp: 250 },
    { name: 'Bob', ftp: 220 },
    { name: 'Charlie', ftp: 280 },
    { name: 'Alice', ftp: 250 },
    { name: 'Bob', ftp: 220 },
    { name: 'Charlie', ftp: 280 },
  ];

  const segments = [
      { effort: 1, rpm: 80, duration: 10 },
      { effort: 3, rpm: 70, duration: 15 },
      { effort: 5, rpm: 40, duration: 20 },
      { effort: 7, rpm: 100, duration: 25 },
      { effort: 10, rpm: 60, duration: 30 },
  ];

  const [currentSegment, setCurrentSegment] = useState(0);
  const [timeLeft, setTimeLeft] = useState(segments[0].duration); // Set initial time to first segment's duration
  const [isRunning, setIsRunning] = useState(false); // Session running state

  // Helper function to calculate FTP percentage and expected power
  const calculateExpectedPower = (ftp, effort) => {
    let ftpPercentage;
    if (effort <= 2) {
      ftpPercentage = 0.55; // Active Recovery
    } else if (effort === 3) {
      ftpPercentage = 0.55 + (0.75 - 0.55); // Endurance
    } else if (effort === 5) {
      ftpPercentage = 0.76 + (0.87 - 0.76); // Tempo
    } else if (effort === 7) {
      ftpPercentage = 0.88 + (0.94 - 0.88); // Sweet Spot
    } else if (effort === 8) {
      ftpPercentage = 0.95 + (1.05 - 0.95); // Threshold
    } else if (effort === 9) {
      ftpPercentage = 1.06 + (1.2 - 1.06); // VO2 Max
    } else {
      ftpPercentage = 1.2; // Anaerobic Capacity
    }

    const expectedWatts = Math.round(ftpPercentage * ftp);
    return { ftpPercentage: (ftpPercentage * 100).toFixed(1), expectedWatts };
  };

  // Effect for countdown logic
  useEffect(() => {
    let interval;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // Move to the next segment or stop if we're at the last segment
            if (currentSegment < segments.length - 1) {
              setCurrentSegment((prevSegment) => prevSegment + 1);
              return segments[currentSegment + 1].duration;
            } else {
              setIsRunning(false); // Stop when all segments are done
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(interval); // Clear interval when not running
    }

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isRunning, timeLeft, currentSegment]);

  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(segments[currentSegment].duration); // Set initial time left for the current segment
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  const { ftpPercentage: overallFtpPercentage } = calculateExpectedPower(users[0].ftp, segments[currentSegment].effort);
  return (
    <div className="app-container">
      <div className="sidebar-container">
        <div className="sidebar">
          {/* Current Segment Info */}
          <div className="segment-info">
            <h2>Current Segment</h2>
            <p>Effort Level: {segments[currentSegment]?.effort || 'N/A'}</p>
            <p>RPM: {segments[currentSegment]?.rpm || 'N/A'}</p>
            <p>Time Left: {timeLeft}s</p>
          </div>

          {/* Next Segment Info */}
          <div className="segment-info">
            <h2>Next Segment</h2>
            {currentSegment < segments.length - 1 ? (
              <>
                <p>Effort Level: {segments[currentSegment + 1]?.effort || 'N/A'}</p>
                <p>RPM: {segments[currentSegment + 1]?.rpm || 'N/A'}</p>
                <p>Duration: {segments[currentSegment + 1]?.duration || 'N/A'}s</p>
              </>
            ) : (
              <p>No more segments</p>
            )}
          </div>

          {/* Control Buttons */}
          <div className="controls">
            <button onClick={handleStart} disabled={isRunning}>Start</button>
            <button onClick={handleStop} disabled={!isRunning}>Stop</button>
          </div>
        </div>
        {/* Display Expected Power for Each User */}
        <div className="expected-power">
          <h2>Expected FTP percentage: {overallFtpPercentage}%</h2>
          <div className="user-power-container">
            {users.map((user, index) => {
              const { ftpPercentage, expectedWatts } = calculateExpectedPower(user.ftp, segments[currentSegment].effort);
              return (
                <div key={index} className="user-power">
                  <h3>{user.name}:</h3>
                  <p className="value">{expectedWatts}</p>
                  <p className="label">Watts</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline with segments */}
      <div className="effort-level-bar-wrapper">
        <EffortLevelBar segments={segments} currentSegment={currentSegment} />
      </div>
    </div>
  );
};

export default SpinningSession;