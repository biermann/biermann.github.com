
fxosnetzradio.localstorage.currentobject = function (src,format,desc,www,objOwner,view,volume,objId,property){
   this.src=src;
   this.format=format;
   this.desc=desc;
   this.www=www;
   this.objOwner=objOwner;
   this.view=view;
   this.volume=volume;
   this.objId=objId;
   this.property=property;
}
fxosnetzradio.localstorage.mycurrentobject = new fxosnetzradio.localstorage.currentobject ("http://internationalradiofestival.ice.infomaniak.ch/radio-live.mp3","MP3","IRF","http://www.internationalradiofestival.com","biermann","biermann","0.12345","","1");

fxosnetzradio.localstorage.currentarray = "radioCurrent";

//fxosnetzradio.localstorage.currentobjectValid (obj);
fxosnetzradio.localstorage.currentobjectValid = function (obj) {
  var result=false;
  var resultCount=0;
  for (var prop in obj) {
     if (obj.hasOwnProperty(prop)) {
        resultCount++;
	if (prop == "src") {resultCount = resultCount +10;}
	if (prop == "objOwner") {resultCount = resultCount +100;}
	if (prop == "volume" && obj["volume"] < 1) {resultCount = resultCount +1000;}
	this[prop] = obj[prop];
        //console.log(resultCount+ 'fxosnetzradio.localstorage.currentobjectValid.' +prop+': ' +this[prop]);
     } 
  } 
  if (resultCount > 1113) {result = true;}
  else {result = false;console.log('current obj validation: count='+resultCount +' '+result);}
  return result;
};




//fxosnetzradio.localstorage.mycurrentobject = new fxosnetzradio.localstorage.currentobject ( "http://radio.hbr1.com:19800/trance.ogg",  "hbr1 trance"," http://www.hbr1.com/",  "Ogg",  "testbutton" );



//fxosnetzradio.localstorage.statusSet ();
fxosnetzradio.localstorage.statusSet = function () {
   //var db = fxosnetzradio.browserdb.db;
        var	radioCurrent = fxosnetzradio.localstorage.currentGet ();
   var	elementId = 'localstorageStatus';
   var	element = document.getElementById(elementId);
   var	className = 'fxosnetzradioView';
   var 	currentdate = new Date(); 
   var text = "";
   text +=  currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + " ";
   if (element) { element.textContent = text; }
        for (var prop in radioCurrent) {
          if (radioCurrent.hasOwnProperty(prop)) {
  		var newElement = document.createElement("a");
  		newElement.dataset.this = radioCurrent[prop]; 
  		//newElement.dataset.view = view; 
  		newElement.id = elementId + prop; 
		newElement.innerHTML = ' '+prop+'='+radioCurrent[prop]+' ' ;
                newElement.setAttribute('class',className);
		//text += '<a id=' + elementId + prop  + '  data-src=0 class=' + className + '>  #' + prop + ':<code>' + radioCurrent[prop] + '</code></a>';
		//text += '<a id=' + elementId + prop  + '  data-src=0 class=' + className + '>  #' + prop + ':<code>' + radioCurrent[prop] + '</code></a>';
              if (element) { element.appendChild(newElement); }
            //console.log( 'update: ' +prop+': ' +this[prop]);
	} 
       }
   //fxosnetzradio.localstorage.status = text;
   //text += " updatevalidator=" +updateValidator() ;
   //text += " fxosnetzradio.browserdb.ok=" +fxosnetzradio.browserdb.ok() ;
   //if (element) { element.textContent = text; }
}





