// Node
const assert = require("assert");

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");
const app = rootRequire("src/index");

/**
 * This is the base class for API integration tests. It wires up a server that can be
 * passed into supertest
 * 
 * @class
 * @extends TestCase
 */
class ApiTestCase extends TestCase {

    constructor() {
        super();
        this.app = null;
    }

    beforeAll() {
        return new Promise(resolve => {
            app.bootstrap()
                .then(() => {
                    app.run();
                    this.server = app.httpServer.getServer();
                    resolve();
                })
                .catch(e => reject(e));
        });
    }

    afterAll(done) {
        app.shutdown();
        done();
    }
}

module.exports = ApiTestCase;