console.log("=========");
console.log("Logger.js");
// console.log("module before:", module);
// console.log("this before:", this);
let foo = 'foo';
module.exports = class Logger {
	// foo = 'foo';

	constructor() {
		console.log('Logger constructor()');
	}

	log(str) {
		console.log('Logger.log(str)');
		setTimeout(() => {
			console.log(`${foo} ${str}`);
		}, 1000);
		((foo) => {
			setTimeout(() => {
				console.log(`${foo} ${str}`);
			}, 2000);
		})(foo);
		console.log(`${foo} ${str}`);
		foo = 'bar';
	};

	debug(str) {
		console.log('Logger.debug(str)');
		console.debug(str);
	};

	logThrice() {
		switch (arguments.length) {
			case 1:
				console.log(arguments[0]);
				break;
			case 2:
				console.log(`${arguments[0]} ${arguments[1]}`);
				break;
			case 3:
				console.log(`${arguments[0]} ${arguments[1]} ${arguments[2]}`);
				break;
		}
	};

	[internal_function]() {
		console.log("only intern");
	};
};

// console.log("module after:", module);
// console.log("this after:", this);
console.log();