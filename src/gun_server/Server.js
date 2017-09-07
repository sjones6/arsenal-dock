const Gun = require('./gun-loader');
const Options = require("./Options");

class Server {
    constructor(httpServer) {
        this._web = httpServer;
        this._opt = new Options(httpServer);
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
        this.gun = new Gun(this._opt);
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
}

module.exports = Server;