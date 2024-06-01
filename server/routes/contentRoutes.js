const express = require("express");
const multer = require("multer");
const Content = require("../models/Content");
const auth = require("../middleware/authMiddleware");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/content", [auth, upload.array("images")], async (req, res) => {
  const { title, description } = req.body;
  const images = req.files.map(
    (file) => `data:${file.mimetype};base64,${file.buffer.toString("base64")}`
  );
  const content = new Content({ title, description, images });

  try {
    await content.save();
    res.status(201).json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/content", auth, async (req, res) => {
  try {
    const content = await Content.find();
    res.json(content);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
