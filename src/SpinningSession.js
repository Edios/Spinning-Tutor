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
        console.log('Autoplay is enabled. Starting the session automatically.');
        handleStart();
    }
},[autoplay]);

return (
    <div className="app">
      <div className="sidebar">
        <ExpectedPower users={users} currentSegment={segments[currentSegment]} />
      </div>

      <div className="main-container">
      <div className="segment-info">
  <div className="segment-circle time">
    <p>{timeLeft}s</p>
  </div>
  <div className="segment-circle effort">
    <p>{segments[currentSegment].effort}</p>
    <p>Effort</p>
  </div>
  <div className="segment-circle rpm">
    <p>{segments[currentSegment].rpm}</p>
    <p>RPM</p>
  </div>
</div>




        <div className="hr-line"></div>
        <EffortLevelBar segments={segments} currentSegment={currentSegment} />
      </div>
    </div>
  );
};

export default SpinningSession;