// Node
const fs = require("fs");
const {join} = require("path");

// Packages
const Router = require("router");
const bodyparser = require("body-parser");

class API {

    constructor() {
        this._router = new Router();
        this._router.use(bodyparser.json());
    }

    /**
     * Bootstrap the HTTP API. At this step, build up the router with all of the
     * registered routes
     * 
     * @param {HttpServer} http  The HTTPServer wrapper class
     */
    bootstrap(http) {
        this._http = http;

        // Register all API routes asynchronously
        return this._registerRoutes();
    }

    /**
     * Wire up the API to the Routes
     */
    main() {
        this._http.create(this._router);
    }

    /**
     * Get the API router
     * 
     * @public
     * @instance
     * 
     * @returns {Router}  The API router instance
     */
    router() {
        return this._router;
    }

    /**
     * Search through the /api/routes directory for all routes and register them.
     * 
     * This does not search recursively through the routes directory, so the upshot
     * is that it can only be one level deep. If this limitation proves cumbersome, 
     * this can be extended to recurse through /api/routes
     * 
     * @private
     * @instance
     * 
     * @return {Promise}   A promise that resolves after all files have been registered
     */
    _registerRoutes() {
        return new Promise((resolve, reject) => {
            fs.readdir(join(__dirname, "routes"), (err, fileNames) => {
                if (err) {
                    reject(err);
                } else {

                    // Filter out only JS files
                    this._readRoutesAndRegister(fileNames.filter(name => /.js$/.test(name)));
                    resolve();
                }
            });
        });
    }

    /**
     * Read the routes from the file system, registering each in turn
     * 
     * @param {Array} fileNames  An array of route files
     */
    _readRoutesAndRegister(fileNames) {
        fileNames.forEach(fileName => this._registerRouteGroup(join(__dirname, "routes", fileName)));
    }

    /**
     * Grab the route register, and pass in required params
     * 
     * @param {String} routePath  Absolute path to route
     */
    _registerRouteGroup(routePath) {
        let register = require(routePath);
        let Controller = require(join(__dirname, "controllers", register.Controller));

        if (!Controller) {
            throw new Error("Controller missing or not specified in route registration: " + routePath);
        }

        return register(this.router(), new Controller());
    }
}

module.exports = API;