const wordController = require("./../controllers/word.controller");

module.exports = router => {
  router.route("/words").get(wordController.getAll);
  router.route("/word").post(wordController.addWord);
  router.route("/word/:id").delete(wordController.deleteWord);
  router.route("/word/:word").get(wordController.getWord);
};
