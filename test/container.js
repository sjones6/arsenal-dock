const assert = require('assert');
const Container = rootRequire('src/container');

describe("Container interface", function() {

    it("should contain a `run` method", function(done) {
        assert.equal(isFunction(Container.prototype.run), true);
        done();
    });

    it("should contain a `bootstrap` method", function(done) {
        assert.equal(isFunction(Container.prototype.bootstrap), true);
        done();
    });

});