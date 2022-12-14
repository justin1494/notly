const express = require("express");
const app = express();
const port = 3001;
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// import Routes
const notesRoute = require("./routes/notes");
const articlesRoute = require("./routes/articles");

// middleveares
app.use(express.json());
app.use(cors());
app.use("/notes", notesRoute);
app.use("/articles", articlesRoute);

// connect to DB
mongoose.connect(process.env.DB_CONNECTION);

app.listen(process.env.PORT || port, () => {
  console.log("server is running");
});
