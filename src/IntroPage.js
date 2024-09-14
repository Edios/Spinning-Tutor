import React, { useState } from 'react';
import './IntroPage.css';
const IntroPage = ({ onStart }) => {
  // Predefined training plans
  const trainingPlans = [
    'HIIT Training',
    'Low Cadence',
    'Fat Burner',
    'Take it Easy',
    'Test Training'
  ];

  // State to manage selected training and users
  const [selectedTraining, setSelectedTraining] = useState('');
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userFtp, setUserFtp] = useState('');

  // Handle adding a new user
  const addUser = () => {
    if (userName && userFtp) {
      setUsers([...users, { name: userName, ftp: parseInt(userFtp) }]);
      setUserName('');
      setUserFtp('');
    }
  };

  // Handle removing a user
  const removeUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleStart = () => {
    if (selectedTraining && users.length > 0) {
      onStart(selectedTraining, users); // Pass selected training and users to the parent component
    } else {
      alert('Please select a training plan and add at least one user.');
    }
  };

  return (
    <div className="intro-page">
      <h1>Spinning Session Configurator</h1>

      <div className="training-selection">
        <h2>Select a Training Plan</h2>
        <select
          value={selectedTraining}
          onChange={(e) => setSelectedTraining(e.target.value)}
        >
          <option value="">-- Choose a Training --</option>
          {trainingPlans.map((plan, index) => (
            <option key={index} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>

      <div className="user-management">
        <h2>Manage Users</h2>
        <div className="user-input">
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            type="number"
            placeholder="FTP"
            value={userFtp}
            onChange={(e) => setUserFtp(e.target.value)}
          />
          <button onClick={addUser}>Add User</button>
        </div>
        <ul className="user-list">
          {users.map((user, index) => (
            <li key={index}>
              {user.name} (FTP: {user.ftp})
              <button onClick={() => removeUser(index)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={handleStart}>Start Training</button>
    </div>
  );
};

export default IntroPage;
