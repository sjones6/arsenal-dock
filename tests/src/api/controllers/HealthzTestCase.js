// Node
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");

// Test
const HealthzController = rootRequire("src/api/controllers/Healthz");

class HealthzTestCase extends TestCase {

    test_that_healthz_returns_200(done) {
        let healthz = new HealthzController();
        let mockRes = {
            status: status => {
                assert.strictEqual(status, 200);
                done();
            }
        }
        healthz.get(null, mockRes);
    }
}

module.exports = HealthzTestCase;