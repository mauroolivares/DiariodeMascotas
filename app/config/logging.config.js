const { Console } = require("console");
const fs = require("fs");

const logger = new Console({
    stdout: fs.createWriteStream("./logs/sessionlog.txt"),
    stderr: fs.createWriteStream("./logs/errorlog.txt"),
});

logger.log(`Datos de la sesión: ${new Date()}`);
logger.error(`Errores de la sesión: ${new Date()}`);

module.exports = logger;