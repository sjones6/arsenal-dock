/**
 * All drivers implement this interface to satisfy the requirements of the error reporter
 * 
 * The driver is responsible for reporting the error to a service or recording it in
 * some fashion.
 * 
 * @class ErrorDriverInterface
 */
class ErrorDriverInterface {

    /**
     * Report an caught error
     * 
     * @public
     * @instance
     * 
     * @param {Error} error  The error to report
     */
    caught() {}

    /**
     * Report an uncaught error
     * 
     * @public
     * @instance
     * 
     * @param {Error} error  The error to report
     */
    uncaught(error) {}
}

module.exports = ErrorDriverInterface;