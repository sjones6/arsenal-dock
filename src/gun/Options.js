class Options {
    constructor(httpServer) {
        if (httpServer) {
            this.web = httpServer;
        }
    }
}

module.exports = Options;