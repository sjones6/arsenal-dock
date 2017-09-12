const {rootRequire} = require("utils");
const env = rootRequire("src/utils/env");

const Gun = require('gun/gun');

// Require only the bit of Gun that are necessary
rootRequire('./node_modules/gun/nts');

module.exports = Gun;