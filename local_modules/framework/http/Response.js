const {ServerResponse} = require("http");


ServerResponse.prototype.status = function(code) {
    this.writeHead(200);
    this.end();
}

ServerResponse.prototype.json = function(content) {
    this.writeHead(200, {
        'Content-Type': 'application/json'
    });
    this.write(JSON.stringify(content));
    this.end();
}

module.exports = ServerResponse;