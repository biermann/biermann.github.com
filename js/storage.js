fxosnetzradio.localstorage.currentobject = function (src,type,desc,www,objOwner,view,volume,objId,property){
   this.src=src;
   this.type=type;
   this.desc=desc;
   this.www=www;
   this.objOwner=objOwner;
   this.view=view;
   this.volume=volume;
   this.objId=objId;
   this.property=property;
}

fxosnetzradio.localstorage.mycurrentobject = new fxosnetzradio.localstorage.currentobject ("http://internationalradiofestival.ice.infomaniak.ch/radio-live.mp3","MP3","IRF","http://www.internationalradiofestival.com","biermann","biermann","0.12345","","1");




nmp.storage.current.valid = function (obj) {
  var result=false;
  var resultCount=0;
  for (var prop in obj) {
     if (obj.hasOwnProperty(prop)) {
        resultCount++;
        for (var i in nmp.storage.current.field) {
	  //if ( prop == nmp.storage.current.field[i]){ resultCount = resultCount +10; }		
	}
	if (prop in nmp.storage.current.field){ resultCount = resultCount +10; }		
	if (prop == "volume" && obj["volume"] < 1) { resultCount = resultCount +1000; }
	if (obj["volume"] == "n/a") { resultCount = resultCount -1; }
	if (obj[nmp.storage.current.field[i]] == "n/a") { resultCount = resultCount -1; }
	if (prop == "store" && nmp.app.radio.store[obj["store"]]) { resultCount = resultCount +10000; }
	if (obj[prop] in nmp.app.radio.store) { resultCount = resultCount +10000; }
        for (var i in nmp.app.radio.store) {
	  if (obj[prop] == nmp.app.radio.store[i]){ resultCount = resultCount +10000; }		
	}
     } 
  } 
  if (resultCount > 91) {result = true;}
  else {
	result = false;console.log('validation: count='+resultCount +' '+result);}
  console.log('nmp.storage.current.valid: '+resultCount+' '+result+' '+JSON.stringify(obj));
  return result;
};

nmp.storage.ok = function () {
  var result=false;
  var array = nmp.storage.radio.name;
  var objects = JSON.parse(localStorage.getItem(array));
  if (typeof objects !== 'undefined' && objects !== null && objects.length > 0 ) {
     result = true;
  }
  return result;
};


nmp.storage.radio.objectAdd = function (obj) {
   var array = nmp.storage.radio.name;
   var objects = JSON.parse(localStorage.getItem(array));
   var newArray = objects;
   var newObj = obj;
   var result = objects.lastIndexOf(obj);
   for (var i=0; i<objects.length; i++){
     if (JSON.stringify(objects[i]) ==  JSON.stringify(obj)){
       result = 0;	
     }
   }
   if (result < 0 ){
     console.log( 'nmp.storage.radio.objectAdd '+result+'  ' +JSON.stringify(obj));
     newArray.push(newObj);
     localStorage.removeItem(array);
     localStorage.setItem(array, JSON.stringify(newArray));	
   }
};


nmp.storage.radio.objectDel = function (obj) {
   var array = nmp.storage.radio.name;
   var objects = JSON.parse(localStorage.getItem(array));
   var newArray = objects;
   for(var i = newArray.length - 1; i >= 0; i--) {
      if(newArray[i].objId === obj.objId) {
         console.log( 'nmp.storage.radio.objectDel position='+i+' ' +JSON.stringify(newArray[i]));
         newArray.splice(i, 1);
      }
   }   
   localStorage.removeItem(array);
   localStorage.setItem(array, JSON.stringify(newArray));	
};



nmp.storage.radio.updateStats = function (obj,desc) {
  var array = nmp.storage.radio.name;
  var objects = JSON.parse(localStorage.getItem(array));
  var newArray = objects;
  var newObj = obj;
  if (typeof objects !== 'undefined' && objects !== null && nmp.app.radio.valid(obj) && desc) {
    console.log( 'nmp.storage.radio.updateStats request ' +JSON.stringify(obj)+' requestor='+desc);
    for(var i = newArray.length - 1; i >= 0; i--) {
      if(newArray[i].objId === obj.objId) {
        newArray.splice(i, 1);
        newObj.lastUsed=new Date().getTime();
        newArray.push(newObj);
      }
    }   
    localStorage.removeItem(array);
    localStorage.setItem(array, JSON.stringify(newArray));	
  }
};








//fxosnetzradio.localstorage.mycurrentobject = new fxosnetzradio.localstorage.currentobject ( "http://radio.hbr1.com:19800/trance.ogg",  "hbr1 trance"," http://www.hbr1.com/",  "Ogg",  "testbutton" );


