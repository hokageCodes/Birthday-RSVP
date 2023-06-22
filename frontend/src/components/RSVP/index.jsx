import { useState } from 'react';
import axios from 'axios';
import './rsvp.css';

function RSVPForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // useEffect(() => {
  //   const fetchRSVPCounts = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/api/rsvps/counts');
  //       setYesCount(response.data.yesCount);
  //       setNoCount(response.data.noCount);
  //     } catch (error) {
  //       console.error('Error fetching RSVP counts:', error);
  //       setYesCount(0);
  //       setNoCount(0);
  //     }
  //   };
    

  //   fetchRSVPCounts();
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:5000/api/rsvps', {
        name,
        phone,
        email,
        attendance,
        additionalInfo,
      });
  
      if (response.data.message) {
        setSuccessMessage(response.data.message);
        setErrorMessage('');
        setName('');
        setPhone('');
        setEmail('');
        setAttendance('yes');
        setAdditionalInfo('');
      }
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setSuccessMessage('');
        setErrorMessage(error.response.data.message);
      } else {
        setSuccessMessage('');
        setErrorMessage('An error occurred while submitting the RSVP. Please try again later.');
      }
    }
  };
  
  
  

  return (
    <div className="rsvp_container">
      <div className="right">
        <form id="rsvpform" className="rsvp-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <p>Kindly let me know if you will be attending my party</p>
          </div>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number*</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="attendance">Will you be attending?*</label>
            <select
              id="attendance"
              name="attendance"
              value={attendance}
              onChange={(e) => setAttendance(e.target.value)}
              required
            >
              <option value="yes">Yes, I will be attending</option>
              <option value="no">No, I will not be attending</option>
            </select>
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default RSVPForm;
