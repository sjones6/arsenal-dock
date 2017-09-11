// // Node
// const assert = require('assert');

// // Local
// const ApiTestCase = require("./BaseApiTestCase");


// class HealthzApiTestCase extends ApiTestCase {

//     test_that_the_api_response_with_200(done) {
//         let req = {
//             path: '/api/healthz'
//         }

//         this.request(req, res => {
//             assert.strictEqual(res.headersSent, true);
//             assert.strictEqual(res.statusCode, 200);
//             done();
//         });
//     }
//     test_that_the_api_responses_json(done) {
//         let req = {
//             method: "POST",
//             path: '/api/healthz',
//             payload: {
//                 handled: false
//             }
//         }

//         this.request(req, res => {
//             assert.equal(Boolean(res.output[2]), true);
//             var payload = JSON.parse(res.output[2]);

//             assert.strictEqual(payload.success, true);
//             done();
//         });
//     }
// }

// module.exports = HealthzApiTestCase;