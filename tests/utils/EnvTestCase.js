// Nodes
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire, isNil} = require("utils");
const Env = rootRequire('src/utils/env');

class EnvTestCase extends TestCase {
    
    test_if_reference_to_process_env_kept(done) {
        let e = new Env();
        assert.deepStrictEqual(e.env, process.env);
        done();
    }

    test_that_process_properties_are_correctly_stored(done) {
        let e = new Env();
        assert.strictEqual(e.has("PATH"), true);
        assert.strictEqual(e.has("DOES_NOT_EXIST"), false);
        done();
    }
}

module.exports = EnvTestCase;
