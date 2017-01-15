

//var obj = new fxosnetzradio.browserdb.radio("",owner.value,src.value,desc.value,www.value,format.value,"","");
fxosnetzradio.browserdb.radio = function (objId,objOwner,src,desc,www,format,usageCounter,lastUsed){
   this.objId=objId;
   this.objOwner=objOwner;
   this.src=src;
   this.desc=desc;
   this.www=www;
   this.format=format;
   this.usageCounter=usageCounter;
   this.lastUsed=lastUsed;
}

const radioData = [
  { objId: "1", src: "http://radio.hbr1.com:19800/tronic.ogg", desc: "hbr1 tronic", www: 'http://www.hbr1.com/', format: "OGG", objOwner: "biermann" },
  //{ src: "http://stream2.stadtfilter.net:8406/stadtfilter.opus.m3u", desc: "Stadtfilter", www: 'http://www.stadtfilter.ch/', format: "OPUS", objectOwner: "biermann", timeStamp: 5 },
  //{ src: "http://stream2.stadtfilter.net:8406/stadtfilter.ogg", desc: "Stadtfilter", www: 'http://www.stadtfilter.ch/', format: "OGG", objectOwner: "biermann", timeStamp: 4 },
  //{ src: "http://stream.stadtfilter.net:8000/;stream/1", desc: "Stadtfilter", www: 'http://www.stadtfilter.ch/', format: "shoutcast", objectOwner: "biermann", timeStamp: 3 },
  { src: "http://stream-4.ssatr.ch:80/virus/mp3", desc: "virus", www: "http://www.virus.ch/", format: "MP3", objOwner: "biermann" },
  { src: "http://radio1190.colorado.edu:8000/low.ogg", desc: "Radio 1190", www: "http://www.radio1190.org/", format: "OGG", objOwner: "biermann" },
  { src: "http://88.198.34.209:13128/nometa.ogg", desc: "DNBRadio", www: 'http://dnbradio.com/', format: "OGG", objOwner: "biermann" }
];







