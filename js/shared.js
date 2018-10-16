function generateHashString(query) {
    let hashString = '#';
    if (query.search && query.search.trim() != '')
        hashString += 'search:' + query.search.trim() + ';';

    if (query.tags && query.tags.length > 0)
        hashString += 'tags:' + query.tags.join(',') + ';';

    return hashString;
}
