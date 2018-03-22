let idx = lunr(function () {
    this.use(lunr.multiLanguage('en', 'ar'));

    this.field('id');
    this.field('title', { boost: 10 });
    this.field('url');
    this.field('shortBio');
    this.field('tags', { boost: 5 });
    this.field('excerpt');
    for (let key in mentors) { // Add the data to lunr
        this.add({
            'id': key,
            'url': mentors[key].url,
            'title': mentors[key].title,
            'excerpt': mentors[key].excerpt,
            'shortBio': mentors[key].shortBio,
            'tags': mentors[key].tags
        });
    }
});


function displaySearchResults(results, store) {
    let searchResults = document.getElementById('search-results');

    if (results.length) { // Are there any results?
        let appendString = '';

        for (let i = 0; i < results.length; i++) {  // Iterate over the results
            let item = store[results[i].ref];
            /*appendString += '<li><a href="' + item.url + '"><h3>' + item.title + '</h3></a>';
            appendString += '<p>' + item.excerpt.substring(0, 150) + '...</p></li>'; */
            let li = document.createElement("li");
            let header = document.createElement("h2");
            header.innerHTML = '<a href="'+ item.url + '">' + item.title + '</a>';
            let content = '<section class="post-excerpt" itemprop="description"><p>' + item.shortBio + '</p></section>';
            content += '<section class="post-meta">';
            content += '<div class="post-categories">';
            let tags = item.tags.split(',');
            tags.forEach((el, i) => {
                content += '<a href="#'+ el +'">' + el + '</a>'
                if (i != tags.length) content += ' ';
            });
            content += '</div></section>';

            li.innerHTML = header.outerHTML + content;
            appendString += li.outerHTML;
        }

        searchResults.innerHTML = appendString;
    } else {
        searchResults.innerHTML = '<li>No results found</li>';
    }
}

function displayAll(store){
    let searchResults = document.getElementById('search-results');
    let appendString = '';

    for (let i = 0; i < store.length; i++) {  // Iterate over the results
        let item = store[i];
        let li = document.createElement("li");
            let header = document.createElement("h2");
            header.innerHTML = '<a href="'+ item.url + '">' + item.title + '</a>';
            let content  = '<section class="post-excerpt" itemprop="description"><p>' + item.shortBio + '</p></section>';
            content += '<section class="post-meta">';
            content += '<div class="post-categories">';
            let tags = item.tags.split(',');
            tags.forEach((el, i) => {
                content += '<a href="#'+ el +'">' + el + '</a>'
                if (i != tags.length) content += ' ';
            });
            content += '</div></section>';

            li.innerHTML = header.outerHTML + content;
            appendString += li.outerHTML;
            
    }
    searchResults.innerHTML = appendString;
}

function getQueryVariable() {
    let hash = window.location.hash.substring(1);
    let values = decodeURIComponent(hash.replace(/\+/g, '%20')).split(';');
    let query = {
        search: null,
        tags: null,
    };
    values.forEach(el => {
        let currentQuery = el.split(':');
        if (currentQuery.length == 2)
            query[currentQuery[0]] = currentQuery[1];
    });

    if (query.tags) 
        query.tags = query.tags.split(',');
    return query;
}

function generateHashString(query){
    let hashString = '#';
    if (query.search && query.search.trim() != '')
        hashString += 'search:' + query.search.trim() + ';';

    if (query.tags && query.tags.length > 0)
        hashString =+ 'tags:' + query.tags.join(',') + ';';

    return hashString;
}

function search(query) {
    if (query.search && query.search.trim() != '') {
        let searchTerm = query.search.trim();
        document.getElementById('search-box').setAttribute("value", searchTerm);
        
        
        let results = idx.search(searchTerm); 
        displaySearchResults(results, mentors);
    } else {
        displayAll(mentors);
    }
};

function onSearchButton() {
    let searchTerm = document.getElementsByName("query")[0].value;
    let query = getQueryVariable();
    query.search = encodeURIComponent(searchTerm.trim());
    window.location.hash = generateHashString(query);
    search(getQueryVariable());
}


search(getQueryVariable());
