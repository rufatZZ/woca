const List = require("../models/List");
// const fs = require("fs");

module.exports = {
  addList: (req, res, next) => {
    let { title } = req.body;

    saveList({ title });

    function saveList(obj) {
      obj.createdAt = new Date(Date.now());
      List.findOneAndUpdate(
        { title: obj.title }, // find a document with that filter
        { $setOnInsert: obj }, // document to insert when nothing was found
        { upsert: true, new: true, runValidators: true }
      ).exec((err, list) => {
        if (err) {
          res.send({ status: "error", isSaved: false, response: err });
        } else if (!list) {
          res.send({ status: "ok", isSaved: false, response: "No result" });
        } else {
          return res.send({ status: "ok", isSaved: true, response: list });
        }

        next();
      });
    }
  },
  getAll: (req, res, next) => {
    List.find(req.params.id)
      .sort({ createdAt: -1 })
      .exec((err, list) => {
        if (err) {
          res.send(err);
        } else if (!list) {
          res.send(400);
        } else {
          res.send(list);
        }
        next();
      });
  },
  getList: (req, res, next) => {
    List.findOne({ title: req.params.list }).exec((err, list) => {
      if (err) {
        res.send({ status: "error", isExist: false, response: err });
      } else if (!list) {
        res.send({ status: "ok", isExist: false, response: "No result" });
      } else {
        res.send({ status: "ok", isExist: true, response: list });
      }
      next();
    });
  },
  deleteList: (req, res, next) => {
    List.findByIdAndRemove(req.params.id).exec((err, list) => {
      if (err) {
        res.send({ status: "error", isDeleted: false, response: err });
      } else if (!list) {
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