var spawn = require('child_process').spawn;

function scriptExecutor(options, file, action) {
	return function(context, callback) {
		var env = {};
		for (var key in options.env) {
			if (options.env.hasOwnProperty(key)) {
				env[key] = options.env[key];
			}
		}
		env.MIGRAT_ACTION = action;

		var output = '';
		var debug = process.argv.indexOf('--verbose') > -1;
		var opts = {env: env, stdio: debug ? 'inherit' : 'pipe'};
		var proc = spawn(options.interpreter, [file], opts);
		if (!debug) {
			proc.stdout.on('data', function(data) {
				output += data.toString();
			});
			proc.stderr.on('data', function(data) {
				output += data.toString();
			});
		}

		// "close" and "error" events may both fire
		var completed = false;
		function done(err) {
			if (completed) return;
			completed = true;
			callback(err);
		}

		proc.on('error', done);
		proc.on('close', function(code) {
			if (code !== 0) {
				if (output) {
					console.error('');
					console.error('Command Output:');
					console.error('');
					console.error(output.trim());
					console.error('');
				}
				return done(new Error('Script exited with code ' + code));
			}
			done();
		});
	};
}

module.exports = function(options) {
	return function(file, callback) {
		callback(null, {
			up: scriptExecutor(options, file, 'up'),
			down: scriptExecutor(options, file, 'down'),
			check: scriptExecutor(options, file, 'check')
		});
	};
};

