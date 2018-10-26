function popoulateMentor() {
  var params = window.location.search;
  var searchParams = new JURL.URLSearchParams(params);
  console.log(searchParams.get("mentor"));
  var currentMentor;
  for (var i = 0; i < mentors.length; i++) {
    if (searchParams.get("mentor") == mentors[i].ref) {
      currentMentor = mentors[i];
      break;
    }
  }

  if (currentMentor) {
    document.querySelector("#mentor-name").innerHTML = currentMentor.title;
    document.querySelector("#btn-mentor-name").innerHTML = currentMentor.title;
    var jobTitle = "";
    if (currentMentor.jobtitle) jobTitle += currentMentor.jobtitle;
    if (currentMentor.workplace) {
      if (currentMentor.jobtitle)
        jobTitle +=
          $("#main").attr("data-selected-language") == "ar" ? "، " : ", ";
      jobTitle += currentMentor.workplace;
    }
    document.querySelector("#mentor-title").innerHTML = jobTitle;
    document.querySelector("#mentor-image").style.backgroundImage = "url('" + currentMentor.image + "')";
    document.querySelector("#mentor-image").style.backgroundPosition = "center";
    document.querySelector("#mentor-image").style.backgroundSize = "cover";
    document.querySelector("#mentor-image").style.backgroundRepeat = "no-repeat";
  } else {
    console.log("Mentor not found");
    window.location.href = "/404";
  }
}

function goback(urlBase) {
  var params = window.location.search;
  var searchParams = new JURL.URLSearchParams(params);
  console.log(searchParams.get("mentor"));
  var currentMentor;
  for (var i = 0; i < mentors.length; i++) {
    if (searchParams.get("mentor") == mentors[i].ref) {
      currentMentor = mentors[i];
      break;
    }
  }

  if (currentMentor) {
    window.location.href = currentMentor.url;
  } else {
    window.location.href = urlBase + "/";
  }
}

popoulateMentor();
