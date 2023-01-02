const mongoose = require("mongoose");

const collectionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    countInStock: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Collection = mongoose.model("collection", collectionSchema);

module.exports = Collection;
