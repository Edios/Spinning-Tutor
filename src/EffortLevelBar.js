import React from 'react';
import './EffortLevelBar.css'; // Import the CSS file

// Function to determine color based on effort level
const getColorForEffort = (effort) => {
  // Define a gradient or set of colors based on effort levels
  // For example, from green (low effort) to red (high effort)
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
    '#d50032'  // 10 (red)
  ];
  return colorScale[effort - 1] || '#4caf50'; // Default to green if effort is out of range
};

const EffortLevelBar = ({ segments, currentSegment }) => {
  const totalDuration = segments.reduce((sum, seg) => sum + seg.duration, 0);

  return (
    <div className="effort-level-bar">
      <div className="bars">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`bar ${index === currentSegment ? 'active' : ''}`} // Add 'active' class to current segment
            style={{
              width: `${(segment.duration / totalDuration) * 100}%`,
              backgroundColor: getColorForEffort(segment.effort) // Apply color based on effort
            }}
          >
            <div className="bar-content">
              <span className="effort-display">{segment.effort}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EffortLevelBar;
