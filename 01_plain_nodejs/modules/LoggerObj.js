let LoggerObj = {
	foo: 'foo',
	log: (str) => {
		console.log(`${LoggerObj.foo} ${str}`);
	}
};

module.exports = LoggerObj;