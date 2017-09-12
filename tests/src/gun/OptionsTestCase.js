// Node
const assert = require("assert");
const http = require("http");

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");

// Test
const {Server} = require("http");
const Options = rootRequire("src/gun/Options");

class OptionsTestCase extends TestCase {

    test_that_the_http_server_is_stored(done) {
        let opt = new Options;
        opt.setWeb(http.createServer(() => {}));
        assert.strictEqual(opt.web instanceof Server, true);
        done();
    }
}

module.exports = OptionsTestCase;