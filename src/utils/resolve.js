// Node
const {join} = require("path");

// Local
const {rootRequire} = require("utils");
const env = require("./env");
const config = require("./../config");


function resolve(type) {
    if (!env.has(type)) {
        let defaultName = config[type].default;
        return rootRequire(config[type][defaultName]);
    } else {
        return rootRequire(config[type][env.get(type)]);
    }
}

module.exports = resolve;