const mongoose = require("mongoose");

const envelopeSchema = new mongoose.Schema({
  name: String,
  balance: { type: Number, default: 0 },
});

module.exports = mongoose.model("Envelope", envelopeSchema);