//fxosnetzradio.localstorage.currentSet (fxosnetzradio.localstorage.mycurrentobject);
fxosnetzradio.localstorage.currentSet = function (obj) {
   var array = fxosnetzradio.localstorage.currentarray;
   var oldObjects = JSON.parse(localStorage.getItem(array));
   if (oldObjects) {
      var oldObject = oldObjects[0];
      if (typeof oldObject !== 'undefined' && oldObject !== null) {
         if (fxosnetzradio.localstorage.currentobjectValid (obj) ) {
     	    var newObjects = [];
            var newObject = obj;
            newObjects.push(newObject);
            localStorage.removeItem(array);
            localStorage.setItem(array, JSON.stringify(newObjects));
     //for (var prop in obj) {
        //if (obj.hasOwnProperty(prop)) {
          //this[prop] = obj[prop];
          //console.log( 'fxosnetzradio.localstorage.currentset: ' +prop+': ' +this[prop]);
        //} 
     //}
            console.log( 'fxosnetzradio.localstorage.currentSet: src=' +newObject.src+' view=' +newObject.view+' vol=' +newObject.volume);
         }
	 else {
     	    var newObjects = [];
            var newObject = oldObject;
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop) && prop == "view" ) {
		// validation missing
		 newObject[prop] = obj[prop];
                 newObjects.push(newObject);
                 localStorage.removeItem(array);
                 localStorage.setItem(array, JSON.stringify(newObjects));
                 console.log( 'fxosnetzradio.localstorage.currentSet view='+newObject[prop]);
	      }
	    }
	 }
         fxosnetzradio.localstorage.statusSet ();
         if (!fxosnetzradio.localstorage.currentobjectValid (obj) && typeof obj.view !== 'undefined'){
          //console.log( 'fxosnetzradio.localstorage.currentSet request obj.view=' +obj.view);
}
     }
  } 
}








//fxosnetzradio.localstorage.currentGet ();
fxosnetzradio.localstorage.currentGet = function () {
   var array = fxosnetzradio.localstorage.currentarray;
   var objects = JSON.parse(localStorage.getItem(array));
   if (objects) {
     var obj = objects[0];
     if (typeof obj !== 'undefined' && obj !== null) {
        for (var i in nmp.db.radio.field) {
            //console.log(nmp.db.radio.field[i]+': '+obj[nmp.db.radio.field[i]]);
	   if (typeof obj[nmp.db.radio.field[i]] == 'undefined'){obj[nmp.db.radio.field[i]]  = '';console.log('problem: '+obj[nmp.db.radio.field[i]]);}
        }
     	if (fxosnetzradio.localstorage.currentobjectValid (obj)) {
     		return obj;
     	} 
     	obj.objOwner="currentGet"
	return obj;
     } 
     radioStatusUpdate ('problems reading storage'); 
     //fxosnetzradio.localstorage.currentSet (fxosnetzradio.localstorage.mycurrentobject);
     return fxosnetzradio.localstorage.currentGet ();
   }
   return [];
}

//fxosnetzradio.localstorage.currentUpdate(objId,objStore);
nmp.storage.currentUpdate = function (objId,objStore) {
   //var newObj = fxosnetzradio.localstorage.currentGet ();
   var newObj = [];
   var obj = [];
   newObj.volume = audio.volume;
   if (fxosnetzradio.browserdb.ok() && objStore !== null && objId !== null && typeof objStore !== 'undefined'){
      var db = fxosnetzradio.browserdb.db;
      var store = db.transaction(objStore).objectStore(objStore);
      var request = store.get(objId);
      request.onsuccess = function(e) {
         obj  = e.target.result;
         if (obj == null) {
            console.log("obj not found: ",key,objStore);
         }
         else {
            //console.log( 'fxosnetzradio.localstorage.currentUpdate: ' ,obj,objId,objStore);
            var newObj = fxosnetzradio.localstorage.currentGet ();
            for (var prop in obj) {
               if (obj.hasOwnProperty(prop)) {
	          newObj[prop] = obj[prop] ;
               } 
            }
            newObj.volume = audio.volume;
            console.log( '1fxosnetzradio.localstorage.currentUpdate.new: src='+newObj.src+' vol='+newObj.volume);
            if (fxosnetzradio.localstorage.currentobjectValid(newObj)) {fxosnetzradio.localstorage.currentSet(newObj);
            //console.log( 'fxosnetzradio.localstorage.currentUpdate.new: ' ,newObj.src);
}
         }
      }
  }
   
   newObj = fxosnetzradio.localstorage.currentGet ();
   newObj.volume = audio.volume;
            //console.log( '3fxosnetzradio.localstorage.currentUpdate.new: ' ,newObj.src);
   if (fxosnetzradio.localstorage.currentobjectValid(newObj)) {fxosnetzradio.localstorage.currentSet(newObj);}
            console.log( '1fxosnetzradio.localstorage.currentUpdate.new: src='+newObj.src+' vol='+newObj.volume);
}






