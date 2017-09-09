// Nodes
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire,isFunction} = require("utils");

// Test
const ErrorReporterDriverInterface = rootRequire("src/engine/errors/drivers/ErrorDriverInterface");

class ErrorReporterDriverTestCase extends TestCase {
    test_that_the_interface_contains_run_require(done) {
        assert.equal(isFunction(ErrorReporterDriverInterface.prototype.caught), true);
        assert.equal(isFunction(ErrorReporterDriverInterface.prototype.uncaught), true);
        done();
    }
}

module.exports = ErrorReporterDriverTestCase;