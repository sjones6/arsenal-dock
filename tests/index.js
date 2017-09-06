const assert = require('assert');
const app = rootRequire('src/index');
const Container = rootRequire('src/container');
const {TestCase} = require("cool-runner");

class ApplicationTestCase extends TestCase {
    desc() {
        return "Application Level";
    }

    ensureProperInstanceIsExportedTest(done) {
        assert.equal(app instanceof Container, true);
        done();
    }
}

module.exports = ApplicationTestCase;