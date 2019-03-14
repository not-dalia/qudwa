var idx = lunr(function () {
    this.use(lunr.multiLanguage('en', 'ar'));

    this.field('id');
    this.field('title', { boost: 10 });
    this.field('url');
    this.field('shortBio');
    this.field('tags', { boost: 5 });
    this.field('excerpt');
    for (var key in mentors) { // Add the data to lunr
        this.add({
            'id': key,
            'image': mentors[key].image,
            'url': mentors[key].url,
            'title': mentors[key].title,
            'excerpt': mentors[key].excerpt,
            'shortBio': mentors[key].shortBio,
            'tags': mentors[key].tags
        });
    }
});


function displaySearchResults(results, store) {
    var searchResults = $('#mentor-list');
    searchResults.empty();
    var addedTags = [];

    if (results.length) { // Are there any results?
        var appendString = '';
        $('#search-tags').empty();

        for (var i = 0; i < results.length; i++) {  // Iterate over the results
            var item = store[results[i].ref];


            var card = $('<div />', { "class": "mentor-card" });

            var cardShadow = $('<div />', {  "class": "mentor-content sh-2 hv" });
            cardShadow.click = function(){
                window.location.href = item.url;
            };
            var cardImage = $('<a />', { "class": "mentor-image" , href: item.url });
            cardImage.css('background-image', 'url(' + item.image + ')');
            var cardInfo = $('<div />', { "class": "mentor-info" });

            var cardInfoName = $('<div />', { "class": "mentor-name" });
            var cardInfoNameLink = $('<a />', { text: item.title, href: item.url });
            cardInfoName.append(cardInfoNameLink);

            var jobTitle = '';
            if (item.jobtitle) jobTitle += item.jobtitle;
            if (item.workplace) {
                if (item.jobtitle) jobTitle += ($('#main').attr('data-selected-language') == 'ar' ? '، ' : ', ');
                jobTitle += item.workplace;
            }
            var cardInfoJobTitle = $('<div />', { "class": "mentor-title", text: jobTitle });
            var cardInfoBio = $('<div />', { "class": "mentor-bio", text: item.shortBio });

            var cardInfoTags = $('<ul />', { "class": "mentor-tags" });

            var tags = item.tags.split(',');
            var query = getQueryVariable();
            if (!query.tags) query.tags = [];
            tags.forEach(function(el, i) {
                if (el.trim() != ''){
                    cardInfoTags.append('<li>' + '<a onclick="event.stopPropagation(); javascript:addTag(\'' + el.trim() + '\', event)">' + el.trim() + '</a>' + '</li>');
                    if ((query.tags.indexOf(el.trim()) < 0) && addedTags.indexOf(el.trim()) < 0) {
                        addedTags.push(el.trim());
                        $('#search-tags').append('<li>' + '<a onclick="javascript:event.stopPropagation();toggleTag(\'' + el.trim() + '\', event)">' + el.trim() + '</a>' + '</li>');
                    }
                }
            });

            var cardInfoSocial = $('<ul />', { "class": "mentor-social" });

            for (var key in item['social-accounts']) {
                // skip loop if the property is from prototype
                if (!item['social-accounts'].hasOwnProperty(key) || key == 'nothing') continue;

                var obj = item['social-accounts'][key];
                if (key == 'link')
                    cardInfoSocial.append('<li>' + '<a target="_blank" href="' + obj.trim() + '">' + '<i class="fas fa-link"></i>' + '</a>' + '</li>');
                else
                    cardInfoSocial.append('<li>' + '<a target="_blank" href="' + obj.trim() + '">' + '<i class="fab fa-' + key + '"></i>' + '</a>' + '</li>');
            }

            var cardFooter = $('<div />', { "class": "mentor-footer" });
            cardFooter.append(cardInfoTags);
            cardFooter.append(cardInfoSocial);

            cardInfo.append(cardInfoName);
            cardInfo.append(cardInfoJobTitle);
            cardInfo.append(cardInfoBio);
            // cardInfo.append(cardFooter);
            

            cardShadow.append(cardImage);
            cardShadow.append(cardInfo);
            cardShadow.append(cardFooter);

            card.append(cardShadow);

            searchResults.append(card);
        }

    } else {
        searchResults.html('No results found');
    }
}

