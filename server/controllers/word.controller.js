const Word = require("../models/Word");
// const fs = require("fs");

module.exports = {
  addWord: (req, res, next) => {
    let { title } = req.body;
    let createdAt = new Date(Date.now());

    saveWord({ title, createdAt });

    function saveWord(obj) {
      
      Word.findOneAndUpdate(
        { title: obj.title }, // find a document with that filter
        { $setOnInsert: obj }, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true }
      ).exec((err, word) => {
        if (err) {
          res.send({ status: "error", isSaved: false, response: err });
        } else if (!word) {
          res.send({ status: "ok", isSaved: false, response: "No result" });
        } else {
          return res.send({ status: "ok", isSaved: true, response: word });
        }

        next();
      });
    }
  },
  addListToWord: (req, res, next) => {
    let { title, listId } = req.body;

    addList({ title, listId });

    function addList(obj) {
      Word.findOneAndUpdate(
        { title: obj.title }, // find a document with that filter
        { $push: { lists: obj.listId } }
      ).exec((err, word) => {
        if (err) {
          res.send({ status: "error", isSaved: false, response: err });
        } else if (!word) {
          res.send({ status: "ok", isSaved: false, response: "No result" });
        } else {
          return res.send({ status: "ok", isSaved: true, response: word });
        }

        next();
      });
    }
  },
  removeListToWord: (req, res, next) => {
    let { title, listId } = req.body;

    removeList({ title, listId });

    function removeList(obj) {
      Word.findOneAndUpdate(
        { title: obj.title }, // find a document with that filter
        { $pull: { lists: { $in: [obj.listId] } } }
      ).exec((err, word) => {
        if (err) {
          res.send({ status: "error", isSaved: false, response: err });
        } else if (!word) {
          res.send({ status: "ok", isSaved: false, response: "No result" });
        } else {
          return res.send({ status: "ok", isSaved: true, response: word });
        }

        next();
      });
    }
  },
  getAll: (req, res, next) => {
    const searchParams = req.params.list
      ? { lists: { $in: [req.params.list] } }
      : {};

    Word.find(searchParams)
      .populate({ path: "lists", model: "List" })
      .sort({ createdAt: -1 })
      .exec((err, word) => {
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
    Word.findOne({ title: req.params.word }).exec((err, word) => {
      if (err) {
        res.send({ status: "error", isExist: false, response: err });
      } else if (!word) {
        res.send({ status: "ok", isExist: false, response: "No result" });
      } else {
        res.send({ status: "ok", isExist: true, response: word });
      }
      next();
    });
  },
  deleteWord: (req, res, next) => {
    Word.findByIdAndRemove(req.params.id).exec((err, word) => {
      if (err) {
        res.send({ status: "error", isDeleted: false, response: err });
      } else if (!word) {
        res.send({ status: "ok", isDeleted: false, response: "Cant delete" });
      } else {
        res.send({
          status: "ok",
          isDeleted: true,
          response: "Successfully deleted"
        });
      }
      next();
    });
  }
};
