// Node
const Event = require("events");

// Local
const Peer = require("./Peer");

/**
 * @class
 */
class Peers extends Event {
    constructor() {
        super();
        this.peers = [];
    }

    add(connection) {
        this.peers.push(this.createPeer(connection));
    }

    createPeer(connection) {
        let peer = new Peer(connection);

        peer.on("message", this.peerMessage.bind(this));
        peer.on("close", this.remove.bind(this));
        return peer;
    }

    remove(id) {
        this.peers = this.peers.filter(peer => peer.getId() !== id);
    }

    peerMessage(msg) {
        this.emit("message", msg);
    }

    send(msg) {
        this.peers.forEach(peer => {
            if (peer.canReceive(msg)) {
                peer.send(msg);
            }
        });
    }
}

module.exports = Peers;