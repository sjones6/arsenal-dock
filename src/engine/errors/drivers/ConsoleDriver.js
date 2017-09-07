const ErrorDriverInterface = require("./ErrorDriverInterface");

/**
 * @class ConsoleDriver
 * @extends ErrorDriverInterface
 */
class ConsoleDriver extends ErrorDriverInterface {
    caught(err) {
        console.warn(err);
    }

    uncaught(err) {
        console.error(err);
    }
}

module.exports = ConsoleDriver;