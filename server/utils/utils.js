
/**
 * Gets Youtube video ID from given url.
 * @param {String} url 
 * @returns Video ID of youtube url given.
 */
exports.getVideoID = (url) => {
    return url.match(/(?:\/|%3D|v=|vi=)([0-9A-z-_]{11})(?:[%#?&]|$)/i)[1];
}