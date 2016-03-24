document.addEventListener("DOMContentLoaded", function() {
  
   document.getElementById("searchBar").addEventListener("keyup", searchSite, false);

}, false);

function searchSite(e) {
   if (e.keyCode == "13") {
      document.getElementById("searchBar").value = "Nahh";
   }
}