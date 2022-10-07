const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const NotesModel = require("./models/Notes");
require("dotenv").config();

const cors = require("cors");

// this parsing json from requests~!
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION);

app.get("/getNotes", (req, res) => {
  NotesModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.delete("/deleteNote", (req, res) => {
  const id = req.body;
  NotesModel.findByIdAndDelete(id).then((result) => {
    res.json(result);
  });
});

app.put("/editNote", (req, res) => {
  const id = req.body;
  NotesModel.findById(id).then((result) => {
    res.json(result);
    result.title = req.body.title;
    result.text = req.body.text;
    result.save();

  });
});

app.post("/createNote", async (req, res) => {
  const note = req.body;
  const newNote = new NotesModel(note);
  await newNote.save();

  res.json(note);
});

app.listen(port, () => {
  console.log("server is running");
});
