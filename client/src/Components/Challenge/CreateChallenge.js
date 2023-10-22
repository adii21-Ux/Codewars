import React, { useState } from 'react';
import './CreateChallenge.css';
import Profile from '../Auth/Profile';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateChallenge() {
  const navigate = useNavigate();
  const [challengeName, setChallengeName] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [inviteCodeVisible, setInviteCodeVisible] = useState(false);

  const handleChallengeNameChange = (e) => {
    setChallengeName(e.target.value);
  };

  const handleCreateChallenge = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/create-challenge', { challengeName });

      if (response.status === 200) {
        const newInviteCode = response.data.invite_code;
        setInviteCode(newInviteCode);
        setInviteCodeVisible(true);
        // navigate() navigate to room page
      } else {
        alert(response.data.message);
        // Clear the challenge name input
        setChallengeName('');
      }
    } catch (error) {
      console.error('Error creating a challenge:', error);
    }
  };

  return (
    <div className="create-challenge-container">
      <Profile />
      <h1 className="codewars-heading">CodeWars</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="Challenge Name"
          value={challengeName}
          onChange={handleChallengeNameChange}
        />
        {inviteCodeVisible && (
          <div className="invite_code">{inviteCode}</div>
        )}
        <button className="create-button" onClick={handleCreateChallenge}>
          Create
        </button>
      </div>
    </div>
  );
}

export default CreateChallenge;
