exports.getVideoID = (url) => {
    return url.match(/(?:\/|%3D|v=|vi=)([0-9A-z-_]{11})(?:[%#?&]|$)/i)[1];
}