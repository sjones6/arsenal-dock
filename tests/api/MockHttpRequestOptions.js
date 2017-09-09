class MockHttpRequestOptions {
    constructor(opt) {
        this.path = "http://www.testing.com" + opt.path;
        //this.path = opt.path;
        this.method = opt.method || 'GET';
        this.headers = opt.headers || {
            'Host': 'www.testing.com'
        };
        this.auth = opt.auth || "TEST_AUTH";

        if (opt.payload) {
            let payload = JSON.stringify(opt.payload);

            // Todo: body-parser attemps to parse request body and fails.
            //       Using mock-json allows this to pass by
            this.headers['Content-Type'] = "application/mock-json";
            this.headers['Content-Length'] = Buffer.byteLength(payload, 'utf8');
        }
    }
}

module.exports = MockHttpRequestOptions;