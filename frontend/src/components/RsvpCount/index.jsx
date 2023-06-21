import { useState, useEffect } from 'react';
import axios from 'axios';

function RSVPCount() {
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    const fetchRSVPCounts = async () => {
      try {
        const response = await axios.get('/api/rsvps/counts');
        setYesCount(response.data.yesCount);
        setNoCount(response.data.noCount);
      } catch (error) {
        console.error('Error fetching RSVP counts:', error);
      }
    };

    fetchRSVPCounts();
  }, []);

  return (
    <div className="rsvp-count">
      <p>{yesCount} people will be attending</p>
      <p>{noCount} people will not be attending</p>
    </div>
  );
}

export default RSVPCount;
