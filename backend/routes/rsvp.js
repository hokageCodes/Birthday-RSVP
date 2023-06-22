const express = require('express');
const router = express.Router();
const RSVP = require('../models/rsvp');

// Route for fetching RSVP counts
// router.get('/counts', async (req, res) => {
//   try {
//     const yesCount = await RSVP.countDocuments({ attendance: 'yes' });
//     const noCount = await RSVP.countDocuments({ attendance: 'no' });
//     res.json({ yesCount, noCount });
//   } catch (error) {
//     res.status(500).json({ error: 'Error fetching RSVP counts' });
//   }
// });


// Route for submitting an RSVP
router.post('/', async (req, res) => {
  const { name, phone, email, attendance, additionalInfo } = req.body;

  try {
    const existingEmailRSVP = await RSVP.findOne({ email });
    const existingPhoneRSVP = await RSVP.findOne({ phone });

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



module.exports = router;
