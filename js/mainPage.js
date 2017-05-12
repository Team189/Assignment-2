// Code for the main app page (Past Runs list).

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

function viewRun(runIndex)
{
    // Save the desired run to local storage so it can be accessed from View Run page.
    localStorage.setItem(APP_PREFIX + "-selectedRun", runIndex);
    // ... and load the View Run page.
    location.href = 'viewRun.html';
}


// Setting up a list to put in index.html
// Retrieving Run Names and Run Data from local storage
var retrievedRunName = JSON.parse(localStorage.getItem(APP_PREFIX + "Run Name"));
var retrievedRunData = JSON.parse(localStorage.getItem(APP_PREFIX + "RunObject"));

// Creating the list using span
// Optional info shows date and time
for(var i = 0; i < retrievedRunName.length; i++)
    {
        var output = "";
        output += '<li class= "mdl-list__item mdl-list__item--two-line" onclick= "viewRun('+i+');"><span class="mdl-list__item-primary-content"><span>' + retrievedRunName[i] + '</span><span class="mdl-list__item-sub-title">' + retrievedRunData[i]._date + '</span></span></li>'
	    document.getElementById("runsList").innerHTML += output;
    }


