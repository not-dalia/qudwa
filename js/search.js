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
    let searchResults = $('#mentor-list');
    searchResults.empty();



    if (results.length) { // Are there any results?
        let appendString = '';
        $('#search-tags').empty();

        for (let i = 0; i < results.length; i++) {  // Iterate over the results
            let item = store[results[i].ref];


            let card = $('<div />', { "class": "mentor-card" });

            let cardShadow = $('<div />', { "class": "mentor-content sh-2 hv" });
            let cardImage = $('<div />', { "class": "mentor-image" });
            let cardInfo = $('<div />', { "class": "mentor-info" });

            let cardInfoName = $('<div />', { "class": "mentor-name" });
            let cardInfoNameLink = $('<a />', { text: item.title, href: item.url });
            cardInfoName.append(cardInfoNameLink);

            let jobTitle = '';
            if (item.jobtitle) jobTitle += item.jobtitle;
            if (item.workplace) {
                if (item.jobtitle) jobTitle += ($('#main').attr('data-selected-language') == 'ar' ? '، ' : ', ');
                jobTitle += item.workplace;
            }
            let cardInfoJobTitle = $('<div />', { "class": "mentor-title", text: jobTitle });
            let cardInfoBio = $('<div />', { "class": "mentor-bio", text: item.shortBio });

            let cardInfoTags = $('<ul />', { "class": "mentor-tags" });

            let tags = item.tags.split(',');
            tags.forEach(function(el, i) {
                if (i < 2) cardInfoTags.append('<li>' + '<a onclick="javascript:addTag(\'' + el.trim() + '\')">' + el.trim() + '</a>' + '</li>');
                $('#search-tags').append('<li>' + '<a onclick="javascript:toggleTag(\'' + el.trim() + '\')">' + el.trim() + '</a>' + '</li>');
            });

            let cardInfoSocial = $('<ul />', { "class": "mentor-social" });

            for (var key in item['social-accounts']) {
                // skip loop if the property is from prototype
                if (!item['social-accounts'].hasOwnProperty(key) || key == 'nothing') continue;

                var obj = item['social-accounts'][key];
                if (key == 'link')
                    cardInfoSocial.append('<li>' + '<a target="_blank" href="' + obj.trim() + '">' + '<i class="fas fa-link"></i>' + '</a>' + '</li>');
                else
                    cardInfoSocial.append('<li>' + '<a target="_blank" href="' + obj.trim() + '">' + '<i class="fab fa-' + key + '"></i>' + '</a>' + '</li>');
            }

            cardInfo.append(cardInfoName);
            cardInfo.append(cardInfoJobTitle);
            cardInfo.append(cardInfoBio);
            cardInfo.append(cardInfoTags);
            cardInfo.append(cardInfoSocial);

            cardShadow.append(cardImage);
            cardShadow.append(cardInfo);

            card.append(cardShadow);

            searchResults.append(card);
        }

    } else {
        searchResults.html('No results found');
    }
}

