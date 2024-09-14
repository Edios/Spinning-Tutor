import React, { useState, useEffect } from 'react';
import EffortLevelBar from './EffortLevelBar';
import ExpectedPower from './ExpectedPower';
import './App.css';
/**
 * A SpinningSession component that simulates a spinning workout session with multiple segments.
 * It displays the current and next segment information, and allows the user to start and stop the session.
 * It also renders an effort level bar and expected power for each user.
 *
 * @param {Object} props - component properties
 * @param {string} props.training - the type of training (e.g. 'HIIT Training', 'Low Cadence')
 * @param {Array} props.users - an array of user objects
 * @param {boolean} props.autoplay - whether to start the session automatically
 * @return {JSX.Element} the SpinningSession component
 */

const SpinningSession = ({ training, users, autoplay}) => {
  // Define segment data for different training plans
  const trainingPlans = {
    'HIIT Training': [
      { effort: 1, rpm: 80, duration: 10 },
      { effort: 5, rpm: 70, duration: 15 },
      { effort: 7, rpm: 40, duration: 20 },
      { effort: 10, rpm: 100, duration: 25 },
      { effort: 1, rpm: 80, duration: 10 },
      { effort: 5, rpm: 70, duration: 15 },
      { effort: 7, rpm: 40, duration: 20 },
      { effort: 10, rpm: 100, duration: 25 },
      { effort: 1, rpm: 80, duration: 10 },
      { effort: 5, rpm: 70, duration: 15 },
      { effort: 7, rpm: 40, duration: 20 },
      { effort: 10, rpm: 100, duration: 25 },
      { effort: 1, rpm: 80, duration: 10 },
      { effort: 5, rpm: 70, duration: 15 },
      { effort: 7, rpm: 40, duration: 20 },
      { effort: 10, rpm: 100, duration: 25 },
      { effort: 1, rpm: 80, duration: 10 },
      { effort: 5, rpm: 70, duration: 15 },
      { effort: 7, rpm: 40, duration: 20 },
      { effort: 10, rpm: 100, duration: 25 }
    ],
    'Low Cadence': [
      { effort: 3, rpm: 60, duration: 15 },
      { effort: 5, rpm: 65, duration: 20 },
      { effort: 7, rpm: 70, duration: 25 },
      { effort: 8, rpm: 75, duration: 30 },
    ],
    // Add other training plans as needed
  };

  const segments = trainingPlans[training] || [];

  const [currentSegment, setCurrentSegment] = useState(0);
  const [timeLeft, setTimeLeft] = useState(segments[0]?.duration || 0); // Set initial time
  const [isRunning, setIsRunning] = useState(false); // Session running state

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
  }, [isRunning, timeLeft, currentSegment, segments]);



  const handleStart = () => {
    setIsRunning(true);
    setTimeLeft(segments[currentSegment]?.duration || 0); // Set initial time left for the current segment
  };

  const handleStop = () => {
    setIsRunning(false);
  };
  
  useEffect(() => {
    if (autoplay){
      handleStart();
    }
},[autoplay]);
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
        <ExpectedPower users={users} currentSegment={segments[currentSegment]} />
      </div>

      {/* Timeline with segments */}
      <div className="effort-level-bar-wrapper">
        <EffortLevelBar segments={segments} currentSegment={currentSegment} />
      </div>
    </div>
  );
};

export default SpinningSession;