// Node
const assert = require("assert");

// Test
const ApiTestCase = require("./ApiTestCase");

/**
 * Test the healthy endpoint
 * 
 * @class
 * @extends TestCase
 */
class HealthzApiTestCase extends ApiTestCase {

    test_that_the_api_responds_with_200(done) {
        this.request(req => {
            req.get('/api/healthz')
                .end(function(err, res) {
                    assert.equal(res.status, 200);
                    done();
                });
        }); 
    }
}

module.exports = HealthzApiTestCase;