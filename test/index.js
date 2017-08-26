const assert = require('assert');
const app = rootRequire('src/index');
const Container = rootRequire('src/container');


describe("Application Level", function() {
    it("should export a container", done => {
        assert.equal(app instanceof Container, true);
        done();
    });
});