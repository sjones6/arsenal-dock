// Node
const assert = require("assert");

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");

// Test
const Peers = rootRequire("src/gun/Peers");
const Peer = rootRequire("src/gun/Peer");
const Event = require("events");

class PeersTestCase extends TestCase {

    test_that_it_creates_an_array_of_peers(done) {
        let peers = new Peers();
        peers.add(new Event());

        let peersArray = peers.getPeers();
        assert.strictEqual(peersArray.length, 1);
        assert.strictEqual(peersArray[0] instanceof Peer, true);
        done();
    }

    test_that_it_passes_messages_down_for_broadcast(done) {
        let testMsg = "Hello world";
        let peers = new Peers();
        let testEvent = new Event();
        testEvent.readyState = 1;
        testEvent.OPEN = 1;
        testEvent.send = function(msg) {
            assert.strictEqual(testMsg, msg);
            done();
        }
        peers.add(testEvent);
        peers.send(testMsg);
    }

    test_that_peer_messages_bubble_up_to_peers(done) {
        let testMsg = "Hello world";
        let peers = new Peers();
        let testEvent = new Event();
        peers.add(testEvent);

        peers.on("message", msg => {
            assert.strictEqual(testMsg, msg);
            done();
        });
        testEvent.emit("message", testMsg);
    }

    test_that_a_peer_can_be_removed(done) {
        let peers = new Peers();
        let testEvent = new Event();
        peers.add(testEvent);
        let peer = peers.getPeers()[0]
        let id = peer.getId();

        peer.close();
        assert.strictEqual(peers.getPeers().length, 0);
        done();
    }

}

module.exports = PeersTestCase;