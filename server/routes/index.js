const word = require("./word");
const list = require("./list");

module.exports = router => {
  word(router);
  list(router);
};
