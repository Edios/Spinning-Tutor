import React from 'react';

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
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2">Expected Power</h2>
      {users.map((user, index) => {
        const { expectedWatts } = calculateExpectedPower(user.ftp, currentSegment?.effort || 1);
        return (
          <div
            key={index}
            className="flex justify-between items-center border-b last:border-b-0 pb-2 text-gray-700"
          >
            <span className="text-lg font-semibold">{user.name}</span>
            <span className="text-lg font-bold text-right text-blue-600">{expectedWatts} W</span>
          </div>
        );
      })}
    </div>
  );
};

export default ExpectedPower;
