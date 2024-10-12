import React from 'react';
import './ExpectedPower.css';

const ExpectedPower = ({ users, currentSegment }) => {
  const calculateExpectedPower = (ftp, effort) => {
    let ftpPercentage;
    if (effort <= 2) {
      ftpPercentage = 0.55;
    } else if (effort === 3) {
      ftpPercentage = 0.60;
    } else if (effort === 5) {
      ftpPercentage = 0.85;
    } else if (effort === 7) {
      ftpPercentage = 0.90;
    } else if (effort === 8) {
      ftpPercentage = 1.0;
    } else if (effort === 9) {
      ftpPercentage = 1.1;
    } else {
      ftpPercentage = 1.2;
    }

    const expectedWatts = Math.round(ftpPercentage * ftp);
    return { ftpPercentage: (ftpPercentage * 100).toFixed(1), expectedWatts };
  };

  return (
    <div className="expected-power">
      {users.map((user, index) => {
        const { expectedWatts } = calculateExpectedPower(user.ftp, currentSegment?.effort || 1);
        return (
          <div key={index} className="user-power-row">
            <span className="user-name">{user.name}</span>
            <span className="user-watts">{expectedWatts} W</span>
          </div>
        );
      })}
    </div>
  );
};

export default ExpectedPower;