nmp.storage.statusSet = function () {
	fxosnetzradio.localstorage.statusSet ();
}


fxosnetzradio.localstorage.statusSet = function () {
   //var db = fxosnetzradio.browserdb.db;
   var	radioCurrent = nmp.storage.currentGet ();
   var	elementId = 'localstorageStatus';
   var	element = document.getElementById(elementId);
   var	className = nmp.view.class;
   var 	currentdate = new Date(); 
   var  text = "";
   text +=  currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + " ";
   text += "nmp.storage.currentGet result: "
   //if (element) { element.textContent = text; }
        for (var prop in radioCurrent) {
          if (radioCurrent.hasOwnProperty(prop)) {
  		var newElement = document.createElement("a");
  		newElement.dataset.this = radioCurrent[prop]; 
  		//newElement.dataset.view = view; 
  		newElement.id = elementId + prop; 
		text += ' '+prop+'='+radioCurrent[prop]+' ' ;
		newElement.innerHTML = ' '+prop+'='+radioCurrent[prop]+' ' ;
                newElement.setAttribute('class',className);
		//text += '<a id=' + elementId + prop  + '  data-src=0 class=' + className + '>  #' + prop + ':<code>' + radioCurrent[prop] + '</code></a>';
		//text += '<a id=' + elementId + prop  + '  data-src=0 class=' + className + '>  #' + prop + ':<code>' + radioCurrent[prop] + '</code></a>';
              //if (element) { element.appendChild(newElement); }
            //console.log( 'update: ' +prop+': ' +this[prop]);
	} 
       }
       var array = nmp.storage.radio.name;
       var objects = JSON.parse(localStorage.getItem(array));
       var newElement = document.createElement("a");
       text += ' - arrayname='+nmp.storage.radio.name+': ';
       if (nmp.storage.ok()) {text += ' - '+nmp.storage.radio.name+'.count='+objects.length;}
       text += " updatevalidator?" +updateValidator() ;
       text += " nmp.storage.ok?" +nmp.storage.ok() ;
       text += " -  nmp.app.version=" +nmp.app.version ;
       nmp.storage.status = text;
       //newElement.innerHTML = text;
       //newElement.setAttribute('class',className);
       //if (element) { element.appendChild(newElement); }
   //fxosnetzradio.localstorage.status = text;
   //text += " updatevalidator=" +updateValidator() ;
   //text += " fxosnetzradio.browserdb.ok=" +fxosnetzradio.browserdb.ok() ;
   //if (element) { element.textContent = text; }
}


nmp.storage.current.set = function (obj,desc) {
  console.log( 'nmp.storage.current.set request' +JSON.stringify(obj)+' requestor='+desc);
  nmp.storage.currentSet(obj);
}