function displayAll(store) {
    console.log(store);
    var searchResults = $('#mentor-list');
    searchResults.empty();
    var appendString = '';
    $('#search-tags').empty();
    var addedTags = [];

    for (var i = 0; i < store.length; i++) {  // Iterate over the results
        var item = store[i];
        var card = $('<div />', { "class": "mentor-card" });

        var cardShadow = $('<div />', {  "class": "mentor-content sh-2 hv", "id": "mentor-id-" + i, "data-url": item.url });
        cardShadow.click(function(e){
            if (e.target.nodeName !== 'A' && e.target.nodeName !== 'I')
                window.location.href = e.currentTarget.getAttribute('data-url');
                //window.location.href = item.url;
        });
        var cardImage = $('<a />', { "class": "mentor-image" , href: item.url });
        cardImage.css('background-image', 'url(' + item.image + ')');

        var cardInfo = $('<div />', { "class": "mentor-info" });

        var cardInfoName = $('<div />', { "class": "mentor-name" });
        var cardInfoNameLink = $('<a />', { text: item.title, href: item.url });
        cardInfoName.append(cardInfoNameLink);

        var jobTitle = '';
        if (item.jobtitle) jobTitle += item.jobtitle;
        if (item.workplace) {
            if (item.jobtitle) jobTitle += ($('#main').attr('data-selected-language') == 'ar' ? '، ' : ', ');
            jobTitle += item.workplace;
        }
        var cardInfoJobTitle = $('<div />', { "class": "mentor-title", text: jobTitle });
        var cardInfoBio = $('<div />', { "class": "mentor-bio", text: item.shortBio });

        var cardInfoTags = $('<ul />', { "class": "mentor-tags" });

        var tags = item.tags.split(',');
        var query = getQueryVariable();
        if (!query.tags) query.tags = [];
        tags.forEach(function(el, i){
            if ((el.trim() != '') && (addedTags.indexOf(el.trim()) < 0)){
                addedTags.push(el.trim());
                if (query.tags.indexOf(el.trim()) < 0) $('#search-tags').append('<li>' + '<a onclick="javascript:toggleTag(\'' + el.trim() + '\')">' + el.trim() + '</a>' + '</li>');
            }
            if ((el.trim() != '')){
                cardInfoTags.append('<li>' + '<a onclick="javascript:event.stopPropagation();addTag(\'' + el.trim() + '\', event)">' + el.trim() + '</a>' + '</li>');
            }
        });


        var cardInfoSocial = $('<ul />', { "class": "mentor-social" });

        for (var key in item['social-accounts']) {
            // skip loop if the property is from prototype
            if (!item['social-accounts'].hasOwnProperty(key) || key == 'nothing') continue;

            var obj = item['social-accounts'][key];
            if (key == 'link')
                cardInfoSocial.append('<li>' + '<a target="_blank" href="' + obj.trim() + '">' + '<i class="fas fa-link"></i>' + '</a>' + '</li>');
            else
                cardInfoSocial.append('<li>' + '<a target="_blank" href="' + obj.trim() + '">' + '<i class="fab fa-' + key + '"></i>' + '</a>' + '</li>');
        }

        var cardFooter = $('<div />', { "class": "mentor-footer" });
        cardFooter.append(cardInfoTags);
        cardFooter.append(cardInfoSocial);

        cardInfo.append(cardInfoName);
        cardInfo.append(cardInfoJobTitle);
        cardInfo.append(cardInfoBio);
        // cardInfo.append(cardFooter);
        

        cardShadow.append(cardImage);
        cardShadow.append(cardInfo);
        cardShadow.append(cardFooter);

        card.append(cardShadow);

        searchResults.append(card);
    }
}

