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
var disCheck ;
var goNow = document.getElementById("go1");
var outputAreaRef = document.getElementById('data');
var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};
var thisRun;
var startTime;
var endTime;
var marker;
var marker1;
var marker2;
var nameRetry, retryData;

//disable all buttons by default
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
    //updates current position---------------------------------------------
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    
    currentPosition = {
        lat : latitude,
        lng : longitude
    }
	
    
    currentPosition1 = new google.maps.LatLng(latitude,longitude);
    
    //marker section---------------------------------------------------------
    if(marker){
        marker.setMap(null);
    }
    marker = new google.maps.Marker({
        position: currentPosition,
        map: map,
        title: 'Hello World!' ,
        animation : google.maps.Animation.BOUNCE
      });
    
    map.setCenter(currentPosition);
    
    
    //accuracy circle----------------------------------------------------
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
	
	
    //conditions to enable randomDestination---------------------------------------------------------
		if(accuracyRecord <= 20){
			news.className = "button";
		}
		else if(accuracyRecord >20){
			news.className = "disabled";
		}
	
		if(startOrNot == true){
			news.className = "disabled";
		}
    
    //when a run is reattempted
    if(localStorage.getItem(APP_PREFIX + "Retry")){
    reattemptRun();
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
       


//function to be called when reattempting run
function reattemptRun(){
    //disable random destination as start and end positions are predetermined
    news.className = "disabled";
    go1.className = "button";
    
    //getting necessary info from local storage
    nameRetry = JSON.parse(localStorage.getItem(APP_PREFIX + "Retry"));
    retryData = JSON.parse(localStorage.getItem(APP_PREFIX + nameRetry));
    retryIndex = JSON.parse(localStorage.getItem(APP_PREFIX + "Retry Index"));
    
    //initialising
    thisRun = new Run();
    thisRun.initialiseFromRunPDO(retryData);
    
    //literal objects
    startPosition = {
        lat : Number(thisRun.startPos.lat),
        lng : Number(thisRun.startPos.lng)
    }
   
    targetPosition = {
        lat  : thisRun.desPos.lat,
        lng : thisRun.desPos.lng
    }
   
    //start marker
    if(marker1){
           marker1.setMap(null);
        }
         
    marker1 = new google.maps.Marker({
            position: startPosition,
            map: map, 
            title: 'start'
          });
    
    //end marker
    if(marker2){
           marker2.setMap(null);
        }
         
    marker2 = new google.maps.Marker({
            position: targetPosition,
            map: map, 
            title: 'end'
          });
    
    //convert to google latlng
    startPosition1 = new google.maps.LatLng(startPosition.lat,startPosition.lng);
    targetPosition1 = new google.maps.LatLng(targetPosition.lat,targetPosition.lng);
   
    //calculate distance from start. if less than 10m, repeat until user approaches coser
    randomDis = thisRun.directDistance;
    var disFromStart = calcDistance(currentPosition1,startPosition1);
    while(disFromStart >10){
        disFromStart = calcDistance(currentPosition1,startPosition1);
    } 
   
} 

//clear button
function clearRun(){
    if(localStorage.getItem(APP_PREFIX + "Retry")){
        document.location.href = "viewRun.html";
    }
    else{
        document.location.href = "newRun.html";
    }
}

// A function to generate random place for user to run to as well trigger user checking
function randomDestination()
{
	randomDis = 0;
    //creating start position the instant user presses button
    startPosition = {lat : latitude, lng: longitude};
    startPosition1 = new google.maps.LatLng(latitude,longitude);
   
    
    while (randomDis < 60 || randomDis > 150) //ensure distance is within 60m to 150m away from user
        {
        //provide negative/positive sign for latitude and longitude
        plusOrMinusA = Math.random() < 0.5 ? -1 : 1
        plusOrMinusB = Math.random() < 0.5 ? -1 : 1
    
        //generate a random location away from user
        latitudeTarget = Math.random()*plusOrMinusA*0.1 + latitude;
        longitudeTarget = Math.random()*plusOrMinusB*0.1 + longitude;
        
    
    //calculate and update distance
    targetPosition1 = new google.maps.LatLng(latitudeTarget,longitudeTarget);
    
    randomDis = calcDistance(startPosition1,targetPosition1);
            
        }
    
    //object literal lat lng for marker placement
    targetPosition = {
         lat: latitudeTarget,
         lng: longitudeTarget
        }
    
    //destintion marker
    if(marker2){
        marker2.setMap(null);
    }
    
    marker2 = new google.maps.Marker({
            position: targetPosition1,
            map: map, 
            title: 'Bitch'
          });
    
    //start button is activated
    go1.className = "button";
}

 
//when start button is clicked
function start()
{
	startOrNot = true;
	news.className = "disabled";
    go1.className = "disabled";
    
    //countdown
    goNow.innerHTML = "Ready?";
    setTimeout(counter3, 1000)
    
    function counter3()
    {
        goNow.innerHTML = "3";
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
        timeCounter = setInterval(countTime, 1000); //start displaying time

    }

    setTimeout(go, 4000)
    
    
    
    function go()
    {
        startTime = new Date();   //lock in start time
        goNow.innerHTML = "Start";
        clea.className = "button"; //aallows user to clear when needed
        pathCounter = setInterval(userPathing, 333); //pathline drawing
		setInterval(success,333);
      
    }
    
}

//tracks position 333 seconds ago, calculate the distance while drawing a pathline
function userPathing()
{
    storingArray.push(currentPosition1);
    
    //temporary array. temp1 and temp2 refers to initial and final positions in 333ms
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

        //continuously calculate distance travelled by user
        travelDis += Number(calcDistance(currentPosition1,storingArray[storingArray.length-2]).toFixed(2)) ;
    
        //distance away from destination
    disCheck = (calcDistance(currentPosition1, targetPosition1)).toFixed(2);
    }
}

