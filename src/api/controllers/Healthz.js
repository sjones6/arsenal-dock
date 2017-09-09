const {Controller} = require("@arsenal/http");

/**
 * @class
 * @extends Controller
 */
class Healthz extends Controller {
    get(req, res) {
        res.status(200);
    }
    post(req, res) {
        res.json({
            success: true
        });
    }
}

module.exports = Healthz;