import React from 'react';
import './ExpectedPower.css';

const ExpectedPower = ({ users, currentSegment }) => {
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
  return (
    
    <div className="expected-power">
      <h2>Expected FTP percentage: {calculateExpectedPower(users[0].ftp, currentSegment.effort).ftpPercentage}%</h2>
      <div className="user-power-container">
        {users.map((user, index) => {
          const { ftpPercentage, expectedWatts } = calculateExpectedPower(user.ftp, currentSegment.effort);
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
  );
};

export default ExpectedPower;
