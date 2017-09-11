const assert = require("assert");


// Local
const {rootRequire} = require("utils");
const env = rootRequire("src/utils/env");
const ErrorDriverInterface = require("./drivers/ErrorDriverInterface");

class ErrorReporter {

    /**
     * @param {ErrorDriverInterface} reporter 
     */
    constructor(reporter) {
        assert.equal((reporter instanceof ErrorDriverInterface), true);

        this._reporter = reporter;
    }

    /**
     * Report a trapped/caught error
     * 
     * @param {Error} err 
     */
    reportCaught(err) {
        this._reporter.caught(err);
    }

    /**
     * Report an uncaught/untrapped error
     * 
     * @param {Error} err 
     */
    reportUncaught(err) {
        this._reporter.uncaught(err);
    }
}

module.exports = ErrorReporter;