nmp.db.open = function() {
    console.log("nmp.db.open");
  if (!window.indexedDB) {
    //window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    var result = nmp.storage.current.updateField('storePrefered',"storage",'no indexedb store prefered storage update 5478432');
  }
  else {
    var openRequest = window.indexedDB.open(nmp.db.radio.name, nmp.db.version);
    var updateStr = "db.open.";
    console.log("nmp.db.open:"+nmp.db.radio.name+' '+nmp.db.version);

  openRequest.onupgradeneeded = function(evt) {
    var db = evt.target.result;
     console.log('db upgrade ', evt);
     console.log('db.version=',db.version);
     console.log('version.needed=',nmp.db.version);

  



  if(db.objectStoreNames.contains(nmp.db.radio.name)) {
     var store = evt.currentTarget.transaction.objectStore(nmp.db.radio.name);
     if(!store.keyPath.contains('objId')) {
        console.log('wrong keyPath-delete objStore',evt);
    	db.deleteObjectStore(nmp.db.radio.name);
     }
  }

  if(db.objectStoreNames.contains(nmp.db.radio.name)) {
     console.log('upgrade needed und  db exist', evt);
     var store = evt.currentTarget.transaction.objectStore(nmp.db.radio.name);
     for (var i in nmp.db.radio.field) {
     	if (!store.indexNames.contains(nmp.db.radio.field[i])){
     	   store.createIndex(nmp.db.radio.field[i],nmp.db.radio.field[i], { unique: false })
        }
     }
  }

   if(!db.objectStoreNames.contains(radioDBstore)) {
     console.log('upgrade needed und  db does not exist', evt);
     var store = db.createObjectStore(radioDBstore, {keyPath: "objId"});
     for (var i in nmp.db.radio.field) {
       store.createIndex(nmp.db.radio.field[i],nmp.db.radio.field[i], { unique: false })
     }
   console.log('Datenbank angelegt', evt);
   }
    
    //var trans = db.transaction([radioDBstore], "versionchange");
   // var trans = db.transaction([radioDBstore]);
    //var store = trans.objectStore(radioDBstore);
    //console.log('Datenbank angelegt', e);
    //var db = evt.target.result;
    // A versionchange transaction is started automatically.
    //evt.target.transaction.onerror = fxosnetzradio.browserdb.onerror;
   

     console.log('db upgrade end', evt);

  };
  openRequest.onsuccess = function(event) {
    console.log('Datenbank geöffnet');
    nmp.db.db = event.target.result;
    //fxosnetzradio.browserdb.db = event.target.result;
    nmp.db.statusSet ();
    var result = nmp.storage.current.updateField('storePrefered',"db",'openrequest onsuccess store prefered update 86478432');
    //var trans = fxosnetzradio.browserdb.db.transaction([radioDBstore], "readwrite");
    //var store = trans.objectStore(radioDBstore);
    //fxosnetzradio.browserdb.radioAdd(fxosnetzradio.radioData);
    //var db = fxosnetzradio.browserdb.db;
    for (var i in nmp.app.radio.readonlyObj) {
     //console.log('radio add:',i, event,nmp.db.radio.readonlyObj[i]);
      //radioData[i].timeStamp =  new Date().getTime();
      nmp.db.objectAdd (nmp.app.radio.readonlyObj[i]);
      //var request = store.put(radioData[i]);
    }
//fxosnetzradio.browserdb.myradio = new fxosnetzradio.browserdb.radio( "","biermann","http://internationalradiofestival.ice.infomaniak.ch/radio-live.mp3",  "IRF", "http://www.internationalradiofestival.com",  "MP3", "" ,"" );
    //fxosnetzradio.browserdb.objectAdd (fxosnetzradio.browserdb.db,fxosnetzradio.browserdb.myradio);
    //fxosnetzradio.browserdb.getAllTodoItems();
  };
  openRequest.onerror = function(e) {
      console.log("Database error: " + e.target.errorCode);
    updateStr += 'onerror: ' +openRequest.errorCode ;
    //nmp.db.statusupdate (updateStr);
    alert("db open error");
  };
  openRequest.onblocked = function(event) {

    // If some other tab is loaded with the database, then it needs to be closed
    // before we can proceed.
    alert("Please close all other tabs with this site open!");
  };
}

};

fxosnetzradio.browserdb.ok = function () {
	nmp.db.ok();
};

nmp.db.ok = function () {
  var result=false;
  var db = nmp.db.db;
  if (typeof db !== 'undefined' && db !== null && db.objectStoreNames.contains(nmp.db.radio.name) ) {
     result = true;
  }
  //console.log("browserdb.ok?" +result);
  return result;
};


nmp.db.readOnly = function (descriptor,obj) {
  var result=false;
  for (var i in nmp.db.radio.readonlyObjOwner) {
    if ((descriptor == "edit" || descriptor == "delete") && obj.objOwner == nmp.db.radio.readonlyObjOwner[i]) {
	result = true
    }
  }
return result;
};


nmp.db.statusSet = function () {
	fxosnetzradio.browserdb.statusSet ();
};



fxosnetzradio.browserdb.statusSet = function () {
   var db = nmp.db.db;
   var 	currentdate = new Date(); 
   var text = "";
   text +=  currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + " ";
   if (db !== 'undefined' && db !== null && nmp.db.ok()){
      if (db.objectStoreNames.contains(radioDBstore)){
         var trans = db.transaction([radioDBstore], "readonly");
    	 var store = trans.objectStore(radioDBstore);
         var request = store.count();
         request.onsuccess = function(e) {
	    var test = nmp.db.status;
	    text += 'db.version='+db.version;
	    text += ' db.name='+db.name+' ';
	    text += nmp.db.radio.name+ '.count='+request.result ;
	    text += ' '+nmp.db.radio.name+'.index.count='+store.indexNames.length;
            nmp.db.status = text;
          }
          request.onerror = function(e) {
	     var test = fxosnetzradio.browserdb.status;
	     text += 'onerror' +request ;
	     nmp.db.status = text;
          }
      }
   }
     else {  
        if (!window.indexedDB) {
    	   text += "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.";
    	}
	text += 'no db';
	nmp.db.status = text;
     }
}

