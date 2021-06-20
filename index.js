const logger = require("./logger");
const helper = require("./service/helper");

/**
 * Waits for T seconds
 * @param {Number} time - the time to wait in seconds
 */
let waitInSeconds = (time) => {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve();
      }, time * 1000);
    } catch (e) {
      logger.error(e);
      reject();
    }
  });
};

(async () => {
  console.log("Message printed using console.log() function");
  await waitInSeconds(2);
  logger.log("This is a normal message printed using log() method");
  await waitInSeconds(2);
  logger.success("This is a success message printed using success() method");
  await waitInSeconds(2);
  logger.info("This is an info/debug message printed using info() method");
  await waitInSeconds(2);
  logger.log("This is another normal message");
  await waitInSeconds(2);
  logger.warn("This is a warning message printed using warn() method");
  await waitInSeconds(2);
  logger.error("This is an error message printed using error() method");
  await waitInSeconds(2);
  logger.success({
    status: 200,
    message:
      "This is a success message of type object, will be stringified before printing",
    body: { name: "Kaunaj Banerjee", designation: "Software Developer" },
  });
  await waitInSeconds(2);
  logger.log(
    "If there are multiple comma separated messages",
    "Each message will be printed in a new line",
    ["Objects", "will", "be", "stringified", "before", "printing"]
  );
  await waitInSeconds(2);
  helper.run();
})();
