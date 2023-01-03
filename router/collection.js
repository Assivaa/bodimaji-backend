const asyncHandler = require("express-async-handler");
const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");

router.get("/", async (req, res) => {
  res.status(200).json("Bodimaji API");
});

router.get(
  "/collection/",
  asyncHandler(async (req, res) => {
    const collection = await Collection.find({});
    res.json(collection);
  })
);

router.get(
  "/collection/latest",
  asyncHandler(async (req, res) => {
    const collection = await Collection.find().sort({ createdAt: -1 }).limit(3);
    if (collection) {
      res.json(collection);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

router.get(
  "/collection/:id",
  asyncHandler(async (req, res) => {
    const collection = await Collection.findById(req.params.id);
    if (collection) {
      res.json(collection);
    } else {
      res.status(404);
      throw new Error("Product not Found");
    }
  })
);

router.post("/collection", async (req, res) => {
  const newCollection = new Collection(req.body);
  try {
    const savedCollection = await newCollection.save();
    res.status(200).json(savedCollection);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/collection/:id", async (req, res) => {
  try {
    const updatedcollection = await Collection.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedcollection);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/collection/:id", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.id);
    await collection.delete();
    res.status(200).json("Collection has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
