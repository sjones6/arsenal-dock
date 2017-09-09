// Node
const assert = require("assert");

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");

// Test
const Server = rootRequire("src/gun/Server");
const Gun = require("gun/gun");

class ServerTestCase extends TestCase {
    constructor() {
        super();
        this.server = null;
    }

    beforeEach() {
        this.server = new Server();
    }
    
    test_that_the_server_instantiates_gun(done) {
        this.server.start();
        assert.strictEqual((this.server.getGun() instanceof Gun), true);
        done();
    }

    test_that_the_server_starts_gun_with_main(done) {
        this.server.main()
        assert.strictEqual((this.server.getGun() instanceof Gun), true);
        done();
    }

    test_that_the_server_restarts_gun(done) {
        this.server
            .restart()
            .then(() => {
                assert.strictEqual((this.server.getGun() instanceof Gun), true);
                done();
            });
    }

    test_that_the_server_stops_gun(done) {
        this.server
            .stop()
            .then(() => {
                assert.strictEqual(this.server.getGun() === undefined, true);
                done();
            })
            .catch(() => {});
    }
}

module.exports = ServerTestCase;