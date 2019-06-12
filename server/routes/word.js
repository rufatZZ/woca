const wordController = require("./../controllers/word.controller");

module.exports = router => {
  router.route(["/words", "/words/:list?"]).get(wordController.getAll);
  router.route("/word").post(wordController.addWord);
  router.route("/word/:id").delete(wordController.deleteWord);
  router.route("/word/:word").get(wordController.getWord);
  router.route("/wordlist/:word").post(wordController.addListToWord);
  router.route("/wordremovelist/:word").delete(wordController.removeListToWord);
};
