/** Class for implementing console.log functionality */
class Logger {
  /**
   * Sets properties RESET and LEVELS
   */
  constructor() {
    // Color codes reference: https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
    this.RESET = "\x1b[0m"; // reset previously used color
    this.LEVELS = {
      "normal": "",
      "success": "\x1b[32m", // green
      "info": "\x1b[34m", // blue
      "warn": "\x1b[33m", // yellow
      "error": "\x1b[31m", // red
    };
    Object.freeze(this.LEVELS);
  }

  /**
   * Calculates space padding needed for 'str'
   * based on maximum length string in 'arr'
   * @param {String} str - the input string
   * @param {Array} arr - list which contains max length string
   * @returns {String} - padding of required length
   */
  calculatePadding(str, arr) {
    try {
      const maxLengthStr = arr.reduce((a, b) => (a.length > b.length ? a : b));
      return maxLengthStr.length - str.length > 0
        ? " ".repeat(maxLengthStr.length - str.length)
        : "";
    } catch (e) {
      console.log(
        "Could not calculate padding for",
        str,
        "in",
        JSON.stringify(arr),
        "\nReason:",
        e
      );
      return "";
    }
  }

  /**
   * Creates a stack trace and returns the caller file details
   * @returns {Object} - the caller file name, line and column
   */
  getCallerFile() {
    let originalFunc = Error.prepareStackTrace;

    let callerfile;
    let line;
    let column;
    try {
      let err = new Error();
      let currentfile;

      Error.prepareStackTrace = function (err, stack) {
        return stack;
      };

      let trace = err.stack;
      currentfile = trace.shift().getFileName();
      // console.log({ currentfile });

      while (trace.length) {
        const _temp = trace.shift();
        callerfile = _temp.getFileName();
        // console.log({ callerfile });

        if (currentfile !== callerfile) {
          line = _temp.getLineNumber();
          column = _temp.getColumnNumber();
          break;
        }
      }
    } catch (e) {
      console.log("Could not find caller file", "\nReason:", e);
    }

    Error.prepareStackTrace = originalFunc;

    // console.log("final callerfile", { callerfile, line });
    return { callerfile, line, column };
  }

  /**
   * Prints a message formatted according to given level
   * @param {String} msg - the message to be printed
   * @param {String} level - priority level of the message
   */
  print(msg, level = "") {
    try {
      // this.info(typeof msg);
      const caller = this.getCallerFile();
      if (typeof msg === "object") {
        msg = JSON.stringify(msg, null, 2);
      }
      const color = level ? this.LEVELS[level] : "";
      const timestamp = new Date();
      const padding = this.calculatePadding(level, Object.keys(this.LEVELS));
      level += padding;
      const formattedMsg = `${level} | ${timestamp} | ${caller.callerfile} at line ${caller.line} | ${msg}`;
      console.log(color, formattedMsg, this.RESET);
    } catch (e) {
      console.log("Could not log", level, "message:", msg, "\nReason:", e);
    }
  }

  /**
   * Prints out normal messages in order
   * @param  {...any} msgs - the messages to be printed
   */
  log(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "normal");
    }
  }

  /**
   * Prints out success messages in order
   * @param  {...any} msgs - the messages to be printed
   */
  success(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "success");
    }
  }

  /**
   * Prints out info messages in order
   * @param  {...any} msgs - the messages to be printed
   */
  info(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "info");
    }
  }

  /**
   * Prints out warn messages in order
   * @param  {...any} msgs - the messages to be printed
   */
  warn(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "warn");
    }
  }

  /**
   * Prints out error messages in order
   * @param  {...any} msgs - the messages to be printed
   */
  error(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "error");
    }
  }
}

module.exports = new Logger();
