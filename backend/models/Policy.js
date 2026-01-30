const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  policyNumber: { type: String, required: true },
  type: { type: String, required: true },
  premium: { type: Number, required: true },
  effectiveDate: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Policy', PolicySchema);