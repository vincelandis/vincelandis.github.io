var warnings;                    // red box displays warning user
var dismissers;                  // x keys to dismiss warnings

var contactList = contacts.slice(0);

// adds click listeners to most interactive elements
document.addEventListener("DOMContentLoaded", function()
{
   window.onresize = resizeResults;
   resizeResults();
   
   document.getElementById("searchBar").addEventListener("keyup", respondKeyInput, false);
   document.getElementById("magnifying-glass").addEventListener("click", searchSite, false);
   document.getElementById("homeLink").addEventListener("mouseover", displaySocialMedia, false);
   document.body.addEventListener("click", hideSocialMedia, false);
   
   warnings = document.getElementsByClassName("warning");
   dismissers = document.getElementsByClassName("dismiss_cross");

   for (var i = 0; i < warnings.length; i++)
   {
      if (dismissers[i] != null)
         dismissers[i].addEventListener("click", dismissWarning, false);
   }
   
   var socialMediaPopup = document.getElementById("socialMediaPopup");
   
   if (socialMediaPopup != null)
   {  
      var popup, width, smlink, arrow, spacer = "";
      
      width = (contactList.length * 30) + ((contactList.length - 1) * 10);
      
      popup = document.createElement("div");
      popup.className = "popup color1";
      popup.id = "smlinks";
      
      arrow = document.createElement("div");
      arrow.className = "popupArrow";
      arrow.marginLeft = (width / 2).toString() + "px";console.log((width/2).toString() + "px");
      
      popup.appendChild(arrow);
      
      for (var i = 0; i < contactList.length; i++)
      {
         smlink = document.createElement("div");
         smlink.className = "contactItem floatLeft";

         smlink.innerHTML = '<a href="' + contactList[i].link + '" title="' + contactList[i].title + '">' +
                              '<img class="contactPhoto" src="' + contactList[i].image + '"/>' +
                            '</a>';
                            
         if (i < contactList.length)
         {
            spacer = document.createElement("div");
            spacer.innerHTML += '<span class="contactSpacer floatLeft"></span>';
         }
                            
         popup.appendChild(smlink);
         
         if (spacer != "") popup.appendChild(spacer);
      }
      
      popup.style.width = width.toString();
      
      socialMediaPopup.appendChild(popup);
   }
   
}, false);

// event handler for search bar
function respondKeyInput(e)
{
   if (e.keyCode == "13")
      searchSite();
}

// searches entire website (Google custom search? links to tabs?)
function searchSite()
{
   document.getElementById("searchBar").value = "Nahh";
}

// resizes display area according to window size
// TODO: fix title bar when window becomes very narrow
function resizeResults()
{
  document.getElementById("displayArea").style.width = window.innerWidth - 80;
}

// dismisses warning corresponding to event trigger
function dismissWarning(e)
{
   for (var i = 0; i < dismissers.length; i++)
      if (e.target = dismissers[i])
         warnings[i].style.display = "none";
}

// displays the social media links below the home website link
function displaySocialMedia()
{
   document.getElementById("smlinks").style.visibility = "visible";
}

// displays the social media links below the home website link
function hideSocialMedia()
{
   document.getElementById("smlinks").style.visibility = "hidden";
}