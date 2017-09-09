// Node
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire, isFunction} = require("utils");
const Container = rootRequire('src/AppContainer');


class ContainerTestCase extends TestCase {
    test_container_interface(done) {
        let err;
        try {
            let container = new Container();
            container.bootstrap();
            container.run();
        } catch (runtimeErr) {
            err = runtimeErr;
        }
        assert.equal(err, undefined);
        done();
    }
}

module.exports = ContainerTestCase;