fxosnetzradio.browserdb.objectDel = function(key,objStore) {
	nmp.db.objectDel (key,objStore); 
};

nmp.db.radio.objectDel = function (key) {
  var db = nmp.db.db;
  nmp.db.objectDel (key,db); 
}

nmp.db.objectDel = function(key,objStore) {
   if (nmp.db.ok() && objStore && key){
      var db = nmp.db.db;
      var trans = db.transaction([objStore], "readwrite");
      var store = trans.objectStore(objStore);
      console.log(objStore+ "readwrite");
      var request = store.delete(key);
      request.onsuccess = function(e) {
         console.log("Success Deleting: ",key,objStore,e);
         update();
      };
      request.onerror = function(e) {
         console.log("Error Deleting: ",key,objStore,e);
      };
   };
};


//fxosnetzradio.browserdb.objectUpdateStats(row.objId,objStore);
nmp.db.objectUpdateStats = function(key,objStore,desc) {
  if (nmp.db.ok() && objStore !== null && key !== null && desc){
    console.log( 'nmp.storage.current.objectUpdatestat request key='+key+' store='+objStore+' requestor='+desc);
      //var db = fxosnetzradio.browserdb.db;
      //var store = db.transaction(objStore, "readwrite").objectStore(objStore);
      var db = nmp.db.db;
      var trans = db.transaction(objStore, "readwrite");
      var store = trans.objectStore(objStore);

   //var transaction = db.transaction("radios", "readwrite");
   //var store = transaction.objectStore("radios");
   //var range = IDBKeyRange.only(key);
//var index = store.index("id");
      var obj;	
      console.log(objStore+ "readwrite");
      //var myKey = JSON.stringify(key);
      var myKey = key;
      var request = store.get(myKey);
      //store.get(key).onsuccess = function(event) {
      //index.get(range).onsuccess = function(event) {
      request.onsuccess = function(e) {
          obj  = e.target.result;
      if (obj == null) {
            console.log("obj not found: "+key+objStore+' requestor='+desc);
      }
      else {
            console.log(objStore+key+" obj get found counter="+obj.usageCounter+" lastUsed="+obj.lastUsed+' requestor='+desc);
            obj.lastUsed=new Date().getTime();
            if (obj.usageCounter ) { obj.usageCounter = obj.usageCounter + 1;}
            if (!obj.usageCounter ) { obj.usageCounter = 1;}
            //if (obj.counter) { obj.counter++;}
	    var request = store.put(obj);
            request.onsuccess = function(e) {
              //console.log("object update: ",key,obj,objStore,e);
            console.log('store='+objStore+' key='+key+" obj put counter="+obj.usageCounter+" lastUsed="+obj.lastUsed+' requestor='+desc);
              //update();
            };
            request.onerror = function(e) {
               console.log("Error object update: ",key,objStore,e+' requestor='+desc);
            };
      }
      };
   };
};


