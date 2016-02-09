var loader = require('../../loader.js')({interpreter: '/bin/bash'});
var file = process.argv[process.argv.length - 1];

var stage = process.env.LOADER_STAGE;
if (!stage) throw new Error('No stage given (LOADER_STAGE)');

loader(file, function(err, methods) {
	if (err) throw err;
	methods[stage]({}, function(err) {
		if (err) {
			console.error('FAILED:', err.message);
			process.exit(1);
		}
		process.exit(0);
	});
});
