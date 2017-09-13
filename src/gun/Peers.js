// Node
const Event = require("events");

// Local
const Peer = require("./Peer");

const STATUS = {
    OPEN: 0,
    SENDING: 1,
    RECEIVING: 2,
    CLOSING: 3,
    CLOSED: 4
};

/**
 * @class
 * @extends Event
 */
class Peers extends Event {
    constructor() {
        super();
        this.peers = [];
    }

    /**
     * @return {array.Peer}  An array of all of the currently connected peers
     */
    getPeers() {
        return this.peers;
    }

    /**
     * @param {WebSocketConnection} connection   The connection object for the peer
     */
    add(connection) {
        this.peers.push(this.createPeer(connection));
    }

    /**
     * @param {WebSocketConnection} connection   The connection object for the peer
     * @return {Peer}  A newly created peer wrapper
     */
    createPeer(connection) {
        let peer = new Peer(connection);
        peer.on("message", this.peerMessage.bind(this));
        peer.on("close", this.remove.bind(this));
        return peer;
    }

    /**
     * @param {string} id  the peer id to remove 
     */
    remove(id) {
        this.peers = this.peers.filter(peer => peer.getId() !== id);
    }

    /**
     * @emits "message"
     * @param {string} msg   The message received from a peer
     */
    peerMessage(msg) {
        this.emit("message", msg);
    }

    /**
     * @param {string} msg  A message to broadcast to all peers that can receive it 
     */
    send(msg) {
        this.sending = true;
        this.peers.forEach(peer => {
            if (peer.canReceive(msg)) {
                peer.send(msg);
            }
        });
    }
}

module.exports = Peers;