nmp.storage.currentSet = function (obj) {
   var array = nmp.storage.current.name;
   var oldObjects = JSON.parse(localStorage.getItem(array));
   var current = nmp.storage.currentGet ();
   console.log( 'nmp.storage.currentSet');
   console.log( 'nmp.storage.currentSet request' +JSON.stringify(obj));
   if (nmp.storage.current.valid (obj)) {
     console.log( 'nmp.storage.currentSet objectvalid request' +JSON.stringify(obj));
     for (var i in nmp.storage.current.field) {
      for (var prop in current) {
         if (current.hasOwnProperty(prop)) {
	    if ( prop == nmp.storage.field[i]){
                //console.log('nmp.storage.currentSet.current ' +prop+'='+current[prop]+' '+nmp.storage.field[i]);
            //console.log('nmp.storage.currentSet.request ' +prop+'='+obj[prop]);
      //console.log('nmp.storage.currentSet: '+i+'=' +nmp.storage.field[i]);
               if (typeof obj[prop] !== 'undefined' && obj[prop] !== null) {
		//current[prop] = obj[prop];
                //console.log('nmp.storage.currentSet.new ' +prop+'='+current[prop]);
	       }
	    }
         }
       }
     }
     if (obj.volume <= 1 && obj.volume > 0) {obj.volume = Math.round(obj.volume*1000)/1000;}
     //obj.volume = Math.round(obj.volume*1000)/1000;
     var newObjects = [];
     newObjects.push(obj);
     localStorage.removeItem(array);
     localStorage.setItem(array, JSON.stringify(newObjects));
     console.log( 'nmp.storage.currentSet objectvalid request' +JSON.stringify(obj));
     return;
   }
   if (!nmp.storage.current.valid (obj)) {
      for (var i in nmp.storage.field) {
         if (typeof obj[nmp.storage.field[i]] == 'undefined'){obj[nmp.storage.field[i]]  = 'n/a';}
      }
   console.log( 'nmp.storage.currentSet objectinvalid request' +JSON.stringify(obj));
   }
   if (!nmp.storage.current.valid (obj) && current) {
      var newObjects = [];
      for (var prop in current) {
         if (current.hasOwnProperty(prop) && current[prop] !== "n/a" ) {
          //console.log( 'nmp.storage.currentSet objectinvalid request' +JSON.stringify(obj));
	  //obj[prop] = current[prop];
         }
      }
         newObjects.push(obj);
         //localStorage.removeItem(array);
         //localStorage.setItem(array, JSON.stringify(newObjects));
   console.log( 'nmp.storage.currentSet objectinvalid request' +JSON.stringify(obj));
   console.log( 'nmp.storage.currentSet objectinvalid current' +JSON.stringify(current));
   }
   if (!nmp.storage.current.valid (obj) && !nmp.storage.current.valid (current)) {
      var newObj = {};
      for (var i in nmp.storage.field) {
	 if (typeof newObj[nmp.storage.field[i]] == 'undefined'){newObj[nmp.storage.field[i]]  = 'n/a';}
      }
      var newArray = [];
      newArray.push(newObj);
      localStorage.removeItem(array);
      localStorage.setItem(array, JSON.stringify(newArray));	
   }
   if (oldObjects) {
      //console.log( 'nmp.storage.currentSet: ' + nmp.storage.name+' found');
      var oldObject = oldObjects[0];
      if (typeof oldObject !== 'undefined' && oldObject !== null) {
      //console.log( 'nmp.storage.currentSet: ' + nmp.storage.name+'[0] found');
         var newObjects = [];
         var newObject = obj;
         for (var i in nmp.storage.field) {
	       if (typeof newObject[nmp.storage.field[i]] == 'undefined' || newObject[nmp.storage.field[i]] == null ){
	    newObject[nmp.storage.field[i]] = oldObject[nmp.storage.field[i]];
	       }
	    //if (newObject[nmp.storage.field[i]] !== oldObject[nmp.storage.field[i]]){
	    //}
            //console.log('nmp.storage.currentSet: ' + newObject[nmp.storage.field[i]]);
            //console.log('nmp.storage.currentSet:  '+oldObject[nmp.storage.field[i]]);
	    }
         //newObjects.push(newObject);
         //localStorage.removeItem(array);
         //localStorage.setItem(array, JSON.stringify(newObjects));
	 }
	 else {
     	    var newObjects = [];
            var newObject = oldObject;
            for (var prop in obj) {
              if (obj.hasOwnProperty(prop) && prop == "view" ) { newObject[prop] = obj[prop]; }
              if (obj.hasOwnProperty(prop) && prop == "volume" ) { newObject[prop] = obj[prop]; }
	    }
            newObjects.push(newObject);
            //localStorage.removeItem(array);
            //localStorage.setItem(array, JSON.stringify(newObjects));
            //console.log( 'nmp.storage.currentSet.view='+newObject[prop]);
	 }
        console.log('currentSet: '+JSON.stringify(newObject));
  }
  }; 



nmp.storage.current.reset = function () {
         console.log( 'nmp.storage.current.reset');
         var array = nmp.storage.current.name;
         var newObj = {};
         var newArray = [];
         for (var i in nmp.storage.current.field) { newObj[nmp.storage.current.field[i]]  = 'n/a'; }
	 newObj.view="settings";
	 newObj.store="storage";
	 newObj.volume=0.5;
	 newObj.vibrate="false";
         newArray.push(newObj);
         localStorage.removeItem(array);
         console.log( 'nmp.storage.current.reset new: ' +JSON.stringify(newArray));
         localStorage.setItem(array, JSON.stringify(newArray));	
         nmp.audio.volume ("0.5");
}; 


