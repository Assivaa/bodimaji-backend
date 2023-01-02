require("dotenv").config();
const express = require("express");
const connectDB = require("./models/index");
const mongoose = require("mongoose");
const cors = require("cors");
const { collection, article } = require("./router");

mongoose.set("strictQuery", false);

connectDB();

const app = express();

app.use(express.json());

app.use(cors());
app.use("/", [collection, article]);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
