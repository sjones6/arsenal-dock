const {rootRequire} = require("utils");
const Env = rootRequire("src/utils/env");
const env = new Env();

const Gun = require('gun/gun');

// Require only the bit of Gun that are necessary
rootRequire('./node_modules/gun/nts');
if (!env.inTesting()) {
      try {
            rootRequire('./node_modules/gun/lib/ws');
      } catch(e){
              rootRequire('./node_modules/gun/lib/wsp/server');
      }
      rootRequire('./node_modules/gun/lib/verify');
}

module.exports = Gun;