nmp.db.radio.objectToggleFav = function (key,desc) {
  if (nmp.db.ok() && key !== null && desc){
    var db = nmp.db.db;
    var objStore = nmp.db.radio.name
    var obj = {};
    var store = db.transaction(objStore, "readwrite").objectStore(objStore);
    var request = store.get(key); 
    console.log( 'nmp.db.objectToggleFav request key='+key+' store='+objStore+' requestor='+desc);
    request.onsuccess = function(e) {
      obj  = e.target.result;
      if (obj == null) {
        console.log("nmp.db.objectToggleFav error "+key+objStore+' requestor='+desc);
      }
      else {
        var newObj = {};
        for (var i in nmp.db.radio.field) {
          if (typeof obj[nmp.db.radio.field[i]] == 'undefined'){obj[nmp.db.radio.field[i]]  = 'n/a';}
        }
        for (var i in nmp.db.radio.readonlyObjOwner) {
          if (obj.objOwner == nmp.db.radio.readonlyObjOwner[i]) { obj.fav = 'n/a' }
        }
        for (var prop in obj) {
          newObj[prop] = obj[prop];
          console.log('nmp.db.objectToggleFav ' +prop+': ' +obj[prop]+' requestor='+desc);
          if (obj.hasOwnProperty(prop) && prop == 'fav' && obj[prop] == "true") {
            newObj[prop] = "false";
            console.log('nmp.db.objectToggleFav ' +prop+'->' +obj[prop]+newObj[prop]+' requestor='+desc);
          }
          if (obj.hasOwnProperty(prop) && prop == 'fav' && obj[prop] == "false") {
            newObj[prop] = "true";
            console.log('nmp.db.objectToggleFav ' +prop+'->' +obj[prop]+newObj[prop]+' requestor='+desc);
          }
        }
        if (obj.fav == "n/a") { 
          newObj.fav = "true"; 
          //newObj.objId =  JSON.stringify(new Date().getTime());
          newObj.objId = nmp.db.radio.objectChecksum(obj)
    	  newObj.objOwner =  "browser";
          console.log('nmp.db.objectToggleFav ' +obj.fav+' '+newObj.fav+newObj.objId+newObj.objOwner);
          nmp.db.radio.objectAdd(newObj);
          nmp.storage.current.updateField('objId',newObj.objId,'nmp.db.objectToggleFav');
        }
        if (obj.fav != 'n/a') { var request = store.put(newObj) }
      }
    }
  }
}


//fxosnetzradio.browserdb.objectGet (key,objStore)
//to delete
fxosnetzradio.browserdb.objectGet = function(key,objStore) {
      var obj = [];	
   if (fxosnetzradio.browserdb.ok() && objStore !== null && key !== null){
      var db = nmp.db.db;
     var store = db.transaction(objStore).objectStore(objStore);
      var request = store.get(key);
      request.onsuccess = function(e) {
         obj  = e.target.result;
        if (obj == null) {
           console.log("obj not found: ",key,objStore);
        }
        else {
        }
      }
   };
   //return obj;
};





















fxosnetzradio.browserdb.onerror = function (e) {
    var updateStr = "onerror: ";
    fxosnetzradio.browserdb.statusupdate (updateStr);
    alert("Database error: " + e.target.errorCode);
    console.log('fxosnetzradio.browserdb.onerror: ',e);
};



//fxosnetzradio.browserdb.statusupdate (test);
fxosnetzradio.browserdb.statusupdate = function (eventDescription) {
        var	radioCurrent = fxosnetzradio.localstorage.currentGet ();
	var	elementId = 'fxosnetzradio.view.middle';
	var	className = 'fxosnetzradio.view';
	var	view = 'admin';
	if (updateValidator() && fxosnetzradio.browserdb.ok() && radioCurrent.view){
		view = radioCurrent.view;
		if (radioCurrent.view == "admin"){
			elementId = 'fxosnetzradio.view.middle';
			className = 'fxosnetzradio.view';
			view = 'admin';
		}
	}
	//var	element = document.getElementById(elementId);
        //var 	currentdate = new Date(); 
	//var	text = + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + ":" +elementId + ":" +view + ":";
	//text += ' ' + eventDescription + ' ';
    	//while (element.firstChild) {
  	//	element.removeChild(element.firstChild);
    	//}	
  	//var newElement = document.createElement("a");
	//newElement.innerHTML = text;
  	//newElement.setAttribute('class',className);
  	//element.appendChild(newElement);
  	//var newElement = document.createElement("a");
	//fxosnetzradio.browserdb.statusSet ();
	//newElement.innerHTML = fxosnetzradio.browserdb.status;
  	//newElement.setAttribute('class',className);
  	//element.appendChild(newElement);
};



//fxosnetzradio.browserdb.recentObjectAdd (obj);

