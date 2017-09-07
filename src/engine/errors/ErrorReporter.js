const assert = require("assert");


// Local
const {rootRequire} = require("utils");
const Env = rootRequire("src/utils/env");
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
     * Determine the report driver based upon the configuration options
     * 
     * @todo This class should not need to be aware of driver implementations
     * 
     * @static
     */
    static driver() {
        let env = new Env();
        let driverName = env.get("ERROR_REPORTER", "console");

        let Driver;
        switch (driverName) {
            case "console":
                Driver = require("./drivers/ConsoleDriver");
        }

        // finish
        return Driver;
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