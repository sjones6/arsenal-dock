// Node
const assert = require("assert");

// Packages
const {TestCase} = require("cool-runner");
const request = require('supertest');

// Local
const {rootRequire} = require("utils");
const app = rootRequire("src/index");

/**
 * Test the healthy endpoint
 * 
 * @class
 * @extends TestCase
 */
class HealthzApiTestCase extends TestCase {

    constructor() {
        super();
        this.app = null;
    }

    request(done) {
        this._prepare()
            .then(server => {
                done(request(server));
            })
            .catch(e => {
                throw e;
            });
    }

    _prepare() {
        return new Promise((resolve, reject) => {
            if (this.app) {
                resolve(app.httpServer.getServer());
            } else {
                app.bootstrap()
                    .then(() => {
                        app.run();
                        this.app = app;
                        resolve(app.httpServer.getServer());
                    })
                    .catch(e => {
                        throw e
                    });
            }
        });
    }
}

module.exports = HealthzApiTestCase;