function displayAll(store) {
    console.log(store);
    let searchResults = $('#mentor-list');
    searchResults.empty();
    let appendString = '';
    $('#search-tags').empty();

    for (let i = 0; i < store.length; i++) {  // Iterate over the results
        let item = store[i];
        let card = $('<div />', { "class": "mentor-card" });

        let cardShadow = $('<div />', { "class": "mentor-content sh-2 hv" });
        let cardImage = $('<div />', { "class": "mentor-image" });
        let cardInfo = $('<div />', { "class": "mentor-info" });

        let cardInfoName = $('<div />', { "class": "mentor-name" });
        let cardInfoNameLink = $('<a />', { text: item.title, href: item.url });
        cardInfoName.append(cardInfoNameLink);

        let jobTitle = '';
        if (item.jobtitle) jobTitle += item.jobtitle;
        if (item.workplace) {
            if (item.jobtitle) jobTitle += ($('#main').attr('data-selected-language') == 'ar' ? '، ' : ', ');
            jobTitle += item.workplace;
        }
        let cardInfoJobTitle = $('<div />', { "class": "mentor-title", text: jobTitle });
        let cardInfoBio = $('<div />', { "class": "mentor-bio", text: item.shortBio });

        let cardInfoTags = $('<ul />', { "class": "mentor-tags" });

        let tags = item.tags.split(',');
        tags.forEach(function(el, i){
            if (i < 2) cardInfoTags.append('<li>' + '<a onclick="javascript:addTag(\'' + el.trim() + '\')">' + el.trim() + '</a>' + '</li>');
            $('#search-tags').append('<li>' + '<a onclick="javascript:toggleTag(\'' + el.trim() + '\')">' + el.trim() + '</a>' + '</li>');
        });


        let cardInfoSocial = $('<ul />', { "class": "mentor-social" });

        for (var key in item['social-accounts']) {
            // skip loop if the property is from prototype
            if (!item['social-accounts'].hasOwnProperty(key) || key == 'nothing') continue;

            var obj = item['social-accounts'][key];
            if (key == 'link')
                cardInfoSocial.append('<li>' + '<a target="_blank" href="' + obj.trim() + '">' + '<i class="fas fa-link"></i>' + '</a>' + '</li>');
            else
                cardInfoSocial.append('<li>' + '<a target="_blank" href="' + obj.trim() + '">' + '<i class="fab fa-' + key + '"></i>' + '</a>' + '</li>');
        }

        cardInfo.append(cardInfoName);
        cardInfo.append(cardInfoJobTitle);
        cardInfo.append(cardInfoBio);
        cardInfo.append(cardInfoTags);
        cardInfo.append(cardInfoSocial);

        cardShadow.append(cardImage);
        cardShadow.append(cardInfo);

        card.append(cardShadow);

        searchResults.append(card);
    }
}

function getQueryVariable() {
    let hash = window.location.hash.substring(1);
    let values = decodeURIComponent(hash.replace(/\+/g, '%20')).split(';');
    let query = {
        search: null,
        tags: null,
    };
    values.forEach(function(el){
        let currentQuery = el.split(':');
        if (currentQuery.length == 2)
            query[currentQuery[0]] = currentQuery[1];
    });

    if (query.tags)
        query.tags = query.tags.split(',');
    return query;
}

function search(query) {
    if (query.search && query.search.trim() != '') {
        let searchTerm = query.search.trim();
        document.getElementById('search-box').setAttribute("value", searchTerm);

        let unfilteredResults = idx.search(searchTerm);
        let results = unfilteredResults;
        if (query.tags && query.tags.length > 0) {
            results = unfilteredResults.filter(function(el){
                let item = mentors[el.ref];
                let tagFound = true;
                let itemTags = item.tags.split(', ');
                query.tags.forEach(function(el, i){
                    if (itemTags.indexOf(el.trim()) < 0) {
                        tagFound = false;
                    }
                });

                return tagFound
            });
        }
        displaySearchResults(results, mentors);
    } else {
        let results = mentors;
        if (query.tags && query.tags.length > 0) {
            results = mentors.filter(function(item){
                let tagFound = true;
                let itemTags = item.tags.split(', ');
                query.tags.forEach(function(el, i) {
                    if (itemTags.indexOf(el.trim()) < 0) {
                        tagFound = false;
                    }
                });

                return tagFound
            });
        }
        displayAll(results);
    }
};

function onSearchButton() {
    let searchTerm = document.getElementsByName("query")[0].value;
    let query = getQueryVariable();
    query.search = encodeURIComponent(searchTerm.trim());
    //window.location.hash = generateHashString(query);
    window.history.replaceState({}, 'search', generateHashString(query));
    search(getQueryVariable());
}

function toggleTag(tag) {
    let query = getQueryVariable();
    if (!query.tags) query.tags = []
    if (query.tags && query.tags.indexOf(tag) >= 0) query.tags.splice(query.tags.indexOf(tag), 1);
    else query.tags.push(tag);
    window.history.replaceState({}, 'search', generateHashString(query));
    onSearchButton();
}

function addTag(tag) {
    let query = getQueryVariable();
    if (!query.tags) query.tags = [];
    if (query.tags.indexOf(tag) < 0) query.tags.push(tag);
    window.history.replaceState({}, 'search', generateHashString(query));
    onSearchButton();
}

$('#search-box').keypress(function (event) {
    if (event.keyCode == 13) {
        $('#search-button').click();
    }
});


search(getQueryVariable());
