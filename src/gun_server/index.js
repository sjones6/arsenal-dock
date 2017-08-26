const Gun = require('./gun-loader');


class Server {
    constructor(opt) {
        this.gun = new Gun(opt);
    }
    main() {

    }
    gun() {
        return this.gun;
    }
}


module.exports = Server;