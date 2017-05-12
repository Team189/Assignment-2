// Shared code needed by all three pages.


class Run{

    constructor(start,des,pathArray,timeStart, timeEnd,runName){
    //attributes
        this._startPos = start ,
        this._desPos = des,
        this._arrayLoc = pathArray;
        this._startTime = timeStart.toLocaleTimeString;
        this._endTime = timeEnd.toLocaleTimeString;
        this._duration ;
        this._date = timeEnd;
        this._nameRun;
        this._distancePath;
        
    }
    
    //methods
    getRun(){
        var runObj = {
            startPos : this._startPos,
            desPos : this._desPos,
            arrayLoc : this._arrayLoc,
            startTime : this._arrayLoc,
            endTime : this._endTime,
            duration : this._duration,
            date : this._date,
            nameRun : this._nameRun,
        }
    }
    
    setNameRun(newName){
        this._nameRun = newName;
    }
    
    getDistance(){
        var i = 0;
        var disTotal = 0;
        while(i < this._arrayLoc.length-1){
            console.log(this._arrayLoc);
            disTotal += google.maps.geometry.spherical.computeDistanceBetween(this._arrayLoc[i],this._arrayLoc[i+1]);
            i++;
        }
        return this._distancePath = disTotal;
    }
    
    getTimeTaken(x,y){
        var xValue = x.valueOf();
        var yValue = y.valueOf();
        return this._duration = yValue-xValue;
    }
    
}
    
    
    
    
    
    
    //methods
    //function as an argument of getCurrentPosition
        /*this.returnInitialPosition = function(position){
            this._startPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
        }
    
        //function to get initial position and time
        this.initialPosition = function(){
            if (navigator.location){
                navigator.geolocation.getCurrentPosition(this.returnInitialPosition);
                this._startTime = new Date().toLocaleTimeString();
            }
        }
        
        //computing distance travelled 
        this.distanceTravelled = function(){
            var distance = google.maps.geometry.spherical.computeDistanceBetween(this._startPos, this._desPos);
            return distance; 
        }
        
        //updating location
        this.updateLoc = function(positionN){
            var pos = {
                lat: positionN.coords.latitude,
                lng: positionN.coords.longitude
            };
            this._arrayLoc.push(pos);
        }
        
        //use this when referring to on click
        //update location each second as long as it is more than 10m away from destination
        //also calculates and updates duration in seconds /(convert to proper time format later)
        this.updateArrayLoc = function(){
            while (google.maps.geometry.spherical.computeDistanceBetween(this._arrayLoc[this._arrayLoc.length-1], this._desPos) > 10){
                setInterval(this.updateLoc, 1000);
                this._duration++;
            }
        }
        
       
        
       
        
    //randomly generate a destination
        
        
        //stops timer when last position is less than or equals to 10m 
        this.timeEnd = function(){
            if ((google.maps.geometry.spherical.computeDistanceBetween(this._arrayLoc[this._arrayLoc.length-1], this._desPos))<=10){
                this._endTime = new Date().toLocaleTimeString;
            }
        }
        
        
        
        
}*/

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "monash.eng1003.runChallengeApp";

// Array of saved Run objects.
var savedRuns = [];
var saveRunName = [];