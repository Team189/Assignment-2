// Code for the main app page (Past Runs list).

//delete reattempt in storage when this page is loaded
if(localStorage.getItem(APP_PREFIX + "Retry")){
    localStorage.removeItem(APP_PREFIX + "Retry"); 
    localStorage.removeItem(APP_PREFIX + "Retry Index");
}


function viewRun(runIndex)
{
    // Save the desired run to local storage so it can be accessed from View Run page.
    localStorage.setItem(APP_PREFIX + "-selectedRun", runIndex);
    // ... and load the View Run page.
    location.href = 'viewRun.html';
}


// Setting up a list to put in index.html
// Retrieving Run Names from local storage
var retrievedRunName = JSON.parse(localStorage.getItem(APP_PREFIX + "Run Name"));


// Creating the list using span
// Optional info shows date and time
for(var i = 0; i < retrievedRunName.length; i++)
    {
        var currentName = retrievedRunName[i];  //current name
        var myRunData = JSON.parse(localStorage.getItem(APP_PREFIX + currentName)); //find run data for the corresponding run name
        
        var thisRunData = new Run(); 
        thisRunData.initialiseFromRunPDO(myRunData); //initialising
        
        //display
        var output = "";
        output += '<li class= "mdl-list__item mdl-list__item--two-line" onclick= "viewRun('+i+');"><span class="mdl-list__item-primary-content"><span>' + retrievedRunName[i] + '</span><span class="mdl-list__item-sub-title">'+'Start Date : ' + thisRunData.date + '</span><span class="mdl-list__item-sub-title">'+ 'Start time : '+ thisRunData.startTime +'</span></span></li>'
	    document.getElementById("runsList").innerHTML += output;
    }


