const express = require("express");

const router = express.Router();
const Income = require("../models/income");

// Get current income
router.get("/", async (req, res) => {
  const income = await Income.findOne();
  res.json(income || { total: 0 });
});

// Add income
router.post("/", async (req, res) => {
  const { amount } = req.body;
  let income = await Income.findOne();
  if (!income)
    income = new Income({ total: 0 });
  income.total += amount;
  await income.save();
  res.json(income);
});

module.exports = router;
