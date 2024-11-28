import React from 'react';

// Function to determine color based on effort level
const getColorForEffort = (effort) => {
  const colorScale = [
    '#4caf50', // 1 (green)
    '#8bc34a', // 2
    '#cddc39', // 3
    '#ffeb3b', // 4
    '#ffc107', // 5
    '#ff9800', // 6
    '#ff5722', // 7
    '#f44336', // 8
    '#e91e63', // 9
    '#d50032', // 10 (red)
  ];
  return colorScale[effort - 1] || '#4caf50'; // Default to green if effort is out of range
};

const EffortLevelBar = ({ segments, currentSegment }) => {
  const totalDuration = segments.reduce((sum, seg) => sum + seg.duration, 0);

  return (
    <div className="h-[70%] bg-gray-100 border-t-2 border-gray-300 p-3 rounded-lg">
      <div className="flex h-full bg-gray-300 rounded-lg overflow-hidden">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`relative flex items-center justify-center text-white text-lg font-bold transition-all duration-300 ${
              index === currentSegment ? 'animate-blink' : ''
            }`}
            style={{
              width: `${(segment.duration / totalDuration) * 100}%`,
              backgroundColor: getColorForEffort(segment.effort), // Dynamic effort-based color
            }}
          >
            <span className="absolute bg-black bg-opacity-60 py-1 px-3 rounded-md text-sm">
              {segment.effort}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EffortLevelBar;
