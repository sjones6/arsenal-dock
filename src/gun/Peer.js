// Node
const Event = require("events");

// Packages
const uuid = require("uuid/v1");

class Peer extends Event {
    constructor(connection) {
        super();
        this._id = uuid();
        this._wire = connection;

        connection.on("err", err => console.log(err));
        connection.on("message", msg => this._receive(msg));
    }

    getId() {
        return this._id;
    }

    send(msg) {
        if (this._wire.readyState === this._wire.OPEN){
			this._wire.send(msg);
		}
    }

    close() {
        this.emit("close", this._id);
    }

    canReceive() {
        return true;
    }

    /* private api */

    /**
     * @param {string} msg   The message sent from the connection 
     */
    _receive(msg) {
        if (this.canReceive()) {
            this.emit("message", msg);
        }
    }
}

module.exports = Peer;