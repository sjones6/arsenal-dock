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
}

module.exports = Env;