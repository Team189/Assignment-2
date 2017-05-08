// Code for the View Run page.

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "monash.eng1003.runChallengeApp";

var map = null;
var runIndex = localStorage.getItem(APP_PREFIX + "-selectedRun");
if (runIndex !== null)
{
    // If a run index was specified, show name in header bar title. This
    // is just to demonstrate navigation.  You should set the page header bar
    // title to an appropriate description of the run being displayed.
    var runNames = JSON.parse(localStorage.getItem(APP_PREFIX + "Run Name"));
    document.getElementById("headerBarTitle").textContent = runNames[runIndex];
}

//Obtain run data based on run name
var retrivedRunData = JSON.parse(localStorage.getItem(APP_PREFIX + runNames[runIndex]));

//Delete Run
function deleteRun()
{
    // Warn user before confirming the deletion of run
    var deleteConfirmation = confirm("Are you sure you want to delete this run?");
	if (deleteConfirmation === true)
    {
        localStorage.removeItem(APP_PREFIX + runNames[runIndex]);                   // Delete run data from local storage
        runNames.splice(runIndex, 1);                                                // Delete the run name in "Run Name"
        localStorage.setItem(APP_PREFIX + "Run Name", JSON.stringify(runNames));    // Update the new "Run Name"
        displayMessage("Run was deleted.");                                         // Deleted run message
        document.location.href = 'index.html';                                      // Return to index page
    }
}

