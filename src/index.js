/**
 * The entry point to the entire application.
 * 
 * Grab the container and build it.
 */
const Container = require('./AppContainer');
const ErrorReporter = require("./engine/errors/ErrorReporter");

let app;

// First Initialize the error reporter
let errorReportDriver = ErrorReporter.driver();
let reporter = new ErrorReporter(new errorReportDriver());

// Create Container
app = new Container(reporter);

// Wrap the runtime in a try/catch
setImmediate(async function() {
    try {
        await app.bootstrap();
        app.run();
    } catch (err) {
        reporter.reportUncaught(err);
    }
});


module.exports = app;