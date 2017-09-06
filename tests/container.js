const assert = require('assert');
const Container = rootRequire('src/container');
const {TestCase} = require("cool-runner");

class ContainerTestCase extends TestCase {
    test_container_interface(done) {
        assert.equal(isFunction(Container.prototype.bootstrap), true);
        assert.equal(isFunction(Container.prototype.run), true);
        done();
    }
}

module.exports = ContainerTestCase;