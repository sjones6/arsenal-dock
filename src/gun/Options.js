const {rootRequire} = require("utils");

const env = rootRequire("src/utils/env");

class Options {
    constructor(httpServer) {

        // Listen for when the server is created
        httpServer.on("http_server_created", web => {
            this.web = web;
        });

        this._applyVerify();

        this._applyStorageDriver()
    }

    _applyVerify() {
    }

    _applyStorageDriver() {

    }
}

module.exports = Options;