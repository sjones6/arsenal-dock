// Node
const assert = require("assert");

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire, isFunction} = require("utils");

// Test
const OtherGun = require("gun/gun");
const Gun = rootRequire("src/gun/gun-loader");

class GunLoaderTestCase extends TestCase {
    test_that_gun_loader_returns_gun(done) {
        assert.strictEqual(OtherGun === Gun, true)
        done();
    }
}

module.exports = GunLoaderTestCase;