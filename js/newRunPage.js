// Code for the Measure Run page.

var currentPosition;
var timeNow;
var latitude;
var longitude;
var accuracyRecord;
var AccCircle;
var beachMarker;
var randomDis = 0;
var plusOrMinusA;
var plusOrMinusB;
var latitudeTarget;
var longitudeTarget;
var targetPosition;
var currentPosition1;
var targetPosition1;
var startPosition;
var startPosition1;
var startOrNot = false;
var timeCounter;
var pathCounter;
var reached; 
var storingArray = [];
var walkPathing;
var travelDis = 0;
var incre = 0;
var disCheck = 0;
var goNow = document.getElementById("go1");
var outputAreaRef = document.getElementById("data");
var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};
var thisRun;
var startTime;
var endTime;
var marker;
var marker2;


sav.className = "disabled";
go1.className = "disabled";
clea.className = "disabled";
news.className = "disabled";

// To initiate the map and initiate user tracking
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {    //initialise the map
        zoom: 17,
        
    });
    
    
    
    positionOption = {
        enableHighAccuracy: true,
        timeout: Infinity,
        maximumAge: 0
    };
    
    // User tracking
    track = navigator.geolocation.watchPosition(userLoc,errorLoc,positionOption)
}





// Function to locate user and place marker on it
function userLoc(position)
{
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    currentPosition = {
        lat : latitude,
        lng : longitude
    }
	
    
    currentPosition1 = new google.maps.LatLng(latitude,longitude);
    
    if(marker){
        marker.setMap(null);
    }
        marker = new google.maps.Marker({
        position: currentPosition,
        map: map,
        title: 'Hello World!'
      });
    
 
    map.setCenter(currentPosition);
    
    accuracyRecord = position.coords.accuracy;
	if(AccCircle){
		AccCircle.setMap(null);
		AccCircle = new google.maps.Circle({
			strokeColor: '#0000FF',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#0000FF',
			map: map,
			center: currentPosition,
			radius: accuracyRecord
		})
	}
	else{
		AccCircle = new google.maps.Circle({
			strokeColor: '#0000FF',
			strokeOpacity: 0.8,
			strokeWeight: 2,
			fillColor: '#0000FF',
			map: map,
			center: currentPosition,
			radius: accuracyRecord
		})
	}
	
	
		if(accuracyRecord < 10000){
			news.className = "button";;
		}
		else if(accuracyRecord >10000){
			news.className = "disabled";;
		}
	
		if(startOrNot == true){
			news.className = "disabled";;
		}
	
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
       

// A function to generate random place for user to run to as well trigger user checking
function randomDestination()
{
//    if(accuracyRecord > 20)
//    {
//        displayMessage("accuacy too low");
//    }
//    else
//    
    randomDis = 0;
    startPosition = {lat : latitude, lng: longitude};
    startPosition1 = new google.maps.LatLng(latitude,longitude);
   
    
   if(marker2){
       marker2.setMap(null);
   }
   /* if(randomDis === 0)
        {*/
    while (randomDis < 60 || randomDis > 150)
        {
        //provide a location 60m and 150m away from current location
        plusOrMinusA = Math.random() < 0.5 ? -1 : 1
        plusOrMinusB = Math.random() < 0.5 ? -1 : 1
    
        latitudeTarget = Math.random()*plusOrMinusA*0.1 + latitude;
        longitudeTarget = Math.random()*plusOrMinusB*0.1 + longitude;
        
    
    
    targetPosition1 = new google.maps.LatLng(latitudeTarget,longitudeTarget);
    
            
   randomDis = calcDistance(startPosition1,targetPosition1);
            
        }
            targetPosition = {
            lat: latitudeTarget,
            lng: longitudeTarget
            }
            
         marker2 = new google.maps.Marker({
            position: targetPosition1,
            map: map, 
            title: 'Bitch'
          });
    

    go1.className = "button";
}

    //calculates distance between two points in km's
function calcDistance(a,b){
    return google.maps.geometry.spherical.computeDistanceBetween(a,b);
}

function start()
{
	startOrNot = true;
    go1.className = "disabled";
	news.className = "disabled";
    goNow.innerHTML = "Ready?";
    
    setTimeout(counter3, 1000)
    
    function counter3()
    {
        goNow.innerHTML = "3";latitudeTarget
    }
    
    setTimeout(counter2, 2000)
    
    function counter2()
    {
        goNow.innerHTML = "2";    
    }
    
    setTimeout(counter1, 3000)
    
    function counter1()
    {
        goNow.innerHTML = "1";
        timeCounter = setInterval(countTime, 1000);

    }

    setTimeout(go, 4000)
    
    
    
    function go()
    {
        startTime = new Date();
        goNow.innerHTML = "Start";
        clea.className = "button";
        //previousPosition = new google.maps.LatLng(latitude,longitude);
        pathCounter = setInterval(userPathing, 333);
        //reached = setInterval(success, 100);
    }
}

function userPathing()
{
    storingArray.push(currentPosition1);
    var tempArray;
    var tempArray1;
    var tempArray2;
    
    if(storingArray.length > 1){
            tempArray = [storingArray[storingArray.length-2], storingArray[storingArray.length-1]];
            tempArray1 = new google.maps.LatLng(tempArray[0].lat,tempArray[0].lng);
            tempArray2 = new google.maps.LatLng(tempArray[1].lat,tempArray[1].lng);

            //draws path as user moves
            walkPathing =  new google.maps.Polyline({
                  path: tempArray,
                  geodesic: true,
                  strokeColor: '#FF0000',
                  strokeOpacity: 1.0,
                  strokeWeight: 2
                });

                walkPathing.setMap(map);

    travelDis = (calcDistance(startPosition1,currentPosition1)).toFixed(2) ;
    
    disCheck = (calcDistance(currentPosition1, targetPosition1)).toFixed(2);
    }
}

function success()
{
    //if (disCheck < 100)
        //{
			startOrNot = false;
            endTime = new Date();
            clearInterval(timeCounter);
            clearInterval(pathCounter);
            clearInterval(reached);
            sav.className = "button";
        //}
}



function countTime()
{
    incre = incre + 1
}

function updateTime()
{
    // Get the current time.
    timeNow = new Date();
    // Display the current time.
    outputAreaRef.innerHTML = "distance: " + randomDis.toFixed(2) + "<br/>" + "time counter: " + incre + "<br/>" + "distance away: "  + disCheck + "<br/>" + "distance travelled: " + travelDis;
}



// Call the 'updateTime' function once every second.
setInterval(updateTime, 1000);

function saveRun()
{
	
     var tempVar;
    var runName = prompt("Name this run");
    var varString;
    
    if (runName === "")
        {
            runName = "Untitled";
        }
    
    
    thisRun = new Run(startPosition1,targetPosition1,storingArray,startTime,endTime,runName);
    thisRun.getDistance();
    thisRun.getTimeTaken(startTime,endTime);
    
    //run object storage
     if (localStorage.getItem(APP_PREFIX + "RunObject"))
        {
            savedRuns = JSON.parse(localStorage.getItem(APP_PREFIX + 'RunObject'));
            savedRuns.push(thisRun);
            varString = JSON.stringify(savedRuns);
            localStorage.setItem(APP_PREFIX + "RunObject",varString);
        }
    else
        {
            savedRuns.push(thisRun);
            varString = JSON.stringify(savedRuns);
            localStorage.setItem(APP_PREFIX + "RunObject",varString);
        }
    
    
    
    //run name storage
    if (localStorage.getItem(APP_PREFIX + "Run Name"))
        {
            saveRunName = JSON.parse(localStorage.getItem(APP_PREFIX + 'Run Name'));
            saveRunName.push(runName);
            tempVar = JSON.stringify(saveRunName);
            localStorage.setItem(APP_PREFIX + "Run Name",tempVar);
        }
    else
        {
            saveRunName.push(runName);
            tempVar = JSON.stringify(saveRunName);
            localStorage.setItem(APP_PREFIX + "Run Name",tempVar);
        }
    
    displayMessage("Run was successfully saved.");
	console.log(savedRuns);
	console.log(saveRunName);
    document.location.href = 'index.html';
}   

