// Node
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire, isFunction} = require("utils");
const Container = rootRequire('src/AppContainer');

// Test
const {Server} = require("http");
const HttpServer = rootRequire("src/HttpServer");

class HttpServerTestCase extends TestCase {
    test_that_the_http_server_class_can_emit_event_with_server(done) {
        let httpWrapper = new HttpServer();

        httpWrapper.on("http_server_created", server => {
            assert.strictEqual((server instanceof Server), true);
            done();
        });
        httpWrapper.create(() => {});
    }
    
    test_that_the_http_server_class_has_a_listen_method(done) {
        assert.strictEqual(isFunction(HttpServer.prototype.listen), true);
        done();
    }

}

module.exports = HttpServerTestCase;