fxosnetzradio.browserdb.recentObjectAdd = function (obj) {
  var db = nmp.db.db;
  if (fxosnetzradio.browserdb.ok()) {
    var trans = db.transaction([radioDBrecent], "readwrite");
    var store = trans.objectStore(radioDBrecent);
    obj.timeStamp =  new Date().getTime();
    var request = store.put(obj);
          request.onsuccess = function(e) {
            console.log('fxosnetzradio.browserdb.recentObjectAdd: onsuccess',e);
          };
          request.onerror = function(e) {
            console.log('fxosnetzradio.browserdb.recentObjectAdd: error',e);
          };
  } 
}
fxosnetzradio.browserdb.radioValid = function (obj) {
	nmp.db.radioValid (obj);
}

//if (fxosnetzradio.browserdb.radioValid(obj)) {
nmp.db.radioValid = function (obj) {
  var result=false;
  var resultCount=0;
  for (var prop in obj) {
     if (obj.hasOwnProperty(prop)) {
        resultCount++;
	if (prop == "src") {resultCount = resultCount +10;}
	if (prop == "objOwner") {resultCount = resultCount +100;}
	this[prop] = obj[prop];
        //console.log(resultCount+ 'fxosnetzradio.browserdb.objectAdd.obj.' +prop+': ' +this[prop]);
     } 
  } 
  if (resultCount > 113) {result = true;}
  else {result = false;console.log('obj validation: count='+resultCount +' '+result);}
  //console.log( 'nmp.db.radioValid '+result+' '+resultCount+' '+JSON.stringify(obj));
  return result;
};

nmp.db.radio.objectChecksum = function (obj){
  var keys = Object.keys(obj).sort();
  var output = [], prop;
  var output2 = ""
  for (var i = 0; i < keys.length; i++) {
    prop = keys[i];
    if (obj.hasOwnProperty(prop)){
    for (var j in nmp.db.radio.checksumField) {
      if (nmp.db.radio.checksumField[j] == prop){
        output.push(prop);
        output.push(obj[prop]);
        //output2 += JSON.stringify(prop) + JSON.stringify(obj[prop]) + "-"
        output2 += JSON.stringify(obj[prop]) 
        console.log(prop+obj[prop]+"<-checksum");
        console.log(output2+"<--checksum");
      }
    }}
  }
  var s = JSON.stringify(output2)
  var chk = 0x12345678;
  var len = s.length;
  console.log(s+"<---checksum");
  for (var i = 0; i < len; i++) {
      chk += (s.charCodeAt(i) * (i + 1));
  }

  return (chk & 0xffffffff).toString(16);

}

fxosnetzradio.browserdb.objectAdd = function (obj) {
	nmp.db.radio.objectAdd (obj);
};
nmp.db.objectAdd = function (obj) {
	nmp.db.radio.objectAdd (obj);
};
nmp.db.radio.objectAdd = function (obj) {
  var db = nmp.db.db;
  var objStore = nmp.db.radio.name
  if (nmp.db.ok() && nmp.db.radioValid(obj)) {
    var store = db.transaction(objStore, "readwrite").objectStore(objStore);
    var request = store.put(obj);
    request.onsuccess = function(e) {
      var result = e.target.result;
//      console.log("obj put:",result);
    }
    request.onerror = function(e) {
      var result = e.target.result;
      console.log('db obj add error:',result);
    }
  }
}




