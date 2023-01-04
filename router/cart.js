const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");

router.get("/cart/:id", async (req, res) => {
  const username = req.params.id;
  try {
    const cart = await Cart.find({ username });
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/cart/:id", async (req, res) => {
  try {
    const username = req.params.id;
    if (username === req.body.username) {
      try {
        const updatedCart = await Cart.updateOne(
          { "collections.collectionId": req.body.collectionId },
          { $set: { "collections.$.quantity": req.body.quantity } }
        );
        res.status(200).json(updatedCart);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You cannot add to other's cart");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
