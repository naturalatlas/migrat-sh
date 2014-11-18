/**
 * Migrat Shell Script Adapter
 *
 * Options:
 *   - `interpreter` {string}: Path to interpreter (default: /bin/bash)
 */

var fs   = require('fs');
var exec = require('child_process').exec;
var pkg  = require('./package.json');

module.exports = function(options) {
	options.interpreter = options.interpreter || '/bin/bash';

	return function(migrat) {
		function scriptExecutor(file, action) {
			return function(context, callback) {
				var command = [options.interpreter, file].join(' ');
				var opts = {env: {MIGRAT_ACTION: action}};
				exec(command, opts, function(error, stdout, stderr) {
					if (err) {
						stderr = (stderr || '').replace((/(?:(?:^|\n)\s+|\s+(?:$|\n))/g, '');
						return callback(new Error('Script exited with code ' + error.code + '.' + (stderr ? ' STDERR:\n' + stderr : '')));
					}
					callback();
				});
			};
		}

		migrat.setPluginName('sh');
		migrat.setPluginVersion(pkg.version);

		migrat.registerLoader('*.sh', function(file, callback) {
			callback(null, {
				up: scriptExecutor(file, 'up'),
				down: scriptExecutor(file, 'down'),
				check: scriptExecutor(file, 'check')
			});
		});

		migrat.registerTemplate('sh', function(details, callback) {
			fs.readFile(__dirname + '/lib/template.sh', 'utf8', function(err, source) {
				if (err) return callback(err);
				callback(null, source
					.replace('{{date}}', (new Date(details.timestamp)).toString())
					.replace('{{attribution}}', details.user ? ' by ' + details.user : '')
				);
			});
		});
	};
};