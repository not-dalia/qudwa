function languageSelect(url, language){
    if (typeof(localStorage) !== "undefined" && localStorage != null) {
        localStorage.lang = language;
    } 

    var params = window.location.search;

    location.href = url+params;
}

function checkLanguage(url, urls){
    if (typeof(localStorage) !== "undefined" && localStorage != null) {
        console.log(localStorage.lang);
        console.log(urls);
        if(localStorage.lang && (localStorage.lang == 'en' || localStorage.lang == 'ar'))
            if(urls[localStorage.lang] != url)
                location.href = urls[localStorage.lang]; 
    } 
}