const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");

router.get("/", async (req, res) => {
  res.status(200).json("Bodimaji API");
});

router.get("/collection/", async (req, res) => {
  try {
    let collection;
    collection = await Collection.find();
    res.status(200).json(collection);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/collection", async (req, res) => {
  const newCollection = new Collection(req.body);
  try {
    const savedCollection = await newCollection.save();
    res.status(200).json(savedCollection);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/collection/latest", async (req, res) => {
  try {
    let collection;
    collection = await Collection.find().sort({ createdAt: -1 }).limit(3);
    res.status(200).json(collection);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/collection/:id", async (req, res) => {
  try {
    let collection;
    collection = await Collection.findById(req.params.id);
    res.status(200).json(collection);
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
