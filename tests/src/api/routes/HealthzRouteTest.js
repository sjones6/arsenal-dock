// Node
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");

// Test
const register = rootRequire("src/api/routes/healthz");

class HealthzRouterTestCase extends TestCase {

    test_that_the_proper_controller_is_specified(done) {
        assert.strictEqual(register.Controller, "Healthz");
        done();
    }

    test_that_the_healthz_router_is_wired_up(done) {
        let mockRouter = {
            get: function(route) {
                assert.strictEqual("/api/healthz", route);
                done();
            }
        }
        register(mockRouter, {get: null});
    }

}

module.exports = HealthzRouterTestCase;