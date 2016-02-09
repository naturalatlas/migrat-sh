var spawn = require('child_process').spawn;
var assert = require('chai').assert;
var path = require('path');

function runStage(stage, file, callback) {
	var output = '';
	var args = [path.resolve(__dirname, 'fixtures/runner.js'), file];
	var bin = process.execPath;
	var proc = spawn(bin, args, {env: {LOADER_STAGE: stage}, stdio: 'pipe'});
	proc.stdout.on('data', function(data) {
		output += data.toString();
	});
	proc.stderr.on('data', function(data) {
		output += data.toString();
	});
	proc.on('error', function(err) {
		throw err;
	});
	proc.on('close', function(code) {
		callback(null, output.trim(), code);
	});
}

describe('migrat-sh', function() {
	describe('up', function() {
		it('should execute with MIGRAT_ACTION=up', function(done) {
			runStage('up', __dirname + '/fixtures/success.sh', function(err, output, code) {
				if (err) throw err;
				console.log('[OUTPUT]', output || '(none)');
				assert.equal(output, '', 'output');
				assert.equal(code, 0, 'exited with code');
				done();
			});
		});
		it('should display output upon failure', function(done) {
			runStage('up', __dirname + '/fixtures/failed.sh', function(err, output, code) {
				if (err) throw err;
				console.log('[OUTPUT]', output || '(none)');
				assert.equal(output, 'Command Output:\n\nstdout message\nthis is supposed to fail\n\nFAILED: Script exited with code 1', 'output');
				assert.equal(code, 1, 'exited with code');
				done();
			});
		});
	});
	describe('down', function() {
		it('should execute with MIGRAT_ACTION=down', function(done) {
			runStage('down', __dirname + '/fixtures/success.sh', function(err, output, code) {
				if (err) throw err;
				console.log('[OUTPUT]', output || '(none)');
				assert.equal(output, '', 'output');
				assert.equal(code, 0, 'exited with code');
				done();
			});
		});
		it('should display output upon failure', function(done) {
			runStage('down', __dirname + '/fixtures/failed.sh', function(err, output, code) {
				if (err) throw err;
				console.log('[OUTPUT]', output || '(none)');
				assert.equal(output, 'Command Output:\n\nstdout message\nthis is supposed to fail\n\nFAILED: Script exited with code 1', 'output');
				assert.equal(code, 1, 'exited with code');
				done();
			});
		});
	});
});
