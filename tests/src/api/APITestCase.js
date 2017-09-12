// Node
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");

// Test
const Router = require("router");
const API = rootRequire("src/api/API");

class ApiTestCase extends TestCase {

    test_that_the_api_router_is_wired_up(done) {
        let api = new API();
        assert.strictEqual(api.router() instanceof Router, true);
        done();
    }

}

module.exports = ApiTestCase;