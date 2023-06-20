const express = require('express');
const router = express.Router();
const RSVP = require('../models/rsvp');

// Route for fetching RSVP counts
router.get('/count', async (req, res) => {
  try {
    const yesCount = await RSVP.countDocuments({ attendance: 'yes' });
    const noCount = await RSVP.countDocuments({ attendance: 'no' });
    res.json({ yesCount, noCount });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching RSVP counts' });
  }
});

// Route for submitting an RSVP
router.post('/', async (req, res) => {
  const { name, phone, email, attendance, additionalInfo } = req.body;

  try {
    const existingRSVP = await RSVP.findOne({ $or: [{ email }, { phone }] });

    if (existingRSVP) {
      return res.status(400).json({ error: 'You have already RSVPed with this email address.' });
    }

    const newRSVP = new RSVP({
      name,
      phone,
      email,
      attendance,
      additionalInfo,
    });

    await newRSVP.save();

    res.json({ message: 'Thank you for RSVPing!' });
  } catch (error) {
    res.status(500).json({ error: 'Error submitting RSVP' });
  }
});

module.exports = router;