//fxosnetzradio.browserdb.objectAdd (fxosnetzradio.browserdb.db,fxosnetzradio.browserdb.myradio);
//fxosnetzradio.browserdb.objectAdd = function (db,obj) {
fxosnetzradio.browserdb.objectAddoos = function (obj) {
  var db = nmp.db.db;
  if (fxosnetzradio.browserdb.ok() && fxosnetzradio.browserdb.radioValid(obj)) {
    //var trans = db.transaction([radioDBstore], "readwrite");
    //var store = trans.objectStore(radioDBstore);
     var store = db.transaction(radioDBstore,"readwrite").objectStore(radioDBstore);
     for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          this[prop] = obj[prop];
          //console.log( 'fxosnetzradio.browserdb.objectAdd.obj.' +prop+': ' +this[prop]);
        } 
        } 
    var range ;
    //var keyRange = IDBKeyRange.only(obj.desc);
    //var singleKeyRange = IDBKeyRange.only("IRF");
    var index = store.index("srcIndex");
    if (obj.hasOwnProperty("src")) {range = IDBKeyRange.only(obj.src);}
    index.get(range).onsuccess = function(e) {
          //console.log(obj.desc+ ' get succes '+ request + e.target.result);
	  var result = e.target.result;
          //var jsonStr = JSON.stringify(result);
            //console.log("result  "+jsonStr);
      	  if (result == null) {
            //result.value = "employee not found";
  	    obj.objId =  JSON.stringify(new Date().getTime());
            var request = store.put(obj);
            console.log("result null for " +obj.desc +e.target.result);
      	  }
    };
    //index.onerror = function(e) {
  //	  obj.timeStamp =  new Date().getTime();
    //      var request = store.put(obj);
      //    request.onsuccess = function(e) {
        //    console.log('fxosnetzradio.browserdb.objectAdd: onsuccess',e);
         //   fxosnetzradio.browserdb.statusupdate (updateStr);
         //   fxosnetzradio.browserdb.getAllTodoItems();
        //  };
        //  request.onerror = function(e) {
        //    fxosnetzradio.browserdb.statusupdate (updateStr);
        //    console.log('fxosnetzradio.browserdb.objectAdd: error',e);
        //  };
    //fxosnetzradio.browserdb.statusupdate (updateStr);
      //    console.log( 'fxosnetzradio.browserdb.objectAdd: ' +prop+': ' +this[prop]);
   // };
    db.transaction(radioDBstore).objectStore(radioDBstore).get(obj.desc).onsuccess = function(event) {
      //console.log ("get onsuccess " +event + obj.desc   );
    };
    db.transaction(radioDBstore).objectStore(radioDBstore).get(obj.desc).onerror = function(event) {
      //console.log (obj.desc +" not found" );
    };


    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        this[prop] = obj[prop];
        //console.log( 'fxosnetzradio.browserdb.objectAdd: ' +prop+': ' +this[prop]);
      } 
    }
  update();

    } 

      };











//fxosnetzradio.browserdb.renderform ("fxosnetzradio.view.top");

fxosnetzradio.browserdb.renderform  = function (id) {
  var element = document.getElementById(id);
  var formname = id;
  var form = document.getElementById(id);
  var del = document.createElement("a");
  var pause = document.createElement("a");
  var www = document.createElement("input");
  var src = document.createElement("input");
  var button = document.createElement("input");
  var desc = document.createElement("input");
  var owner = document.createElement("input");
  //var format = document.createElement("select");
  var format = document.createElement("input");
  var updateStr = "";
  button.addEventListener("click", function(e) {
     var obj = new fxosnetzradio.browserdb.radio("",owner.value,src.value,desc.value,www.value,format.value,"","");
     //var obj = new fxosnetzradio.browserdb.radio(src.value,desc.value,www.value,format.value,owner.value);
     if (fxosnetzradio.browserdb.radioValid(obj)) {fxosnetzradio.browserdb.objectAdd (obj);}
  });
  var label = document.createElement('label');
  label.innerHTML = "Add a station ";
  form.appendChild(label);
  desc.type = "text";
  desc.placeholder = "name";
  desc.id = formname + ".desc";
  desc.name = "desc";
  desc.setAttribute('class','form');
  desc.defaultValue = "name";
  form.appendChild(desc);
  src.name = "src";
  src.type = "url";
  src.placeholder = "http://88.198.34.209:13128/nometa.ogg";
  src.defaultValue = "http://88.198.34.209:13128/nometa.ogg";
  src.setAttribute('class','form');
  form.appendChild(src);
  www.type = "url";
  www.name = "www";
  www.placeholder = "http://dnbradio.com/";
  www.defaultValue = "http://dnbradio.com/";
  www.setAttribute('class','form');
  form.appendChild(www);
  format.name = "format";
  format.id = formname + ".format";
  format.setAttribute('class','form');
  format.type = "hidden";
  format.value = "n/a" ;
  //var option = document.createElement('option');
  //option.innerHTML = "MP3" ;
  //option.name = formname + ".format";;
  //option.id = formname + ".format";;
  //option.value = "MP3" ;
  //option.type = "hidden";
  //option.setAttribute('name','format');
  //option.selected = true ;
  //form.appendChild(option);
  //format.appendChild(option);
  form.appendChild(format);
  var option = document.createElement('option');
  //option.innerHTML = "Ogg" ;
  //option.id = "Ogg" ;
  //option.value = "Ogg" ;
  //option.id = formname + ".format.Ogg";;
  //option.name = "format";
  //option.setAttribute('name','format');
  //option.setAttribute('type','hidden');
  //format.appendChild(option);
  //form.appendChild(format);
  owner.value = "browser";
  owner.type = "hidden";
  owner.name = formname + ".owner";
  owner.id = formname + ".owner";
  form.appendChild(owner);
  button.type = "submit";
  button.value = "Add";
  form.appendChild(button);
}


