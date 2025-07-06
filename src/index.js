/* eslint-disable node/no-process-env */
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MONGO DB connect")).catch(err => console.log(err));

// Route
app.use("/api/income", require("../routes/income"));
app.use("/api/envelope", require("../routes/envelope"));

const PORT = process.eventNames.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
