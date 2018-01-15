console.log("=========");
console.log("Logger.js");
// console.log("module before:", module);
// console.log("this before:", this);

module.exports = function Logger() {
	console.log('Logger constructor()');

	let foo = 'foo';

	this.log = (str) => {
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

	this.logThrice = function() {
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
};

// console.log("module after:", module);
// console.log("this after:", this);
console.log();