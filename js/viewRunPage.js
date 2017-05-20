// Code for the View Run page.

// The following is sample code to demonstrate navigation.
// You need not use it for final app.

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "monash.eng1003.runChallengeApp";

//declare variables used
var map = null;
var runIndex = localStorage.getItem(APP_PREFIX + "-selectedRun");
var marker1;
var marker2;
var pathRun;

//
if (runIndex !== null)
{
    var runNames = (JSON.parse(localStorage.getItem(APP_PREFIX + "Run Name"))); //get the run name array
    var currentName = runNames[runIndex];                             //get current run name
    var retrieveRunData = JSON.parse(localStorage.getItem(APP_PREFIX + currentName)); //get the coresponding run object
    var displayedRun = new Run(); 
    displayedRun.initialiseFromRunPDO(retrieveRunData);        //initialising
    document.getElementById("headerBarTitle").textContent = currentName;//current name displayed in header
}

//initialise map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {    //initialise the map
        center : retrieveRunData._startPos,
        zoom: 17
    });   
    
    markerAndPathline();
}

//function for marker and path line for stored data
function markerAndPathline()
{
    //start point
    if(marker1){
        marker1.setMap(null);
    }
        marker1 = new google.maps.Marker({
        position: retrieveRunData._startPos,
        map: map,
        title: 'Hello World!'
      });
    
    //end point
    if(marker2){
        marker2.setMap(null);
    }
        marker2 = new google.maps.Marker({
        position: retrieveRunData._desPos,
        map: map,
        title: 'Hello World!'
      });

    //runpath
     pathRun =  new google.maps.Polyline({
                  path: retrieveRunData._arrayLoc,
                  geodesic: true,
                  strokeColor: '#FF0000',
                  strokeOpacity: 1.0,
                  strokeWeight: 2
                });

                pathRun.setMap(map);
    
    //set centre at start position
    map.setCenter(retrieveRunData._startPos)
}

// Error function to display error message
function errorLoc(error) 
{
    if (error.code == 1)
              {
                alert("Location access denied by user.");
              }
              else if (error.code == 2)
              {
                alert("Location unavailable.");
              }
              else if (error.code == 3)
              {
                alert("Location access timed out");
              }
             else
              {
                alert("Unknown error getting location.");
              }
}

//Displaying run
var thisOutput = document.getElementById("output");
var output =  "Distance travelled : " + retrieveRunData._distancePath + "<br>" + "Duration : " + retrieveRunData._duration + "<br>" + "Start time : " + displayedRun.startTime + "<br>";
thisOutput.innerHTML = output;


//Delete Run
function deleteRun()
{
    // Warn user before confirming the deletion of run
    var deleteConfirmation = confirm("Are you sure you want to delete this run?");
	if (deleteConfirmation === true)
    {
        localStorage.removeItem(APP_PREFIX + currentName);                      //delete run data
        runNames.splice(runIndex, 1);   // Delete the run name in "Run Name"
        localStorage.setItem(APP_PREFIX + "Run Name",JSON.stringify(runNames));  //update new run name array and store
        
                                                                                  
        displayMessage("Run was deleted.");                                         // Deleted run message
        document.location.href = 'index.html';                                      // Return to main page
    }
}

//rename run
function renameRun(){
    var rename = prompt("Enter new name");                                          //promptng new name input
    if(rename !=null){                                                              //execute when user has entered a new name
        localStorage.removeItem(APP_PREFIX + currentName)                           //remove the old data
        runNames.splice(runIndex,1,rename);
         localStorage.setItem(APP_PREFIX + "Run Name", JSON.stringify(runNames));   //updates new name array
        localStorage.setItem(APP_PREFIX + rename, JSON.stringify(retrieveRunData));     //change the name of current data
        displayMessage("Run renamed to :" + rename);                                
        document.location.href = 'viewRun.html';                                    //refresh page
    }
}

//reattempting run
function retryRun(){
    localStorage.setItem(APP_PREFIX + "Retry",JSON.stringify(currentName));         //storing run index and run name for desired reattempt
    localStorage.setItem(APP_PREFIX + "Retry Index",JSON.stringify(runIndex));
    document.location.href = 'newRun.html';                                           //return to new run page
}

