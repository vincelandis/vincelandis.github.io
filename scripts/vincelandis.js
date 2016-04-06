var warnings;
var dismissers;

document.addEventListener("DOMContentLoaded", function() {
  
   document.getElementById("searchBar").addEventListener("keyup", respondKeyInput, false);
   document.getElementById("magnifying-glass").addEventListener("click", searchSite, false);
   
   warnings = document.getElementsByClassName("warning");
   dismissers = document.getElementsByClassName("dismiss_cross");

   for (var i = 0; i < warnings.length; i++) {
      dismissers[i].addEventListener("click", dismissWarning, false);
   }
   
   window.onresize = resizeResults;
   resizeResults();
   
}, false);

function respondKeyInput(e) {
   if (e.keyCode == "13")
      searchSite();
}

function searchSite() {
   document.getElementById("searchBar").value = "Nahh";
}

function resizeResults() {
  document.getElementById("displayArea").style.width = window.innerWidth - 200;
}

function dismissWarning(e) {
   
   for (var i = 0; i < dismissers.length; i++) {
      if (e.target = dismissers[i])
         warnings[i].style.display = "none";
   }
}