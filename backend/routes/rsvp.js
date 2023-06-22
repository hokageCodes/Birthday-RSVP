const express = require('express');
const router = express.Router();
const RSVP = require('../models/rsvp');


// Route for submitting an RSVP
router.post('/', async (req, res) => {
  const { name, phone, email, attendance, additionalInfo } = req.body;

  try {
    const existingEmailRSVP = await RSVP.findOne({ email, _id: { $ne: req.body._id } });
    const existingPhoneRSVP = await RSVP.findOne({ phone, _id: { $ne: req.body._id } });
    

    if (existingEmailRSVP && existingPhoneRSVP) {
      return res.status(400).json({ message: 'You have already RSVPed with this email address and phone number.' });
    }

    if (existingEmailRSVP) {
      return res.status(400).json({ message: 'You have already RSVPed with this email address.' });
    }

    if (existingPhoneRSVP) {
      return res.status(400).json({ message: 'You have already RSVPed with this phone number.' });
    }

    const newRSVP = new RSVP({
      name,
      phone,
      email,
      attendance,
      additionalInfo,
    });

    await newRSVP.save();

    res.json({ message: 'Thank you for RSVPing!', rsvp: newRSVP });
  } catch (error) {
    console.error('Error submitting RSVP:', error);
    res.status(500).json({ error: 'An error occurred while submitting the RSVP.' });
  }
});

// Route for retrieving RSVP count
router.get('/counts', async (req, res) => {
  try {
    const count = await RSVP.countDocuments();
    res.json({ count });
  } catch (error) {
    console.error('Error retrieving RSVP count:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the RSVP count.' });
  }
});

// Route for retrieving RSVP count by attendance
router.get('/count/vote', async (req, res) => {
  try {
    const countByAttendance = await RSVP.aggregate([
      { $group: { _id: '$attendance', count: { $sum: 1 } } },
    ]);
    res.json({ countByAttendance });
  } catch (error) {
    console.error('Error retrieving RSVP count by attendance:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the RSVP count by attendance.' });
  }
});


module.exports = router;