//calculate distance between coordinates
function calcDistance(loc1,loc2){
    return google.maps.geometry.spherical.computeDistanceBetween(loc1,loc2);
   
}


//when run is completed
function success()
{
    if (disCheck < 10){
			startOrNot = false;
            endTime = new Date();
            clearInterval(timeCounter);
            clearInterval(pathCounter);
            clearInterval(success);
            sav.className = "button";
        }
}


//counting time for display
function countTime()
{
    incre = incre + 1
}

//displays info on screen
function updateTime()
{
    // Display the current time.
    outputAreaRef.innerHTML = "distance: " + randomDis.toFixed(2) + "<br/>" + "time counter: " + incre + "<br/>" + "distance away: "  + disCheck + "<br/>" + "distance travelled: " + travelDis;
}



// Call the 'updateTime' function once every second.
setInterval(updateTime, 1000);

//creating new run object and calling methods
function makeThisRun(posStart,posDes,someArray,timeStart,timeEnd,someDis,someOtherDis){
    
     thisRun = new Run();
    
    //setting
    thisRun.startPos= posStart;
    thisRun.desPos = posDes;
    thisRun.arrayLoc = someArray;
    thisRun.startTime = timeStart;
    thisRun.endTime = timeEnd;
    thisRun.getDuration();
    thisRun.date = new Date().toDateString();
    thisRun.distancePath = someArray;
    thisRun.directDistance = someDis;
    thisRun.distancePath = someOtherDis;
    thisRun.getStartTimeFormat = timeStart;
    thisRun.getEndTimeFormat = timeEnd;
}

//saving run to local storage
function saveRun()
{
    //if this is a reattempt
    if(localStorage.getItem(APP_PREFIX + "Retry Index")){
        localStorage.removeItem(APP_PREFIX + "Retry");
        localStorage.removeItem(APP_PREFIX + nameRetry);
    }
	
    //prompting name of run
    var myRunName = prompt("Name this run");
   
   //if no name is entered 
    if (myRunName.length == 0)
        {
            runName = "Untitled";
        }
    
	
    var tempvar;
    
    //making a run class
   makeThisRun(startPosition1,targetPosition1,storingArray,startTime,endTime,randomDis,travelDis);
   thisRun.runName = myRunName;

    
    //run object storage
            var temp = JSON.stringify(thisRun);
            localStorage.setItem(APP_PREFIX + myRunName, temp);
    
    
    
    
    //run name storage
     if (localStorage.getItem(APP_PREFIX + "Run Name"))
        {
            saveRunName = JSON.parse(localStorage.getItem(APP_PREFIX + 'Run Name'));
            saveRunName.push(myRunName);
            if(localStorage.getItem(APP_PREFIX + "Retry Index")){
                saveRunName.splice(retryIndex, 1);
                localStorage.removeItem(APP_PREFIX + "Retry Index");
            }
            tempVar = JSON.stringify(saveRunName);
            localStorage.setItem(APP_PREFIX + "Run Name",tempVar);
        }
    else
        {
            saveRunName.push(myRunName);
            tempVar = JSON.stringify(saveRunName);
            localStorage.setItem(APP_PREFIX + "Run Name",tempVar);
        }
    
    displayMessage("Run was successfully saved.");
	
    //brings user back to main page
    document.location.href = 'index.html';
}   