fxosnetzradio.browserdb.objectEdit = function (elementId,objId,objStore) {
	nmp.db.objectEdit (elementId,objId,objStore); 
};



nmp.db.objectEdit  = function (elementId,objId,objStore) {
   console.log('edit mode: ',elementId,objId,objStore);
  var element = document.getElementById(elementId);
  var formname = elementId;
  //var form = document.getElementById(elementId);
  var	className = 'fxosnetzradioview';
  var del = document.createElement("a");
  var pause = document.createElement("a");
  var www = document.createElement("input");
  var src = document.createElement("input");
  var button = document.createElement("input");
  var desc = document.createElement("input");
  var owner = document.createElement("input");
  //var format = document.createElement("select");
  var format = document.createElement("input");
  var updateStr = "";
  var oldObj = [];
  if (nmp.db.ok() && objStore !== null && objId !== null && typeof objStore !== 'undefined'){
    var db = nmp.db.db;
    var store = db.transaction(objStore).objectStore(objStore);
    store.get(objId).onsuccess = function(e) {
       oldObj  = e.target.result;
       if (oldObj == null) {
          console.log("obj not found: ",key,objStore);
       }
       else {
          var button = document.createElement("input");
          var form = document.createElement("form");
          var formId = elementId + "form";
          console.log('edit mode: ',oldObj);
          while (element.firstChild) {element.removeChild(element.firstChild);}	
          form.id = formId; 
          for (var prop in oldObj) {
             if (oldObj.hasOwnProperty(prop)) {
                //console.log('edit mode: ' +prop+': ' +oldObj[prop]);
                for (var i in nmp.db.radio.formField) {
	           if ( prop == nmp.db.radio.formField[i]){
        	      //console.log('edit mode: ' +prop+': ' +oldObj[prop]+nmp.db.radio.formField[i]);
  		      var newElement = document.createElement("input");
  		      newElement.dataset.this = oldObj[prop]; 
  		      newElement.dataset.view = view; 
  		      newElement.name = prop;
  		      newElement.defaultValue = oldObj[prop];
  		      newElement.id = elementId + prop; 
		      newElement.innerHTML = ' '+prop+'='+ oldObj[prop]+' ' ;
                      newElement.setAttribute('class',className);
                      newElement.setAttribute('form',formId);
  		      form.appendChild(newElement);
		   }
                } 
              } 
          } 
  	  button.type = "button";
          button.value = "Submit";
          button.setAttribute('form',formId);
          button.addEventListener("click", function(e) {
	     var form = document.getElementById(formId);
             var newObj = oldObj;
             for (var prop in form) {
                if (form.hasOwnProperty(prop)) {
		  newObj[form[prop].name]=form[prop].value;
		  console.log('edit mode: ' +prop+': '+form[prop].name+'='+form[prop].value);
		
	        }
             }

         var db = nmp.db.db;
         var store = db.transaction(objStore, "readwrite").objectStore(objStore);
	 var request = store.put(newObj);
         request.onsuccess = function(e) {
            console.log("obj put:");
	    update();
         };
         request.onerror = function(e) {
            console.log(e.value);
         };
         });
          form.appendChild(button);
	  element.appendChild(form);
	}
      }
   }
}






nmp.db.init= function(e) {
    nmp.db.open();
}

