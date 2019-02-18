const Word = require("../models/Word");
const fs = require("fs");

module.exports = {
  addWord: (req, res, next) => {
    let { title } = req.body;

    saveWord({ title });

    function saveWord(obj) {
      Word.findOneAndUpdate(
        { title: obj.title }, // find a document with that filter
        { $setOnInsert: obj }, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true }
      ).exec((err, word) => {
        if (err) {
          res.send(err);
        } else if (!word) {
          res.send(400);
        } else {
          return res.send(word);
        }

        next();
      });
    }
  },
  getAll: (req, res, next) => {
    Word.find(req.params.id).exec((err, word) => {
      if (err) {
        res.send(err);
      } else if (!word) {
        res.send(400);
      } else {
        res.send(word);
      }
      next();
    });
  },
  getWord: (req, res, next) => {
    Word.findById(req.params.id).exec((err, word) => {
      if (err) {
        res.send(err);
      } else if (!word) {
        res.send(400);
      } else {
        res.send(word);
      }
      next();
    });
  }
};
