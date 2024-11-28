import React, { useState } from 'react';

const IntroPage = ({ onStart }) => {
  const trainingPlans = [
    'HIIT Training',
    'Low Cadence',
    'Fat Burner',
    'Take it Easy',
    'Test Training',
  ];
  const [selectedTraining, setSelectedTraining] = useState('');
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState('');
  const [userFtp, setUserFtp] = useState('');
  const [autoplay, setAutoplay] = useState(false);

  const addUser = () => {
    if (userName && userFtp) {
      setUsers([...users, { name: userName, ftp: parseInt(userFtp) }]);
      setUserName('');
      setUserFtp('');
    }
  };

  const removeUser = (index) => {
    setUsers(users.filter((_, i) => i !== index));
  };

  const handleStart = () => {
    if (selectedTraining && users.length > 0) {
      if (typeof onStart === 'function') {
        console.log('Calling onStart with:', selectedTraining, users, autoplay);
        onStart(selectedTraining, users, autoplay);
      } else {
        console.error('onStart is not a function');
      }
    } else {
      alert('Please select a training plan and add at least one user.');
    }
  };

  return (
    <div className="p-8 max-w-xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Spinning Session Configurator</h1>

      {/* Training Plan Selection */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select a Training Plan</h2>
        <select
          value={selectedTraining}
          onChange={(e) => setSelectedTraining(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">-- Choose a Training --</option>
          {trainingPlans.map((plan, index) => (
            <option key={index} value={plan}>
              {plan}
            </option>
          ))}
        </select>
      </div>

      {/* User Management */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Manage Users</h2>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-1/2"
          />
          <input
            type="number"
            placeholder="FTP"
            value={userFtp}
            onChange={(e) => setUserFtp(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-1/2"
          />
          <button
            onClick={addUser}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Add User
          </button>
        </div>

        <ul className="space-y-2">
          {users.map((user, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{user.name} (FTP: {user.ftp})</span>
              <button
                onClick={() => removeUser(index)}
                className="text-red-500 hover:text-red-700"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Autoplay Option */}
      <div className="mb-6">
        <label className="inline-flex items-center space-x-2">
          <input
            type="checkbox"
            checked={autoplay}
            onChange={() => setAutoplay(!autoplay)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span>Autoplay (Start training automatically)</span>
        </label>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStart}
        className="w-full py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
      >
        Start Training
      </button>
    </div>
  );
};

export default IntroPage;