const { Console } = require("console");
const fs = require("fs");

const logger = new Console({
    stdout: fs.createWriteStream("./logs/sessionlog.txt"),
    stderr: fs.createWriteStream("./logs/errorlog.txt"),
});

//logger.log("Hello 😃. This will be saved in normalStdout.txt file");
//logger.error("Its an error ❌. This will be saved in errStdErr.txt file");

module.exports = logger;