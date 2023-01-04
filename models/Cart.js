const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    username: { type: String },
    collections: [
      {
        _id: false,
        collectionId: {
          type: String,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
