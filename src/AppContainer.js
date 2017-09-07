// Local
const GunServer = require("./gun_server/Server");
const Env = require("./utils/env");
const Web = require("./web");


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
        this.env = new Env();
        this.web = Web;
        this.server = new GunServer(Web.server || null);
    }

    /**
     * Run the application
     * 
     * @instance
     * @public
     */
    run() {

        // Start the HTTP server
        if (!this.env.inTesting()) {
            this.web.listen(parseInt(this.env.get("PORT", 8080)));
        }

        // Start the application server
        this.server.main();
    }
}

module.exports = Container;