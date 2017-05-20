// Shared code needed by all three pages.

class Location{
    constructor(){
        this._lat; 
        this._lng;
    }
    
    //getters
    get lat(){
        return this._lat;
    }
    
    get lng(){
        return this._lng;
    }
    
    //setters
    set lat(someLat){
        return this._lat = someLat;
    }
    
    set lng(someLng){
        return this._lng = someLng;
    }
    
    //initialise PDO
    initialiseFromLatLngPDO(someLatLngObj){
        this._lat = someLatLngObj.lat;
        this._lng = someLatLngObj.lng;
    }
    
    
}

class Run{

    constructor(){
       this._startPos;
        this._desPos;
        this._arrayLoc;
        this._startTime;
        this._endTime;
        this._duration;
        this._date;
        this._distancePath;
        this._directDistance;
        this._runName;
    }
    
    
    //methods
    //getters
    get startPos(){
        return this._startPos;
    }
    
     get desPos(){
        return this._desPos;
    }
    
    get arrayLoc(){
        return this._arrayLoc;
    }
    
    get startTime(){
        return this._startTime;
    }
    
    get endTime(){
        return this._endTime;
    }
    
    get duration(){
        return this._duration;
    }
    
    get date(){
        return this._date;
    }
    
    get distancePath(){
        return this._distancePath;
    }
    
    get directDistance(){
        return this._directDistance;
    }
    
    get runName(){
        return this._runName;
    }
    
    //setters
    set startPos(startPoint){
        return this._startPos = startPoint;
    }
    
    set desPos(destinationPoint){
       return this._desPos = destinationPoint;
    }
    
    set arrayLoc(positionArray){
        return this._arrayLoc = positionArray;
    }
    
    set startTime(beginTime){
       return this._startTime = beginTime;
    }
    
    set endTime(stopTime){
       return this._endTime = stopTime;
    }
    set duration(someDuration){
        return this._duration = someDuration;
    }
    
    set date(someDate){
        return this._date = someDate;
    }
    
   set distancePath(someDistance){
       return this._distancePath = someDistance;
   }
    
   set directDistance(someDistance){
       return this._directDistance = someDistance;
   }
    
    getDuration(){
        return this._duration = this._endTime.valueOf() - this._startTime.valueOf();
    }
    
    set getStartTimeFormat(someDate){
        return this._startTime = someDate.toLocaleTimeString();
    }
    
    set getEndTimeFormat(someDate){
        return this._endTime = someDate.toLocaleTimeString();
    }
    
    set runName(myName){
        return this._runName = myName;
    }
    
    //initialise from PDO
    initialiseFromRunPDO(runObject){
        this.startPos = new Location();
        this.desPos = new Location();
        this.arrayLoc = new Array();
        
        this.startPos.initialiseFromLatLngPDO(runObject._startPos);
        this.desPos.initialiseFromLatLngPDO(runObject._desPos);
        
        for(var i = 0; i < runObject._arrayLoc.length; i++){
            var thisLoc = new Location();
            thisLoc.initialiseFromLatLngPDO(runObject._arrayLoc[i]);
            this.arrayLoc.push(thisLoc);
        }
        
        this.startTime = runObject._startTime;
        this.endTime = runObject._endTime;
        this.duration = runObject._duration;
        this.date = runObject._date;
        this.distancePath = runObject._distancePath;
        this.directDistance = runObject._directDistance;
        this.runName = runObject._runName;
    }
    
}

//checking local storage availability
     if (typeof(Storage) !== "undefined")
        {
           displayMessage("Local storage available");
        }
    else
        {
            alert("Browser does not support local storage.");
        }
    
  

   //calculates distance between two points in km's

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "monash.eng1003.runChallengeApp" ;

// Array of saved Run objects.
var savedRuns = [];
var saveRunName = new Array();

//tracking
var track;