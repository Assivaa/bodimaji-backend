const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: "buyer",
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

userSchema.plugin(autoIncrement, { inc_field: "userId" });

const User = mongoose.model("User", userSchema);

module.exports = User;