var locationList = document.getElementById("chapters"),
video = document.getElementById("my-video"),
trackElement = video.getElementsByTagName("track")[0];
video.addEventListener("loadedmetadata", function run_tests() {
      if (trackElement.readyState == 1) { setTimeout(run_tests, 0); } else { displayChapters(); }
})

function displayChapters(){
  if ((trackElement.readyState == 2) && (textTrack = trackElement.track) && (window.matchMedia("(min-width: 500px)").matches)){
        if(textTrack.kind === "chapters"){
            textTrack.mode = 'hidden';
            for (var i = 0; i < textTrack.cues.length; ++i) {
                var cue = textTrack.cues[i],
                chapterName = cue.text,
                start = cue.startTime,
                newLocale = document.createElement("li"),
                location = document.createElement("a");
                location.setAttribute('id', start);
                location.setAttribute('tabindex', '0');
                var localeDescription = document.createTextNode(cue.text);
                location.appendChild(localeDescription);
                newLocale.appendChild(location);
                locationList.appendChild(newLocale);
                location.addEventListener("click",
                function() {
                  video.currentTime = this.id;
                }, false);

            }
          textTrack.addEventListener("cuechange",
       function() {
                var currentLocation = this.activeCues[0].startTime;
                if (chapter = document.getElementById(currentLocation)) {
                  var locations = [].slice.call(document.querySelectorAll("#chapters li a"));
                  for (var i = 0; i < locations.length; ++i) { locations[i].classList.remove("current"); }
                    chapter.classList.add("current");
                  // locationlist.style.top = "-"+chapter.parentNode.offsetTop+"px";
                  // alternative approach, as scrollIntoView will cause entire page to jump if video is not at top of page
                  chapter.scrollIntoView();
                }
            },
            false);

        }
    }
}
