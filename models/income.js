const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  total: { type: Number, default: 0 },
});

module.exports = mongoose.model("Income", incomeSchema);
