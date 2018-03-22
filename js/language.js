function languageSelect(url, language){
    if (typeof(Storage) !== "undefined") {
        localStorage.lang = language;
    } 
    location.href = url;
}

function checkLanguage(url, urls){
    if (typeof(Storage) !== "undefined") {
        console.log(localStorage.lang);
        console.log(urls);
        if(localStorage.lang && (localStorage.lang == 'en' || localStorage.lang == 'ar'))
            if(urls[localStorage.lang] != url)
                location.href = urls[localStorage.lang]; 
    } 
}