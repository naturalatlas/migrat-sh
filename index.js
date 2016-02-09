/**
 * Migrat Shell Script Adapter
 *
 * Options:
 *   - `interpreter` {string}: Path to interpreter (default: /bin/bash)
 *   - `env` {object}: A list of environment variables to pass through.
 */

var fs = require('fs');
var pkg = require('./package.json');
var loader = require('./loader.js');

module.exports = function(options) {
	options.env = options.env || {};
	options.interpreter = options.interpreter || '/bin/bash';

	return function(migrat) {
		migrat.setPluginName('sh');
		migrat.setPluginVersion(pkg.version);
		migrat.registerLoader('*.sh', loader(options));
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
