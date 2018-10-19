function popoulateMentor() {
  var params = window.location.search;
  var searchParams = new JURL.URLSearchParams(params);
  console.log(searchParams.get("mentor"));
}

popoulateMentor();
