const express = require("express");
const router = express.Router();
const Article = require("../models/article");

// gets back all the notes
router.get("/", async (req, res) => {
    try {
      const articles = await Article.find();
      res.json(articles);
    } catch (err) {
      res.json({ message: err });
    }
  });
  
  // this submits a note
  router.post("/", async (req, res) => {
    const article = new Article({
      title: req.body.title,
      text: req.body.text,
      link: req.body.link
    });
  
    const savedArticle = await article.save();
    try {
      res.json(savedArticle);
    } catch (err) {
      res.json({ message: err });
    }
  });

  // delete note
router.delete("/:articleId", async (req, res) => {
  try {
    const removedArticle = await Article.deleteOne({ _id: req.params.articleId });
    res.json(removedArticle);
  } catch {
    res.json({ message: err });
  }
});

// update post
router.patch("/:articleId", async (req, res) => {
  try {
    const updatedArticle = await Article.updateOne(
      { _id: req.params.articleId },
      { $set: { title: req.body.title } }
    );
    res.json(updatedArticle)
  } catch {
    res.json({ message: err });
  }
});

  module.exports = router