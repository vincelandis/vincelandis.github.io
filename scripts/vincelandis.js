$ = jQuery;
var warnings;                    // red box displays warning user
var dismissers;                  // x keys to dismiss warnings
var windowSize;

var CONVERSION_ERROR = "There was an error converting the value.\nMake sure the correct input type is selected.";

var contactList = contacts.slice(0);

// adds click listeners to most interactive elements
document.addEventListener("DOMContentLoaded", function()
{
   window.onresize = resizeResults;
   resizeResults();
   
   document.getElementById("searchBar").addEventListener("keyup", respondKeyInput, false);
   document.getElementById("magnifying-glass").addEventListener("click", chainSearch, false);
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
   
   $(".menuOption").click(function(e) {
	   var menuOptions = document.getElementsByClassName("menuOption");
      var newColor = "color1";
      
      for (var i = 0; i < menuOptions.length; i++)
      {
         if (e.target == menuOptions[i])
         {
            newColor = "color2";
         }
         else
         {
            newColor = "color3";
         }
         
         menuOptions[i].className = "menuOption " + newColor;
      }
   });

   $("#convertButton").click(function()
   {
      // todo: sanitize input to remove newlines
      input = document.getElementById("input").value;

      if (input != "")
         convertValue(input, $("#inType").val(), $("#outType").val());
   });
   
}, false);

// event handler for search bar
function respondKeyInput(e)
{
   if (e.keyCode == "13")
      searchSite();
}

function chainSearch(){searchSite();}
// searches entire website (Google custom search? links to tabs?)
// TODO: why doesn't clicking magnifying glass change display/visibility properties?
function searchSite()
{
   document.getElementById("searchBar").value = "Not found";
   document.getElementById("displayArea").style.display = "none";
   document.getElementById("searchArea").style.display = "block";
}

// resizes display area according to window size
// TODO: fix title bar when window becomes very narrow
function resizeResults()
{
   var content, menu, menuWidth = 200;
   
   menu = document.getElementById("menuSide");
   content = document.getElementById("contentSide");
   
   windowSize = window.innerWidth - 60;
   
   document.getElementById("displayArea").style.width = windowSize;
   
   if (menu != null)
      menu.style.width = menuWidth;
   if (content != null)
      content.style.width = windowSize - menuWidth;
   
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

function convertValue(inputVal, inputMode, outputMode)
{
   var actualVal = 0; // the "actual" decimal value of the input string
   var output;
   var err = false;

   if (inputMode == outputMode)
   {
      output = inputVal + "\n(input and output type are identical)";
   }
   else
   {
      var base = parseInt(inputMode);
      switch (base)
      {
         case 2: // binary
         case 4: // quaternary
         case 8: // octal
            var copy = parseFloat(inputVal);
            
            if (isNaN(copy))
            {
               err = true;
            }
            else
            {
               var m = 0;               // multiplier

               while (copy > 0 && !err) // check if input is valid
               {
                  if (copy % 10 > base - 1)    // if remainder is 8 or 9, input isn't octal
                  {
                     err = true;
                  }
                  else
                  {
                     actualVal += Math.pow(base, m) * (copy % 10);
                     m++;
                     copy = parseInt(copy / 10);
                  }
               }

            }

            break;

         case 16: // hex
            var copy = inputVal.toString();
            var m = copy.length - 1;               // multiplier

            for (var i = 0; i < copy.length && !err; i++, m--)
            {
               var j = copy.charAt(i);

               if (j <= '0' && j >= '9' || j < 10 && j > -1)
               {
                  actualVal += Math.pow(16, m) * parseInt(j);
               }
               else if (j >= 'a' && j <= 'f')
               {
                  actualVal += Math.pow(16, m) * (j.charCodeAt(0) - 87);
               }
               else if (j >= 'A' && j <= 'F')
               {
                  actualVal += Math.pow(16, m) * (j.charCodeAt(0) - 54);
               }
               else
               {
                  err = true;
               }
            }

            break;

         default: // value interpreted as decimal value
            actualVal = parseFloat(inputVal);

            if (isNaN(actualVal)) 
               err = true;
      }

      if (err)
      {
         output = CONVERSION_ERROR;
      }
      else
      {
         var m = 0;
         var base = parseInt(outputMode);
         output = 0;

         switch (base)
         {
            case 2: // binary
            case 4: // quaternary
            case 8: // octal
               while (actualVal > 0)
               {
                  output += Math.pow(10, m) * (actualVal % base);
                  actualVal = parseInt(actualVal / base);
                  m++;
               }
               break;
            case 16: // hex
               output = "";

               while (actualVal > 0)
               {
                  var next_digit = actualVal % base;
                  
                  if (next_digit > 9)
                     output = String.fromCharCode(next_digit + 87) + output;
                  else
                     output = next_digit.toString() + output;

                  actualVal = parseInt(actualVal / base);
                  m++;
               }
               break;
            default:
               output = actualVal;
         }  
      }
   }

   $("#output").html(output);
}