fxosnetzradio.localstorage.radioCurrentSet = function(src,desc,www,format,objectOwner) {
// select radio
    //var radioListSelect = document.querySelector("#radioListSelect"),
  	//radioListSelection = radioListSelect.selectedIndex,
    var audio = document.querySelector("#audio");
    var	radioCurrentArray = JSON.parse(sessionStorage.getItem("radioCurrent"));
	//radioListArray = JSON.parse(localStorage.getItem("radioList"));
    //if (radioListSelect && audio && radioListArray && radioCurrentArray) {
    if (audio && radioCurrentArray) {
	var myArrayObject = [];
	var myObject = new Object();
	myObject.src = src;
	myObject.description = desc;
	myObject.www = www;
	myObject.objOwner = objectOwner;
	myArrayObject.push(myObject);
	localStorage.removeItem("radioCurrent");
	localStorage.setItem("radioCurrent", JSON.stringify(myArrayObject));
	//var myArrayObject = JSON.parse(localStorage.getItem("radioList")),
	//radioListArray = JSON.parse(localStorage.getItem("radioList")),
	//radioCurrentArray = JSON.parse(sessionStorage.getItem("radioCurrent")),
  	//radioListSelection = radioListSelect.selectedIndex,
	//var 	radioListSelectedArray = radioListArray[selectedIndex],
	//	tempArray = [];
	//tempArray.push(radioListSelectedArray);
	//sessionStorage.removeItem("radioCurrent");
	//sessionStorage.clear();
	//localStorage.removeItem("radioCurrent");
	//sessionStorage.setItem("radioCurrent", JSON.stringify(tempArray));
	//localStorage.setItem("radioCurrent", JSON.stringify(tempArray));
	//var 	radioCurrentArray = JSON.parse(localStorage.getItem("radioCurrent")),
	//	radioCurrent = radioCurrentArray[0],
	//	srcStr = '' + radioCurrent.src,
        //        descriptionStr = '' + radioCurrent.description;
       	//audio.setAttribute('src',src);
	//radioCurrentSetAudio ();    	
	//radioListTuneIn ('radioCurrent','0');
	console.log( 'fxosnetzradio.localstorage.radioCurrentSet: ' +myObject.src+" "+myObject.description );
    }
};


fxosnetzradio.localstorage.radioCurrentSetAudio = function(e) {
   var audio = document.querySelector("#audio");
   //var radioCurrent = fxosnetzradio.localstorage.currentGet();
   var a = audio.src.substr(0,20) ;
   var b = fxosnetzradio.localstorage.currentGet().src.substr(0,20) ;
   if (updateValidator () && audio && b) {
      //var srcStr = '' + radioCurrent.src;
      if (fxosnetzradio.localstorage.currentGet().src.volume <= 1 && fxosnetzradio.localstorage.currentGet().src.volume > 0) {audio.volume = fxosnetzradio.localstorage.currentGet().src.volume;}
      //console.log( 'fxosnetzradio.localstorage.radioCurrentSetAudio: ' +String(radioCurrent.src) );
      if (a !== b) {audio.setAttribute('src',fxosnetzradio.localstorage.currentGet().src.toString());
      console.log( 'fxosnetzradio.localstorage.radioCurrentSetAudio: ' +String(audio.src) );

}
   }
};


function onStorageEvent(eventDescription) {
	var onStorageEvent = document.querySelector("#onStorageEvent");
	var descriptionStr = '' + eventDescription;
	var info
	if (onStorageEvent && descriptionStr){
		info = "onStorageEvent: <code> " + descriptionStr + "</code>";
		onStorageEvent.innerHTML = info;
        	onStorageEvent.style.display = "block";
	}
};

function storageevent() {
	window.addEventListener('storage', onStorageEvent('window event'), false);
	//document.addEventListener('storage', onStorageEvent('document event'), false);
};

