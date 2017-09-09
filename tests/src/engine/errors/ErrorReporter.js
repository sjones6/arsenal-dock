// Nodes
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");
const ErrorReporter = rootRequire('src/engine/errors/ErrorReporter');

// Test
const TestDriver = require("./TestDriver");
const testErr = new Error("Some test error");

class ErrorReporterTestCase extends TestCase {
    test_that_it_reports_uncaught_errors(done) {
        let cb = err => {
            assert.equal(testErr, err);
            done();
        };
        let reporter = new ErrorReporter(new TestDriver(cb));
        reporter.reportUncaught(testErr);
    }

    test_that_it_reports_caught_errors(done) {
        let cb = err => {
            assert.equal(testErr, err);
            done();
        };
        let reporter = new ErrorReporter(new TestDriver(cb));
        reporter.reportCaught(testErr);
    }
}

module.exports = ErrorReporterTestCase;
