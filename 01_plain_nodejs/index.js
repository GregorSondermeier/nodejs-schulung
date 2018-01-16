'use strict';
const Logger = require('./modules/Logger');
const LoggerObj = require('./modules/LoggerObj');

// let logger = new Logger();

// logger.log("Hello World!");
// logger.logThrice("One");
// logger.logThrice("One", "Two");
// logger.logThrice("One", "Two", "Three");

// logger.addDebug = () => {
// 	console.debug = function(str) {
// 		this.log(str);
// 	}
// };
// logger.addDebug();

// logger.debug('Debugging...');

// let loggerFrozen = Object.freeze(logger);

// logger.addDebug = "now i am a string";
// loggerFrozen.addDebug = "now i am a string";

// console.log('logger:', logger);
// console.log('loggerFrozen:', loggerFrozen);
// console.log('Logger:', Logger);
// console.log('LoggerFrozen:', LoggerFrozen);
// console.log('logger.prototype:', logger.prototype);
// console.log('Logger.prototype:', Logger.prototype);

LoggerObj.log('Hello World');

const LoggerObjFrozen = Object.freeze(LoggerObj);

delete LoggerObj.foo;
LoggerObj.log('Hello World');

delete LoggerObjFrozen.foo;
LoggerObjFrozen.log('Hello World');