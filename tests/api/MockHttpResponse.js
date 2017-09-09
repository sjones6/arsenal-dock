const {Response} = require("@arsenal/http");

const oEnd = Response.prototype.end;
Response.prototype.end = function() {
    oEnd.apply(this, Array.prototype.slice.call(arguments, 0));
    this.emit.call(this, "end", this);
};

module.exports = Response;