nmp.storage.currentGet = function (e){
   var array = nmp.storage.current.name;
   var objects = JSON.parse(localStorage.getItem(array));
   //console.log( 'nmp.storage.currentGet');
     //console.log( 'nmp.storage.currentGet 0 ' +JSON.stringify(objects));
   if (objects) {
     var obj = objects[0];
     if (typeof obj == 'undefined' || obj == null) {
        //console.log( 'current get: obj undefined');
	var newObj = {};
        for (var i in nmp.storage.field) { newObj[nmp.storage.field[i]]  = 'n/a'; }
        var newArray = [];
        //newArray.push(newObj);
        //localStorage.removeItem(array);
        //localStorage.setItem(array, JSON.stringify(newArray));
        nmp.storage.current.reset();	
        return newObj;
        //return nmp.storage.currentGet();
     }
     if (obj) {
     //console.log( 'nmp.storage.currentGet 1 ' +JSON.stringify(obj));
        if (!nmp.storage.current.valid (obj)) { 
           for (var i in nmp.storage.current.field) {
	      if (typeof obj[nmp.storage.current.field[i]] == 'undefined'){obj[nmp.storage.current.field[i]]  = 'n/a';}
           }
           if (obj.volume == "n/a"){obj.volume = 0.5;}
	   obj.store = "storage";
	   obj.view = "settings";
           //console.log( 'nmp.storage.currentGet objectinvalid return 2 ' +JSON.stringify(obj));
	   return obj;
        } 
     }
     if (obj) {
        if (nmp.storage.current.valid (obj)) { return obj; } 
     }
     if (!obj) {
        var newObj = {};
        for (var i in nmp.storage.field) { newObj[nmp.storage.field[i]]  = 'n/a'; }
           //console.log( 'nmp.storage.currentGet objectinvalid return' +JSON.stringify(newObj));
        return newObj;
     }
   }
   else {
        var newObj = {};
        for (var i in nmp.storage.field) { newObj[nmp.storage.field[i]]  = 'n/a'; }
           //console.log( 'nmp.storage.currentGet objectinvalid return' +JSON.stringify(newObj));
        return newObj;
   }
};

nmp.storage.current.updateField = function (fieldname,field,desc){
  var current = nmp.storage.currentGet ();
  if (typeof current !== 'undefined' && current !== null && fieldname && field && desc) {
    console.log( 'nmp.storage.current.updateField request ' +fieldname+ '='+field+' requestor='+desc);
    for (var i in nmp.storage.current.field) {
      if (current.hasOwnProperty(nmp.storage.current.field[i])&&nmp.storage.current.field[i] == fieldname) {
	   current[nmp.storage.current.field[i]] = field;
           nmp.storage.current.set(current,desc); 
      }
    }
  }
};


nmp.storage.current.updateRadio = function (obj,desc) {
  var current = nmp.storage.currentGet ();
  if (typeof current !== 'undefined' && current !== null && nmp.app.radio.valid(obj) && desc) {
    console.log( 'nmp.storage.current.update request ' +JSON.stringify(obj)+' requestor='+desc);
    for (var i in nmp.storage.current.field) {
      for (var j in nmp.app.radio.field) {
        if (obj.hasOwnProperty(nmp.storage.current.field[i])&&obj.hasOwnProperty(nmp.app.radio.field[j]) ) {
	  if (obj[nmp.storage.current.field[i]] !== "n/a") { 
	    current[nmp.storage.current.field[i]] = obj[nmp.storage.current.field[i]];
          }
        }
      }
    }
  }
  nmp.storage.current.set(current); 
};





//fxosnetzradio.localstorage.currentUpdate(objId,objStore);
nmp.storage.currentUpdate = function (objId,objStore) {
   //var obj = [];
   var obj = {};
   var audio = document.querySelector("#audio");
   var current = nmp.storage.currentGet ();
   //if (audio) { current.volume = audio.volume; }
   if (nmp.db.ok() && objStore !== null && objId !== null && typeof objStore !== 'undefined' && typeof objId !== 'undefined'){
      var db = nmp.db.db;
      var store = db.transaction(objStore).objectStore(objStore);
      var request = store.get(objId);
      request.onsuccess = function(e) {
         obj  = e.target.result;
            console.log('nmp.storage.currentUpdate: obj found: '+JSON.stringify(obj));
         if (obj == null) {
            console.log("obj not found: ",key,objStore);
         }
         else {
            var current = nmp.storage.currentGet ();
            var audio = document.querySelector("#audio");
            //if (audio) { obj.volume = audio.volume; }
	    obj.store="db";
            for (var prop in obj) {
               for (var i in nmp.app.radio.field) {
	          if ( prop == nmp.app.radio.field[i]){		
		     if (obj.hasOwnProperty(prop)) { current[prop] = obj[prop]; } 
                  }
               }
            }
            if (nmp.storage.current.valid(current) == true) { 
               console.log('nmp.storage.currentUpdate: '+JSON.stringify(current));
	       nmp.storage.currentSet(current); 
	    }
         }
      }
  }
   //var newObjStr=JSON.stringify(current);
   //console.log('currentUpdate: '+newObjStr);
   //if (nmp.storage.currentobjectValid(current)) { nmp.storage.currentSet(current); }
};






