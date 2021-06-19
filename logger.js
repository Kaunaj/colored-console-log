class Logger {
  constructor() {
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

  print(msg, level = "") {
    try {
      // this.info(typeof msg);
      const caller = this.getCallerFile();
      if (typeof msg === "object") {
        msg = JSON.stringify(msg, null, 2);
      }
      const color = level ? this.LEVELS[level] : "";
      const timestamp = new Date();
      const formattedMsg = `${level} | ${timestamp} | ${caller.callerfile} at line ${caller.line} | ${msg}`;
      console.log(color, formattedMsg, this.RESET);
    } catch (e) {
      console.log("Could not log", level, "message:", msg, "\nReason:", e);
    }
  }

  log(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "normal");
    }
  }

  success(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "success");
    }
  }

  info(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "info");
    }
  }

  warn(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "warn");
    }
  }

  error(...msgs) {
    for (let msg of msgs) {
      this.print(msg, "error");
    }
  }
}

module.exports = new Logger();
