/**
 * The entry point to the entire application.
 * 
 * Grab the container and build it.
 */
const {rootRequire} = require("utils");
const Container = rootRequire('src/Container');
const ErrorReporter = rootRequire("src/engine/errors/ErrorReporter");


let app;

// First Initialize the error reporter
let errorReportDriver = ErrorReporter.driver();
let reporter = new ErrorReporter(new errorReportDriver());

// Wrap the runtime in a try/catch
try {
    app = new Container(reporter);
    app.bootstrap();
} catch (err) {
    reporter.reportUncaught(err);
}

module.exports = app;