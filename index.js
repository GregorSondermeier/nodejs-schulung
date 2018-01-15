const Logger = require('./modules/Logger');

let logger = new Logger();

logger.log("Hello World!");
logger.logThrice("One");
logger.logThrice("One", "Two");
logger.logThrice("One", "Two", "Three");