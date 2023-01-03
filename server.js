require("dotenv").config();
const express = require("express");
const connectDB = require("./models/index");
const mongoose = require("mongoose");
const cors = require("cors");
const { collection, article, users } = require("./router");
const { notFound, errorHandler } = require("./Middleware/Errors");

mongoose.set("strictQuery", false);

connectDB();

const app = express();

app.use(express.json());

app.use(cors());
app.use(notFound);
app.use(errorHandler);
app.use("/", [collection, article, users]);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
