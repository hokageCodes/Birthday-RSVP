const mongoose = require('mongoose');

const rsvpSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  attendance: { type: String, required: true },
  additionalInfo: String,
});

module.exports = mongoose.model('RSVP', rsvpSchema);
