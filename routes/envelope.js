const express = require("express");

const router = express.Router();
const Envelope = require("../models/envelope");
const Income = require("../models/income");

// create new envelope
router.post("/", async (req, res) => {
  const envelope = await new Envelope({ name: req.body.name }).save();
  res.json(envelope);
});

// Get all envelope
router.get("/", async (req, res) => {
  const envelopes = await Envelope.find();
  res.json(envelopes);
});

// Allocate from income
router.post("/allocate", async (req, res) => {
  const { envelopeId, amount } = req.body;
  const income = await Income.findOne();
  if (!income || income.total < amount)
    return res.status(400).json({ error: "Not Enough income" });
  const envelope = await Envelope.findById(envelopeId);
  envelope.balance += amount;
  income.total -= amount;

  await envelope.save();
  await income.save();
  res.json({ envelope, income });
});

// spend from envelope
router.post("/spend", async (req, res) => {
  const { envelopeId, amount } = req.body;
  const envelope = await Envelope.findById(envelopeId);
  if (!envelope || envelope.balance < amount)
    return res.status(400).json({ error: "Not enough balance" });
  envelope.balance -= amount;
  await envelope.save();
  res.json(envelope);
});

module.exports = router;
