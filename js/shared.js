// Shared code needed by all three pages.


function Run() {
    
    //attributes
        this._startPos  ;
        this._desPos ;
        this._arrayLoc = [];
        this._startTime  ;
        this._endTime ;
        this._duration = 0;
        this._date = new Date();
        
        
    //methods
    //function as an argument of getCurrentPosition
        this.returnInitialPosition = function(position){
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
        this.destination = function(){
            while (randomDis < 60 || randomDis > 150){
            //provide a location 60m and 150m away from current location
            plusOrMinusLat = Math.random() < 0.5 ? -1 : 1
            plusOrMinusLng = Math.random() < 0.5 ? -1 : 1

            var gg1 = Math.random()*plusOrMinusLat*0.5 + startPos.lat;
            var gg2 = Math.random()*plusOrMinusLng*0.5 + startPos.lng;

            this._desPos = {
                lat: gg1,
                lng: gg2
            }
        }
        
        }
        
        //stops timer when last position is less than or equals to 10m 
        this.timeEnd = function(){
            if ((google.maps.geometry.spherical.computeDistanceBetween(this._arrayLoc[this._arrayLoc.length-1], this._desPos))<=10){
                this._endTime = new Date().toLocaleTimeString;
            }
        }
        
        
        
        
}

// Prefix to use for Local Storage.  You may change this.
var APP_PREFIX = "monash.eng1003.runChallengeApp";

// Array of saved Run objects.
var savedRuns = [];
