// Packages
const {Server: WebSocketServer} = require("ws");

// Local
const {rootRequire} = require("utils");
const env = rootRequire("src/utils/env");
const Gun = require('./gun-loader');
const Options = require("./Options");
const Peers = require("./Peers");

class Server {

    /**
     * @param {HttpServer} httpServer  
     */
    constructor(httpServer) {
        this._opt = new Options();
        this._peers = new Peers();

        // Listen for when the server is created
        httpServer.on("http_server_created", web => {
            this.web = web;
            this._opt.setWeb(web);
        });
    }

    /**
     * Bootstrap the Gun server
     * 
     * @return {Promise} A promise that resolves once the server has been bootstrapped
     */
    bootstrap() {
        return new Promise(resolve => resolve());
    }

    /**
     * Start the server
     */
    main() {
        return this.start();
    }

    /**
     * Start the Gun server
     */
    start() {

        // Fire up Gun
        this.gun = new Gun(this._opt);

        this._wireWebSocketServer();
        this._wireGun();
    }

    /**
     * Restart the gun server
     * 
     * 
     */
    restart() {
        return new Promise(resolve => {
            this.stop()
                .then(() => {
                    this.start();
                    resolve();
                });
        });
    }

    /**
     * Stop the Gun server
     *
     * @todo Do this a bit more intelligently ... don't
     * shut down in the middle of a send for instance
     * 
     * @return {Promise} A promise that resolves after the gun server has been shut down
     */
    stop() {
        return new Promise(resolve => {
            if (this.gun) {
                delete this.gun;
            }
            resolve();
        });
    }

    /**
     * @return {Gun}  current gun instance
     */
    getGun() {
        return this.gun;
    }

    /* private api */
    
    _wireWebSocketServer() {

        // Listen for any messages from a peer
        this._peers.on("message", this._handleMessage.bind(this));

        // Initialize a WebSocket Server
        this._wss = new WebSocketServer({
            //noServer: env.inTesting(),
            server: this.web,
            path: '/gun',
            verifyClient: this._handleConnectionAttempt.bind(this)
        });

        // Listen for any incoming connections (assumed to have passed
        // the verifyClient check)
        this._wss.on("connection", this._handleNewConnection.bind(this));
    }

    _handleConnectionAttempt(info, cb) {
        let {origin, req, secure} = info;
        cb(true);
    }

    _handleNewConnection(connection) {
        this._peers.add(connection);
    }

    _handleMessage(msg) {
        try {
            msg = JSON.parse(msg);
        } catch (e) {
            // todo handle JSON parse err
        }
        
        if (Array.isArray(msg)) {
            msg.forEach(m => this.gun.on('in', JSON.parse(m)));
        } else {
            this.gun.on('in', msg);
        }
    }

    /**
     * Wire up Gun with arsenal-dock functionality
     */
    _wireGun() {
        let _this = this;

        // Send out to each peer. Function must be bound
        // here to the gun event context (i.e., `funciton`
        // keyword must be used and not arrow function)
        this.gun.on('out', function(msg) {
            this.to.next(msg);
            _this._peers.send(JSON.stringify(msg));
        });
    }
}

module.exports = Server;