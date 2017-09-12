const {rootRequire} = require("utils");

const env = rootRequire("src/utils/env");

class Options {
    constructor() {
        this._applyStorageDriver();
    }

    /**
     * @param {HttpServer} web   The HTTP server
     */
    setWeb(web) {
        this.web = web;
    }

    _applyStorageDriver() {

    }
}

module.exports = Options;