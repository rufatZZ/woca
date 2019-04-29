const listController = require("./../controllers/list.controller");

module.exports = router => {
  router.route("/lists").get(listController.getAll);
  router.route("/list").post(listController.addList);
  router.route("/list/:id").delete(listController.deleteList);
  router.route("/list/:word").get(listController.getList);
};
