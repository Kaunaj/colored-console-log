const logger = require("../logger");

const Repository = {};

Repository.run = () => {
  logger.warn("This message is in helper file");
};

module.exports = Repository;
