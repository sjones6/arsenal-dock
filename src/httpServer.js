// Node
const http = require("http");
const Event = require("events");

// Packages
const finalhandler = require("finalhandler");

// Local
const env = require("./utils/env");
const {Response} = require("@arsenal/http");

/**
 * Class responsible for the application's HTTP server
 * 
 * @class
 * @extends Event
 */
class HttpServer extends Event {
    constructor() {
        super();
        this._http = null;
    }

    /**
     * Create the HTTP server
     * 
     * @emits "http_server_created" after server has been created
     * 
     * @param {Function} handle   handler for the HTTP request 
     */
    create(handle) {
        this._http = http.createServer((req, res) => {
            handle(req, res, () => {
                finalhandler(req, res);
            });
        });
        this.emit("http_server_created", this._http);
    }

    /**
     * Proxy HTTP server listen on a port
     * 
     * @param {Number} port A port to listen on
     */
    listen(port) {
        this._http.listen(parseInt(port));
    }

    /**
     * Get the Application's HTTP server
     * 
     * @return {Server|null} A reference to the application's server instance or null if not yet created.
     */
    getServer() {
        return this._http;
    }

    close() {
        if (this._http) {
            this._http.close();
        }
        this._http = null;
    }
}

module.exports = HttpServer;
