// Node
const assert = require("assert");

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire} = require("utils");

// Test
const Peer = rootRequire("src/gun/Peer");
const Event = require("events");

class PeerTestCase extends TestCase {

    /**
     * Todo: Can we somehow check for uniqueness? Or some other check?
     * Currently, this check only checks that it exists
     */
    test_that_the_peer_generates_an_id(done) {
        let peer = new Peer(new Event());
        assert.strictEqual(Boolean(peer.getId()), true);
        done();
    }

    test_that_the_peer_attempts_to_send_a_message(done) {
        let testMsg = "Hello, world";
        let wire = new Event();
        wire.send = function(msg) {
            assert.strictEqual(testMsg, msg);
            done();
        }
        let peer = new Peer(wire);
        peer.send(testMsg);
    }

    test_that_the_peer_emits_an_event_on_closing(done) {
        let peer = new Peer(new Event());
        let id = peer.getId();

        peer.on("close", peerUuid => {
            assert.deepEqual(id, peerUuid);
            done();
        });
        peer.close();
    }
}

module.exports = PeerTestCase;