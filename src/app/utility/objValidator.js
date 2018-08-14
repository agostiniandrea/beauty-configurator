// # Object Validator
//
// Given an object and the path to a inner node we want to access,
// this method returns the node content if it exists, null otherwise.
// This functions will avoid the throw of an Error if the path to the node does not exist or is not correct.
// The client can decide which level of logging to use when the path is not correct.

//
import _ from 'lodash';

/**
 * ## defaultExport()
 */
export default (obj,path,msg,logLevel)=>{
    switch(logLevel){
        case 0:
            return log(obj,path,msg);
        case 1:
            return warn(obj,path,msg);
        case 2:
            return error(obj,path,msg);
        default:
            return run(obj,path);
    }
};

/**
 * ### run()
 * 
 * It simply execute the the check on the wanted node without any logging in case of wrong path.
 * 
 * @param {Object} obj Object from which to read the content.
 * @param {String} path The path to the node to read.
 * @return {Object}
 * 
 */
function run(obj, path) {
    return _.get(obj, path) || null;
}

/**
 * ### log()
 * 
 * It execute the the check on the wanted node and logs a message in case of wrong path.
 * LEVEL: LOG
 * 
 * @param {Object} obj Object from which to read the content.
 * @param {String} path The path to the node to read.
 * @param {String} msg Message to write in the log.
 * @return {Object}
 * 
 */
function log(obj, path, msg) {

    let result = run(obj, path);

    if (!result) {
        console.log(msg, obj);
    }

    return result || null;
}

/**
 * ### warn()
 * 
 * It execute the the check on the wanted node and logs a message in case of wrong path.
 * LEVEL: WARNING
 * 
 * @param {Object} obj Object from which to read the content.
 * @param {String} path The path to the node to read.
 * @param {String} msg Message to write in the log.
 * @return {Object}
 * 
 */
function warn(obj, path, msg) {

    let result = run(obj, path);

    if (!result) {
        console.warn(msg, obj);
    }

    return result || null;
}

/**
 * ### error()
 * 
 * It execute the the check on the wanted node and throws an error in case of wrong path.
 * LEVEL: ERROR
 * 
 * @param {Object} obj Object from which to read the content.
 * @param {String} path The path to the node to read.
 * @param {String} msg Message to write in the error.
 * @return {Object}
 * 
 */
function error(obj, path, msg) {

    let result = run(obj, path);

    if (!result) {
        console.log(obj);
        throw new Error('Path \"' + path + '\" is not valid.\n' + (msg || ''));
    } else return result;

}