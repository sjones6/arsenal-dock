const assert = require('assert');
const {TestCase} = require("cool-runner");
const Env = rootRequire('src/utils/env');

class EnvWrapperTest extends TestCase {
    
    test_if_reference_to_process_env_kept(done) {
        let e = new Env();
        assert.deepStrictEqual(e.env, process.env);
        //assert.deepStrictEqual(true, process.env);
        done();
    }

    test_that_process_properties_are_correctly_stored(done) {
        let e = new Env();
        assert.strictEqual(e.has("PATH"), true);
        assert.strictEqual(e.has("DOES_NOT_EXIST"), false);
        done();
    }

}

module.exports = EnvWrapperTest;
