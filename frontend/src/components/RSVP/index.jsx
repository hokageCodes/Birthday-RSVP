import { useEffect, useState } from 'react';
import { database } from '../../firebase';
import './rsvp.css';
import FormImage  from '../../images/rsvp.png'

function RSVPForm() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [attendance, setAttendance] = useState('yes');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [yesCount, setYesCount] = useState(0);
  const [noCount, setNoCount] = useState(0);

  useEffect(() => {
    const yesCountRef = database.ref('yesCount');
    const noCountRef = database.ref('noCount');
  
    // Get count of RSVPs where attendance is "yes"
    yesCountRef.on('value', (snapshot) => {
      setYesCount(snapshot.val() || 0);
    });
  
    // Get count of RSVPs where attendance is "no"
    noCountRef.on('value', (snapshot) => {
      setNoCount(snapshot.val() || 0);
    });
  
    return () => {
      // Unsubscribe from the Firebase listeners when the component unmounts
      yesCountRef.off();
      noCountRef.off();
    }
  }, []);
  
  useEffect(() => {
    const rsvpsRef = database.ref('rsvps');
  
    // Listen for changes to the RSVPs in the database
    rsvpsRef.on('child_added', (snapshot) => {
      const rsvp = snapshot.val();
  
      // Update the RSVP count in state
      if (rsvp.attendance === 'yes') {
        setYesCount((currentCount) => currentCount + 1);
      } else {
        setNoCount((currentCount) => currentCount + 1);
      }
    });
  
    return () => {
      // Unsubscribe from the Firebase listener when the component unmounts
      rsvpsRef.off();
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Check if RSVP already exists with the same email or phone number
      const rsvpsRef = database.ref('rsvps');
      const snapshot = await rsvpsRef.orderByChild('email').equalTo(email).once('value');
      const existingRSVP = snapshot.val();
  
      if (existingRSVP) {
        setSuccessMessage('');
        setErrorMessage('You have already RSVPed with this email address.');
        return;
      }
  
      // Add RSVP to database
      const newRSVPRef = database.ref('rsvps').push();
      await newRSVPRef.set({
        name,
        phone,
        email,
        attendance,
        additionalInfo,
      });
  
      // Update the RSVP count in the database
      if (attendance === 'yes') {
        database.ref('yesCount').transaction((currentCount) => {
          return (currentCount || 0) + 1;
        });
      } else {
        database.ref('noCount').transaction((currentCount) => {
          return (currentCount || 0) + 1;
        });
      }
  
      setSuccessMessage('Thank you for RSVPing!');
      setErrorMessage('');
      setName('');
      setPhone('');
      setEmail('');
      setAttendance('yes');
      setAdditionalInfo('');
    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Error submitting RSVP: ' + error.message);
    }
  };
  
  
  return (
    <div className="rsvp_container">
      <div className="left">
        <img src={FormImage} alt='' />
        <div className="rsvp_count">
          <div className="rsvp-count">
            <p>{yesCount} people will be attending</p>
            <p>{noCount} people will not be attending</p>
          </div>
        </div>
      </div>
      <div className="right">
        <form id="rsvpform" className="rsvp-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <p>Kindly let me know if you will be attending my party</p>
          </div>
          {successMessage && <div className="success-message">{successMessage}</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number*</label>
            <input type="tel" id="phone" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email Address*</label>
            <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label htmlFor="attendance">Will you be attending?*</label>
            <select id="attendance" name="attendance" value={attendance} onChange={(e) => setAttendance(e.target.value)} required>
              <option value="yes">Yes, I will be attending</option>
              <option value="no">No, I will not be attending</option>
            </select>
          </div>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default RSVPForm;
