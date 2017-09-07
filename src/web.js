// Node
const http = require("http");

// Local
const Env = require("./utils/env");
const env = new Env();

const server = http.createServer();

exports.listen = function() {
    server.listen.apply(server, arguments);
};

exports.close = function (callback) {
    server.close(callback);
};

exports.server = !env.inTesting() ? server : null;