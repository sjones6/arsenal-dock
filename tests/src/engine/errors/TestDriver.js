const {rootRequire} = require("utils");
const ErrorDriverInterface = rootRequire("src/engine/errors/drivers/ErrorDriverInterface");

/**
 * Quick and dirty test driver that passes all errors into a callback for 
 * testing purposes
 * 
 * @class TestDriver
 * @extends ErrorDriverInterface
 */
class TestDriver extends ErrorDriverInterface {
    constructor(cb) {
        super();
        this._cb = cb;
    }

    caught(err) {
        this._cb(err);
    }

    uncaught(err) {
        this._cb(err);
    }
}

module.exports = TestDriver;