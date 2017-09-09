// Node
const {ClientRequest, ServerResponse} = require("http");

// Packages
const {TestCase} = require("cool-runner");

// Local
const {rootRequire,isFunction} = require("utils");

// Test
const API = rootRequire("src/api/API");
const MockResponse = require("./MockHttpResponse");
const MockHttpRequestOptions = require("./MockHttpRequestOptions");

class BaseApiTestCase extends TestCase {
    constructor() {
        super();
        this._api = new API();
    }

    request(requestDefinition, handler) {
        let request = new ClientRequest(new MockHttpRequestOptions(requestDefinition));

        // Todo: Determine why these are not supplied by default. Why does router need them??
        request.url = request.path;
        request.headers = request._headers || {};
        if (requestDefinition.payload) {
            request.body = requestDefinition.payload;
        }
        let response = new ServerResponse(request);

        // Todo: Why does "end" event get called multiple times? Seeing 6.
        let ended = false;
        response.on("end", () => {
            if (!ended) {
                ended = true;

                // end the request to avoid any errors about unclosed sockets
                request.end();

                // pass to test case handler
                handler.call(null, response);
            }
        });

        // Ensure that the router is ready and fired up to 
        // route requests from paths to endpoints.
        this._prepareRouter(router => {
            router(request, response, handler);
        });
    }

    _prepareRouter(run) {
        if (!this._isReady) {
            this._api.bootstrap()
            .then(() => {
                this._isReady = true;
                run(this._api.router())
            })
            .catch(e => {
                throw e
            });
        } else {
            run(this._api.router());
        }
    }
}
    
module.exports = BaseApiTestCase;