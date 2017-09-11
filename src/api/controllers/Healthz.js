const {Controller} = require("@arsenal/http");

/**
 * @class
 * @extends Controller
 */
class Healthz extends Controller {
    get(req, res) {        
        res.status(200);
    }
}

module.exports = Healthz;