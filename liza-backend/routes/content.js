const express = require("express");
const router = express.Router();
const Content = require("../models/Content");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

router.get("/", async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", upload.array("images", 10), async (req, res) => {
  const images = req.files.map((file) => file.path);
  const content = new Content({
    title: req.body.title,
    description: req.body.description,
    images: images,
  });

  try {
    const newContent = await content.save();
    res.status(201).json(newContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    content.title = req.body.title || content.title;
    content.description = req.body.description || content.description;
    content.images = req.body.images || content.images;

    const updatedContent = await content.save();
    res.json(updatedContent);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const content = await Content.findById(req.params.id);
    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }
    await content.remove();
    res.json({ message: "Content deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;