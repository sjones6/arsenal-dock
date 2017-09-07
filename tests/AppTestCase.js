// Node
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");
const app = rootRequire('src/index');
const Container = rootRequire('src/AppContainer');


class ApplicationTestCase extends TestCase {
    ensureProperInstanceIsExportedTest(done) {
        assert.equal(app instanceof Container, true);
        done();
    }
}

module.exports = ApplicationTestCase;