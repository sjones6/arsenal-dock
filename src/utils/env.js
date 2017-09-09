const {isNil} = require("utils");

class Env {
    constructor() {
        this.env = process.env || {};
    }

    has(key) {
        return !isNil(this.env[key]);
    }

    get(key, defaultVal) {
        return this.has(key) ? this.env[key] : defaultVal;
    }

    inTesting() {
        return (this.get("NODE_ENV") === "TEST");
    }
}

module.exports = new Env();