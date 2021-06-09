const mysql = require('mysql');

/**
 * Gets Youtube video ID from given url.
 * @param {String} url 
 * @returns Video ID of youtube url given.
 */
exports.getVideoID = (url) => {
    return url.match(/(?:\/|%3D|v=|vi=)([0-9A-z-_]{11})(?:[%#?&]|$)/i)[1];
}

/**
 * Converts comma separated strings into an array.
 * @param {*} string 
 * @returns 
 */
exports.parseStringToArray = (string) => {
    if(string && string !== "")
        string = string.split(',')
    return string;
}

/**
 * Parses the filter options from the request
 * @param {Object} query 
 * @returns The filters to add to the query.
 */
exports.getFilters = (query) => {
    let filters = "";
    if(query.min_duration)
        filters += " AND duration>=" + parseInt(query.min_duration)
    if(query.max_duration)
        filters += " AND duration<=" + parseInt(query.max_duration)
    if(query.target_muscle) {
        query.target_muscle.forEach((muscle, index) => {
            if(index === 0)
                filters += " AND target_muscle = ";
            else 
                filters += " OR target_muscle = ";
            filters += mysql.escape(muscle)
        })
    }   
    return filters;
}

/**
 * Parses the sort options from the request.
 * @param {Object} query 
 * @returns The sort options to add to the query.
 */
exports.getSortOptions = (query) => {
    let sortOption = "";
    if(query.sort)
        sortOption += " ORDER BY " + mysql.escapeId(query.sort);
    if(query.order)
        sortOption += " DESC" 
    return sortOption;
}

/**
 * Gets the page from the request.
 * @param {*} query 
 * @returns The pagination options for the query.
 */
exports.getPage = (query) => {
    let pagination = "";
    if(query.limit) {
        let limit = parseInt(query.limit);
        pagination += " LIMIT " + query.limit
        if(query.page) {
            let offset = (parseInt(query.page)-1) * limit;
            pagination += " OFFSET " + offset;
        }
    }
    return pagination;
}