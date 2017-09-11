/**
 * The entry point to the entire application.
 * 
 * Grab the container and build it.
 */
const Container = require('./AppContainer');
const ErrorReporter = require("./engine/errors/ErrorReporter");
const resolve = require("./utils/resolve");

let app;

// First Initialize the error reporter
let ErrorReportDriver = resolve("ERROR_REPORTER");
let reporter = new ErrorReporter(new ErrorReportDriver());

// Create Container
app = new Container(reporter);

module.exports = app;