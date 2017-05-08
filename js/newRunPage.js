// Code for the Measure Run page.

var currentPosition;
var now;
var latitude;
var longitude;
var accuracyRecord;
var AccCircle=0;
var beachMarker
var randomDis = 0;
var plusOrMinusA;
var plusOrMinusB;
var latitudeTarget;
var longitudeTarget;
var targetPosition;
var currentPosition1;
var targetPosition1;
var previousPosition;
var timeCounter;
var pathCounter;
var reached; 
var storingArray =[];
var walkPathing;
var travelDis = 0;
var incre = 0;
var disCheck = "dafuq";
var goNow = document.getElementById("go");
var outputAreaRef = document.getElementById('output');
var options = {
    enableHighAccuracy: false,
    timeout: 5000,
    maximumAge: 0
};

document.getElementById("sav").disabled = true;
document.getElementById("go").disabled = true;
document.getElementById("cancel").disabled = true;


// To initiate the map and initiate user tracking
function initMap() 
{
    map = new google.maps.Map(document.getElementById('map'), {    //initialise the map
        zoom: 17
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
        lat: latitude,
        lng: longitude
    }
    
    map.setCenter(currentPosition);
    
    accuracyRecord = Number(position.coords.accuracy);
    if (AccCircle===0)
    {            
        AccCircle = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000FF',
        map: map,
        center: currentPosition,
        radius: accuracyRecord
        })

        beachMarker = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 1,
        map: map,
        center: currentPosition,
        radius: 2
        })
    }
    else
    {
        AccCircle.setMap(null)
        benchMarker.setMap(null)
        AccCircle = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#0000FF',
        map: map,
        center: currentPosition,
        radius: accuracyRecord
        })
              
        benchMarker = new google.maps.Circle({
        strokeColor: '#0000FF',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#0000FF',
        fillOpacity: 1,
        map: map,
        center: currentPosition,
        radius: 2
        })
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
//    {
    
    if(randomDis === 0)
    {
        while (randomDis < 60 || randomDis > 150)
        {
            //provide a location 60m and 150m away from current location
            plusOrMinusA = Math.random() < 0.5 ? -1 : 1
            plusOrMinusB = Math.random() < 0.5 ? -1 : 1

            latitudeTarget = Math.random()*plusOrMinusA*0.3 + latitude;
            longitudeTarget = Math.random()*plusOrMinusB*0.3 + longitude;
        
    
            currentPosition1 = new google.maps.LatLng(latitude, longitude);
            targetPosition1 = new google.maps.LatLng(latitudeTarget,longitudeTarget)

            randomDis = calcDistance(currentPosition1, targetPosition1);    
        }
            targetPosition = {
            lat: latitudeTarget,
            lng: longitudeTarget
            }
    
        beachMarker = new google.maps.Circle({
        strokeColor: '#00ff00',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#00ff00',
        fillOpacity: 1,
        map: map,
        center: new google.maps.LatLng(latitudeTarget,longitudeTarget),
        radius: 2
        }) 
    }
    else
    {
        beachMarker.setMap(null)
        randomDis = 0;
            
        while (randomDis < 60 || randomDis > 150)
        {
            //provide a location 60m and 150m away from current location
            plusOrMinusA = Math.random() < 0.5 ? -1 : 1
            plusOrMinusB = Math.random() < 0.5 ? -1 : 1

            latitudeTarget = Math.random()*plusOrMinusA*0.3 + latitude;
            longitudeTarget = Math.random()*plusOrMinusB*0.3 + longitude;


            currentPosition1 = new google.maps.LatLng(latitude, longitude);
            targetPosition1 = new google.maps.LatLng(latitudeTarget,longitudeTarget)

            randomDis = calcDistance(currentPosition1, targetPosition1);    
        }
            targetPosition = {
            lat: latitudeTarget,
            lng: longitudeTarget
            }
    
        beachMarker = new google.maps.Circle({
        strokeColor: '#00ff00',
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: '#00ff00',
        fillOpacity: 1,
        map: map,
        center: new google.maps.LatLng(latitudeTarget,longitudeTarget),
        radius: 2
        })
    }
        
    document.getElementById("go").disabled = false;
}

    //calculates distance between two points in km's
function calcDistance(currentPosition1, targetPosition1) 
{
    return (google.maps.geometry.spherical.computeDistanceBetween(currentPosition1, targetPosition1)).toFixed(2);
}

function start()
{
    document.getElementById("go").disabled = true;
    document.getElementById("gen").disabled = true;
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
        goNow.innerHTML = "Start";
        document.getElementById("cancel").disabled = false;
        previousPosition = new google.maps.LatLng(latitude,longitude);
        pathCounter = setInterval(userPathing, 333);
        reached = setInterval(success, 100);
    }
}

function userPathing()
{
    //track user history track line
    walkPathing = new google.maps.Circle({
    strokeColor: '#cc0000',
    strokeOpacity: 0.5,
    strokeWeight: 2,
    fillColor: '#cc0000',
    fillOpacity: 1,
    map: map,
    center: currentPosition,
    radius: 0.5
    })
    
    travelDis = (google.maps.geometry.spherical.computeDistanceBetween(currentPosition1, previousPosition)).toFixed(1) + Number(travelDis);
    
    storingArray.push(previousPosition) 
    previousPosition = new google.maps.LatLng(latitude,longitude);
            
    disCheck = (google.maps.geometry.spherical.computeDistanceBetween(currentPosition1, targetPosition1)).toFixed(2);    
}

function success()
{
    if (disCheck === 0)
    {
        clearInterval(timeCounter);
        clearInterval(pathCounter);
        clearInterval(reached);
        document.getElementById("sav").disabled = false;
    }
}



function countTime()
{
    incre = incre + 1
}

function updateTime()
{
    // Get the current time.
    now = new Date();
    // Display the current time.
    outputAreaRef.innerHTML = "time: " + now.toLocaleTimeString() + "<br/>" + "accuracy: "+ accuracyRecord + "<br/>" + "distance: " + randomDis + "<br/>" + "time counter: " + incre + "\t" + "distance away: "  + disCheck + "\t" + "distance traveled: " + travelDis;
}



// Call the 'updateTime' function once every second.
setInterval(updateTime, 1000);

// Put this code in shared.js
/*function storeRun()
{
    if (typeof(Storage) !== "undefined")
        {
            var runJSON = JSON.stringify(); <-----variable for stored data
            localStorage.setItem(APP_PREFIX + runName,runJSON);
        }
    else
        {
            alert("Browser does not support local storage.");
        }
}*/

function saveRun()
{
    var saveRunName = [], tempVar;
    var runName = prompt("Name this run");
    
    if (runName === "")
        {
            runName = "Untitled";
        }
    
    //Saving data into Run Class
    /*savedRuns.addRun(na);    <----savedRuns = initialised run class         addRun,namingRun = public methods in run class
    savedRuns.namingRun(na);
    storeRun();*/
    
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
    document.location.href = 'index.html';
}

