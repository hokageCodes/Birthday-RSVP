import { useState } from 'react';
import axios from 'axios';

const RSVPCount = ({ yesCount, noCount }) => {
  const [updatingVote, setUpdatingVote] = useState(false);

  const handleVote = async (vote) => {
    if (updatingVote) {
      return; // Prevent multiple simultaneous votes
    }

    setUpdatingVote(true);

    try {
      await axios.post('http://localhost:5000/api/rsvps/vote', { vote });

      if (vote === 'yes') {
        setYesCount(yesCount + 1);
      } else if (vote === 'no') {
        setNoCount(noCount + 1);
      }
    } catch (error) {
      console.error('Error submitting vote:', error);
    }

    setUpdatingVote(false);
  };

  return (
    <div>
      <h2>RSVP Count</h2>
      <div>
        <button disabled={updatingVote} onClick={() => handleVote('yes')}>
          Yes
        </button>
        <span>{yesCount}</span>
      </div>
      <div>
        <button disabled={updatingVote} onClick={() => handleVote('no')}>
          No
        </button>
        <span>{noCount}</span>
      </div>
    </div>
  );
};

export default RSVPCount;
