const logger = require("./logger");
const helper = require("./service/helper");

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
  logger.log("This is a normal message");
  await waitInSeconds(2);
  logger.success("This is a success message");
  await waitInSeconds(2);
  logger.info("This is an info/debug message");
  await waitInSeconds(2);
  logger.log("This is another normal message");
  await waitInSeconds(2);
  logger.warn("This is a warning message");
  await waitInSeconds(2);
  logger.error("This is an error message");
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
