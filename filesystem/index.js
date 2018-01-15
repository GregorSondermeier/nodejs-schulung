const fs = require('fs');

function copyFile(source, target, cb) {
	let cbCalled = false;

	let readStream = fs.createReadStream(source);
	readStream.on('error', function(err) {
		console.log('readStream on error, err:', err);
		done(err);
	});
	readStream.on('close', function(ex) {
		console.log('readStream on close, ex:', ex);
		done();
	});

	let writeStream = fs.createWriteStream(target);
	writeStream.on('error', function(err) {
		console.log('writeStream on error, err:', err);
		done(err);
	});
	writeStream.on('close', function(ex) {
		console.log('writeStream on close, ex:', ex);
		done();
	});
	readStream.pipe(writeStream);

	function done(err) {
		if (!cbCalled) {
			cb && cb(err);
			cbCalled = true;
		}
	}
}

copyFile('./filesystem/src.txt', './filesystem/target.txt');