const bluebird = require('bluebird'),
	// path = require('path'),
	fs = bluebird.promisifyAll(require('fs'));

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

function copyFolder(source, target) {
	let files = [];

	// check if folder needs to be created or integrated

	/* function createTargetIfNotExists(target, cb) {
		fs.open(target, 'r', (err, fd) => {
			if (err) {
				if (err.code === 'ENOENT') {
					fs.mkdir(target, (err) => {
						if (err) {
							console.error(err);
						} else {
							cb(target);
						}
					});
				}
			} else {
				cb(target);
			}
		});
	} */

	fs.openAsync(target, 'r')
		// if target folder exists, use it
		.then(() => {
			return target;
		})
		// if target folder doesn't exist, create it
		.catch((err) => {
			if (err.code === 'ENOENT') {
				return fs.mkdirAsync(target)
					.then(() => {
						return target;
					})
					.catch((err) => {
						console.log(err);
						return err;
					});
			} else {
				return err;
			}

		})
		.then((target) => {
			console.log('then');
			console.log(target);

			fs.lstatAsync(source)
				.then((lstat) => {
					if (lstat.isDirectory()) {

					}
				})
		})
		.catch((err) => {
			console.log('catch');
			console.log(err);
		});

	/*
	//copy
	if ( fs.lstatSync( source ).isDirectory() ) {
		files = fs.readdirSync( source );
		files.forEach( function ( file ) {
			let curSource = path.join( source, file );
			if ( fs.lstatSync( curSource ).isDirectory() ) {
				copyFolder( curSource, targetFolder );
			} else {
				copyFile( curSource, targetFolder );
			}
		} );
	}

	function copyFile(source, target) {

		let targetFile = target;

		//if target is a directory a new file with the same name will be created
		if ( fs.existsSync( target ) ) {
			if ( fs.lstatSync( target ).isDirectory() ) {
				targetFile = path.join( target, path.basename( source ) );
			}
		}

		fs.writeFileSync(targetFile, fs.readFileSync(source));
	}
	*/
}

// copyFile('./filesystem/infile.txt', './filesystem/outfile.txt');
copyFolder('./filesystem/indir', './filesystem/outdir');