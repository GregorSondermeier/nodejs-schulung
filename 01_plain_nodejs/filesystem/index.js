const fs = require('fs'),
	path = require('path');

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

	//check if folder needs to be created or integrated
	function createTargetIfNotExists(target, cb) {
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
	}

	createTargetIfNotExists(target, (existingTarget) => {

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