fxosnetzradio.localstorage.radioCurrentSet = function(src,desc,www,format,objectOwner) {
// select radio
    //var radioListSelect = document.querySelector("#radioListSelect"),
  	//radioListSelection = radioListSelect.selectedIndex,
    var audio = document.querySelector("#audio");
    var	radioCurrentArray = JSON.parse(sessionStorage.getItem("nmp.storage.current.name"));
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
	localStorage.removeItem("nmp.storage.current.name");
	localStorage.setItem("nmp.current.storage.name", JSON.stringify(myArrayObject));
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
      if (nmp.storage.currentGet().volume <= 1 && nmp.storage.currentGet().volume > 0) {audio.volume = nmp.storage.currentGet().volume;}
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

nmp.storage.init= function(e) {
   var array = nmp.storage.current.name;
   var objects = JSON.parse(localStorage.getItem(array));
   var desc = "nmp.storage.init:"+array;
   console.log( 'storage init');
   if (!objects) {
      console.log( 'storage init: no objects arrayname='+array);
      var newObj = {};
      for (var i in nmp.storage.field) {
	 if (typeof newObj[nmp.storage.field[i]] == 'undefined'){newObj[nmp.storage.field[i]]  = 'n/a';}
      }
      var newArray = [];
      newArray.push(newObj);
      //localStorage.removeItem(array);
      //localStorage.setItem(array, JSON.stringify(newArray));
      nmp.storage.current.reset();	
   }
   if (objects) {
     console.log( 'storage init: objects array='+array);
     var obj = objects[0];
     if (typeof obj == 'undefined' || obj == null) {
        console.log( 'storage init: obj undefined');
	var newObj = {};
        for (var i in nmp.storage.field) { newObj[nmp.storage.field[i]]  = 'n/a'; }
        var newArray = [];
        newArray.push(newObj);
        //localStorage.removeItem(array);
        //localStorage.setItem(array, JSON.stringify(newArray));	
        nmp.storage.current.set(newObj); 
     }
     if (obj) {
        console.log( 'storage init: obj defined');
        for (var i in nmp.storage.field) {
	   if (typeof obj[nmp.storage.field[i]] == 'undefined'){obj[nmp.storage.field[i]]  = 'n/a';}
        }
        var newArray = [];
        newArray.push(obj);
        //localStorage.removeItem(array);
        //localStorage.setItem(array, JSON.stringify(newArray));	
        nmp.storage.current.set(obj,desc); 
     }
  }
};


nmp.storage.init2= function(e) {
   var array = nmp.storage.radio.name;
   var objects = JSON.parse(localStorage.getItem(array));
   if (!objects) {
      console.log( 'nmp.storage.init2: no objects arrayname='+array);
      var newArray = [];
      var newObj = {};
      for (var i in nmp.app.radio.readonlyObj) {
        newArray.push (nmp.app.radio.readonlyObj[i]);
      }
      //localStorage.removeItem(array);
      //localStorage.setItem(array, JSON.stringify(newArray));
      //nmp.storage.current.reset();	
      console.log( 'nmp.storage.init2: no objects current reset comment out 26.12.2016');
   }
   if (objects) {
     console.log( 'nmp.storage.init2: objects');
     var obj = objects[0];
     if (typeof obj == 'undefined' || obj == null) {
        console.log( 'storage init: obj undefined');
	var newObj = {};
        for (var i in nmp.storage.field) { newObj[nmp.storage.field[i]]  = 'n/a'; }
        var newArray = [];
        newArray.push(newObj);
      //localStorage.removeItem(array);
      //localStorage.setItem(array, JSON.stringify(newArray));	
        nmp.storage.current.set(newObj); 
     }
     if (obj) {
        console.log( 'storage init: obj defined');
        for (var i in nmp.storage.field) {
	   if (typeof obj[nmp.storage.field[i]] == 'undefined'){obj[nmp.storage.field[i]]  = 'n/a';}
        }
        var newArray = [];
        newArray.push(obj);
        //localStorage.removeItem(array);
        //localStorage.setItem(array, JSON.stringify(newArray));	
        nmp.storage.current.set(obj); 
     }
  }
  for (var i in nmp.app.radio.readonlyObj) {
      //nmp.storage.radio.objectAdd(nmp.app.radio.readonlyObj[i]);
      console.log( 'nmp.storage.init2: comment out object add problem 26.12.2016 '+i);
  }
};


