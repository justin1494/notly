const express = require("express");
const router = express.Router();
const Note = require("../models/note");

// gets back all the notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.json({ message: err });
  }
});

// this submits a note
router.post("/", async (req, res) => {
  const post = new Note({
    title: req.body.title,
    text: req.body.text,
  });

  const savedNote = await post.save();
  try {
    res.json(savedNote);
  } catch (err) {
    res.json({ message: err });
  }
});

// delete note
router.delete("/:postId", async (req, res) => {
  try {
    const removedNote = await Note.deleteOne({ _id: req.params.postId });
    res.json(removedNote);
  } catch {
    res.json({ message: err });
  }
});

// update post
router.patch("/:postId", async (req, res) => {
  try {
    const updatedNote = await Note.updateOne(
      { _id: req.params.postId },
      { $set: { title: req.body.title, text: req.body.text } }
    );
    res.json(updatedNote);
  } catch {
    res.json({ message: err });
  }
});

module.exports = router;