function getQueryVariable() {
    var hash = window.location.hash.substring(1);
    var values = decodeURIComponent(hash.replace(/\+/g, '%20')).split(';');
    var query = {
        search: null,
        tags: null,
    };
    values.forEach(function(el){
        var currentQuery = el.split(':');
        if (currentQuery.length == 2)
            query[currentQuery[0]] = currentQuery[1];
    });

    if (query.tags)
        query.tags = query.tags.split(',');
    return query;
}

function search(query, initial) {
    var results;
    if (query.search && query.search.trim() != '') {
        var searchTerm = query.search.trim();
        document.getElementById('search-box').setAttribute("value", searchTerm);

        var unfilteredResults = idx.search(searchTerm);
        results = unfilteredResults;
        if (query.tags && query.tags.length > 0) {
            results = unfilteredResults.filter(function(el){
                var item = mentors[el.ref];
                var tagFound = true;
                var itemTags = item.tags.split(', ');
                query.tags.forEach(function(el, i){
                    if (itemTags.indexOf(el.trim()) < 0) {
                        tagFound = false;
                    }
                });

                return (tagFound && item.title && item.title.trim()!='')
            });
        }
        results = results.filter(function(el){
            var item = mentors[el.ref];
            return (item.title && item.title.trim()!='');
        });
        displaySearchResults(results, mentors);
    } else {
        results = mentors;
        if (query.tags && query.tags.length > 0) {
            results = mentors.filter(function(item){
                var tagFound = true;
                var itemTags = item.tags.split(', ');
                query.tags.forEach(function(el, i) {
                    if (itemTags.indexOf(el.trim()) < 0) {
                        tagFound = false;
                    }
                });

                return (tagFound && item.title && item.title.trim()!='')
            });
        }
        results = results.filter(function(item){
            return (item.title && item.title.trim()!='');
        })
        displayAll(results);
    }
    renderSelectedTags(query.tags);
    if ((!initial || (query.tags && query.tags.length) || (query.search && query.search.trim() != ''))) pushAction('triggerAction', {actionType: 'filter', actionData: (query.tags && query.tags.length ? 'tags:' + query.tags : '') + (query.search? ';query:' + query.search : '') , extraData: { results: results.length}});
};

function onSearchButton() {
    var searchTerm = document.getElementsByName("query")[0].value;
    var query = getQueryVariable();
    query.search = encodeURIComponent(searchTerm.trim());
    //window.location.hash = generateHashString(query);
    window.history.replaceState({}, 'search', generateHashString(query));
    search(getQueryVariable());
}

function toggleTag(tag, e) {
    if (e) e.stopPropagation();
    var query = getQueryVariable();
    if (!query.tags) query.tags = [];
    if (query.tags && query.tags.indexOf(tag) >= 0) query.tags.splice(query.tags.indexOf(tag), 1);
    else query.tags.push(tag);
    renderSelectedTags(query.tags);
    window.history.replaceState({}, 'search', generateHashString(query));
    onSearchButton();
}

function addTag(tag, e) {
    if (e) e.stopPropagation();
    var query = getQueryVariable();
    if (!query.tags) query.tags = [];
    if (query.tags.indexOf(tag) < 0) query.tags.push(tag);
    renderSelectedTags(query.tags);
    window.history.replaceState({}, 'search', generateHashString(query));
    onSearchButton();
}

function renderSelectedTags(tags){
    if (!tags) return;
    var selectedTags = document.querySelector('#selected-tags');
    selectedTags.innerHTML = '';
    var tagsHTML = '';
    for (var i = 0; i < tags.length; i++){
        tagsHTML += '<div class="tag"><div class="tag-side"> ' + tags[i].trim() +' </div> <div class="close-side" onclick="javascript:toggleTag(\'' + tags[i].trim() + '\')">⨯</div></div>';
    }

    selectedTags.innerHTML = tagsHTML;
}

$('#search-box').keypress(function (event) {
    if (event.keyCode == 13) {
        $('#search-button').click();
    }
});

$('body').on('click', '.search-inner', function(e) {
    var target = $(e.target);
    $('#search-box').focus();
});

search(getQueryVariable(), true);
