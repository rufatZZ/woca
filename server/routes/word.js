const wordController = require("./../controllers/word.controller");
const multipart = require("connect-multiparty");
const multipartWare = multipart();

module.exports = router => {
  router.route("/words").get(wordController.getAll);
  router.route("/word").post(multipartWare, wordController.addWord);
  router.route("/word/:id").get(wordController.getWord);
};
