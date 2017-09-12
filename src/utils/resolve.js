// Node
const {join} = require("path");

// Local
const {rootRequire} = require("utils");
const env = require("./env");
const config = require("./../config");

/**
 * Resolve a configured dependency. This will check the environment
 * for the proper option in order to retrieve the appropriate dependency;
 * otherwise it uses the default option.
 * 
 * @param {String} type The 
 */
function resolve(type) {
    if (!env.has(type)) {
        let defaultName = config[type].default;
        return rootRequire(config[type][defaultName]);
    } else {
        return rootRequire(config[type][env.get(type)]);
    }
}

module.exports = resolve;