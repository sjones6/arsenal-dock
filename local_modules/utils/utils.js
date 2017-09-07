const {join} = require('path');

module.exports = {
    rootRequire: modulePath => require(join(process.cwd(), modulePath)),
    isFunction: maybe => (typeof maybe === 'function' || maybe instanceof Function),
    isNil: maybe => (maybe === null || maybe === undefined)
};
