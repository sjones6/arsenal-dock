// Local
const env = require("./utils/env");
const API = require("./api/API");
const GunServer = require("./gun/Server");
const HttpServer = require("./httpServer");
const {Response} = require("@arsenal/http");

/**
 * A top level architecture component responsible for wrapping the entire application
 * 
 * @class Container
 */
class Container {

    /**
     * Bootstrap the components necessary to run the application
     * 
     * @instance
     * @public
     */
    bootstrap() {
        this.httpServer = new HttpServer(Response);
        this.api = new API(this.httpServer);
        this.server = new GunServer(this.httpServer);

        return new Promise((resolve, reject) => {
            Promise.all([
                this.server.bootstrap(this.httpServer),
                this.api.bootstrap(this.httpServer)
            ])
            .then(resolve)
            .catch(reject);
        });
    }

    /**
     * Run the application
     * 
     * @instance
     * @public
     */
    run() {

        // Start the application API server
        this.api.main();

        // Start the application Gun server
        this.server.main();

        // Wire up the API server for HTTP requests
        if (!env.inTesting()) {
            this.httpServer.listen(parseInt(env.get("PORT", 8000)));
        }
    }

    /**
     * Shut the application down
     * 
     * @todo shutdown gun gracefully.
     */
    shutdown() {
        this.httpServer.close();
    }
}

module.exports = Container;