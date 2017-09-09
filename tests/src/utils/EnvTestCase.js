// Nodes
const assert = require('assert');

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire, isNil} = require("utils");
const env = rootRequire('src/utils/env');

class EnvTestCase extends TestCase {
    
    test_if_reference_to_process_env_kept(done) {
        assert.deepStrictEqual(env.env, process.env);
        done();
    }

    test_that_process_properties_are_correctly_stored(done) {
        assert.strictEqual(env.has("PATH"), true);
        assert.strictEqual(env.has("DOES_NOT_EXIST"), false);
        done();
    }
}

module.exports = EnvTestCase;
