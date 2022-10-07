const mongoose = require("mongoose");

const NotesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },

});

const NotesModel = mongoose.model("notes", NotesSchema);
module.exports = NotesModel;
