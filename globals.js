const path = require('path');

global.rootRequire = modulePath => require(path.join(__dirname, modulePath));

global.isFunction = maybe => (typeof maybe === 'function' || maybe instanceof Function);