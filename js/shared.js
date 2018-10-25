function generateHashString(query) {
  var hashString = "#";
  if (query.search && query.search.trim() != "")
    hashString += "search:" + query.search.trim() + ";";

  if (query.tags && query.tags.length > 0)
    hashString += "tags:" + query.tags.join(",") + ";";

  return hashString;
}

window.onload = function() {
  if (!window.history.replaceState) {
    window.history.replaceState = function(data, title, url) {
      var href = window.location.href.split('#');
      href = href[href.length > 1 ? href.length - 2 : 0];
      window.location.href = href + url;
    };
  }
};
