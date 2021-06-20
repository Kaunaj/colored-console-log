const logger = require("../logger");

const Repository = {};

Repository.run = () => {
  logger.warn("This message is in helper file printed using warn() method");
};

module.exports = Repository;
