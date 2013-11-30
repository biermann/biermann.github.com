

nmp.view.update = function (view) {
 //var elementId = "fxosnetzradio.view.top"; 
 var elementId = "nmpView"; 
 var element = document.getElementById(elementId);
 var className = nmp.view.class;
 var text = "";
 var current = nmp.storage.currentGet ();
 console.log("nmp.view.update request=",view);
 nmp.db.statusSet ();
 //updateControl ();
  if (view == "n/a") {view = "myfirst";}	
  if (view == "admin") {
    current.view = "admin";
    var result = nmp.storage.currentSet(current);
    element = document.getElementById(elementId);
    //while (element.firstChild) {
      //element.removeChild(element.firstChild);
    //} 
    var	element = document.getElementById(elementId);
    var currentdate = new Date(); 
    text = + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + ":" +elementId + ":" +view + ":";
    if (!window.indexedDB) {
    	text += "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.";
    }
    //text += " radioDBname:" +radioDBname;
    //text += " radioDBversion required:" +radioDBversion;
    //text += " radioDBstore:" +radioDBstore;
    //text += " updatevalidator: " +updateValidator() ;
    element.innerHTML =  text ;
    var button= document.createElement("button");
       button.innerHTML = "open db " + radioDBname + radioDBversion;
       button.addEventListener("click", function(e) {
         console.log(this.innerHTML);
         var request = indexedDB.open(radioDBname, radioDBversion);
	request.onerror = function(event) {
          button.innerHTML += " error";
          console.log('error' + event);
	};
	request.onsuccess = function(event) {
          var db = event.target.result;
          console.log('success' + event);
          button.innerHTML += " success - version: " +db.version;

	};
        request.onupgradeneeded = function(evt) {
          var db = evt.target.result;
          button.innerHTML += " onupgradeneeded" +evt +db.version;
          console.log('onupgradeneeded' + evt +db.version);

	};

       }, false);
     element.appendChild(button);

    }	
 
  var db = nmp.db.db;
      //console.log( 'view.update: ', view);

    if (view == "myfirst" && nmp.db.ok() ) {
    current.view = "myfirst";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      fxosnetzradio.view.renderAudioStatus (elementId);	
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.lowerBound(0);
      //var keyCount = store.count(keyRange);
      var cursorRequest = store.openCursor(keyRange);
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
           if(!!result == false) return;
    	   //console.log("fxosnetzradio.view.update: " ,view, result.value);
    	result.value.view = "myfirst" ;  
	fxosnetzradio.view.renderbutton(elementId,result.value,radioDBstore);
           result.continue();
      };
      fxosnetzradio.view.renderbuttonControl(elementId);
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	

    }


    if (view == "status") {
    current.view = "status";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      fxosnetzradio.view.renderAudioStatus (elementId);	
      nmp.view.renderBrowserdbStatus (elementId);	
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	
    }

    if (view == "settings") {
    current.view = "settings";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      nmp.view.renderStatus (elementId);	
      nmp.view.renderSettings (elementId);	
    }




    if (view == "list" && nmp.db.ok() ) {
      current.view = "list";
      var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      var store = db.transaction(nmp.db.radio.name).objectStore(nmp.db.radio.name);
      var keyRange = IDBKeyRange.lowerBound(0);
      var cursorRequest = store.openCursor(keyRange);
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
           if(!!result == false) return;
    	   console.log("fxosnetzradio.view.update: " ,view, result.value);
    	result.value.view = "list" ;  
	fxosnetzradio.view.renderlist(elementId,result.value,nmp.db.radio.name);
           result.continue();
      };
    }


    if (view == "edit" && fxosnetzradio.browserdb.ok() ) {
      current.view = "edit";
      var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.lowerBound(0);
      var cursorRequest = store.openCursor(keyRange);
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
           if(!!result == false) return;
    	   //console.log("fxosnetzradio.view.update: " ,view, result.value);
    	result.value.view = "edit" ;  
	fxosnetzradio.view.renderlist(elementId,result.value,radioDBstore);
           result.continue();
      };
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	
    }







    if (view == "recent" && fxosnetzradio.browserdb.ok()) {
    current.view = "recent";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      console.log(":fxosnetzradio.view.update: " ,current.view);
      while (element.firstChild) {
  	element.removeChild(element.firstChild);
      }	
      fxosnetzradio.view.renderStatus (elementId);	
      fxosnetzradio.view.renderAudioStatus (elementId);	
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.upperBound(new Date().getTime());
      var index = store.index("lastUsedIndex");
      var cursorRequest = index.openCursor(keyRange);
      //var store = db.transaction(radioDBrecent).objectStore(radioDBrecent);
      //var keyRange = IDBKeyRange.only("http");
      //var keyRange = IDBKeyRange.upperBound(1);
      //var cursorRequest = store.openCursor(keyRange);
      //var cursorRequest = store.openCursor(keyRange.nextunique);
      var count = 0;
      cursorRequest.onsuccess = function(e) {
	   count++;
           var result = e.target.result;
           if(!!result == false) return;
    	   //console.log(":fxosnetzradio.view.update: ",count ,view, result.value);
    	result.value.view = "recent" ;  
	fxosnetzradio.view.renderlist(elementId,result.value,radioDBstore);
           result.continue();
      };
      fxosnetzradio.view.renderbuttonControl(elementId);
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	
    }

    if (view == "recent10" && fxosnetzradio.browserdb.ok()) {
    current.view = "recent10";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
    	   console.log(":fxosnetzradio.view.update: " ,current.view);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      fxosnetzradio.view.renderAudioStatus (elementId);	
      fxosnetzradio.view.renderbuttonControl(elementId);
      var trans = db.transaction([radioDBstore], "readonly");
      var store = trans.objectStore(radioDBstore);
      var keyRange = IDBKeyRange.upperBound(new Date().getTime());
      var index = store.index("lastUsedIndex");
      var cursorRequest = index.openCursor(keyRange);
      //var keyRange = IDBKeyRange.only("http*");
      //var keyRange = IDBKeyRange.lowerBound(new Date().getTime());
      //var keyRange = IDBKeyRange.lower);
      //var keyRange = IDBKeyRange.lowerBound(0);
      //var cursorRequest = store.openCursor(keyRange.prev);
      //var cursorRequest = store.openCursor(keyRange.nextunique);
      //var cursorRequest = store.openCursor(keyRange);
      //var cursorRequest = store.openCursor(keyRange.next);
      var count = 0;
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
	   count++;
           if(!!result == false ) return;
           if(count > 9) return;
    	   //console.log(":fxosnetzradio.view.update: ",count ,view, result.value);
    	result.value.view = "recent10" ;  
	//fxosnetzradio.view.renderlist(elementId,result.value,radioDBrecent);
	fxosnetzradio.view.renderbutton(elementId,result.value,radioDBstore);
           result.continue();
      };
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	
    }


    if (view == "biermann" && nmp.db.ok()) {
    current.view = "biermann";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      nmp.view.renderStatus (elementId);	
      //var store = db.transaction(nmp.db.radio.name).objectStore(nmp.db.radio.name);
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.only("biermann");
      var index = store.index("objOwner");
      var cursorRequest = index.openCursor(keyRange);
      var count = 0;
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
	   count++;
           if(!!result == false ) return;
    	result.value.view = "biermann" ;  
	nmp.view.renderbutton(elementId,result.value,radioDBstore);
           result.continue();
      };
      nmp.view.renderbuttonControl(elementId);
    }

    if (view == "audioogg" && fxosnetzradio.browserdb.ok()) {
    current.view = "audioogg";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.only("audioogg");
      var index = store.index("type");
      var cursorRequest = index.openCursor(keyRange);
      index.openCursor(keyRange).onsuccess = function(e) {
         var cursor = e.target.result;
         if (cursor) {
    	    cursor.value.view = "audioogg" ;  
	    fxosnetzradio.view.renderbutton(elementId,cursor.value,radioDBstore);
            cursor.continue();
         }
      };
      fxosnetzradio.view.renderbuttonControl(elementId);
    }


    if (view == "myRadio" && fxosnetzradio.browserdb.ok()) {
    current.view = "myRadio";
    var result = nmp.storage.currentSet(current);
    element = document.getElementById(elementId);
    console.log(":fxosnetzradio.view.update: " ,current.view);
    while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.only("browser");
      var index = store.index("objOwnerIndex");
      var cursorRequest = index.openCursor(keyRange);
      var count = 0;
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
	   count++;
           if(!!result == false ) return;
    	result.value.view = "myRadio" ;  
	fxosnetzradio.view.renderbutton(elementId,result.value,radioDBstore);
           result.continue();
      };
      fxosnetzradio.view.renderbuttonControl(elementId);
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	
    }


    if (view == "top" && fxosnetzradio.browserdb.ok()) {
    current.view ="top";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
    	   console.log(":fxosnetzradio.view.update: " ,current.view);
      while (element.firstChild) {
  	element.removeChild(element.firstChild);
      }
      fxosnetzradio.view.renderStatus (elementId);	
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.lowerBound(0);
      var index = store.index("usageCounterIndex");
      var cursorRequest = index.openCursor(keyRange);
      var count = 0;
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
	   count++;
           if(!!result == false ) return;
    	result.value.view = "top" ;  
	fxosnetzradio.view.renderbutton(elementId,result.value,radioDBstore);
	//fxosnetzradio.view.renderlist(elementId,result.value,radioDBstore);
           result.continue();
      }
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	
      nmp.view.renderBrowserdbStatus (elementId);	
    }









    if (view == "edit" && fxosnetzradio.browserdb.ok()) {
    current.view = "form";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) {element.removeChild(element.firstChild);}	
      fxosnetzradio.view.renderStatus (elementId);	
      fxosnetzradio.browserdb.renderform (elementId);
      var trans = db.transaction([radioDBstore], "readonly");
      var store = trans.objectStore(radioDBstore);
      var keyRange = IDBKeyRange.lowerBound(0);
      store.openCursor(keyRange).onsuccess = function(e) {
           var result = e.target.result;
           if(!!result == false) return;
    	result.value.view = "list" ;  
	fxosnetzradio.view.renderlist(elementId,result.value,radioDBstore);
           result.continue();
      };
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	
      nmp.view.renderBrowserdbStatus (elementId);	

    }






 
    if (view == "form" && fxosnetzradio.browserdb.ok()) {
    current.view = "form";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) {
  	element.removeChild(element.firstChild);
      }	
      fxosnetzradio.view.renderStatus (elementId);	
      fxosnetzradio.browserdb.renderform (elementId);
      var trans = db.transaction([radioDBstore], "readonly");
      var store = trans.objectStore(radioDBstore);
      var keyRange = IDBKeyRange.lowerBound(0);
      store.openCursor(keyRange).onsuccess = function(e) {
           var result = e.target.result;
           if(!!result == false) return;
    	result.value.view = "list" ;  
	fxosnetzradio.view.renderlist(elementId,result.value,radioDBstore);
           result.continue();
      };
      fxosnetzradio.view.renderLocalstorageStatus (elementId);	
      nmp.view.renderBrowserdbStatus (elementId);	

    }
}


fxosnetzradio.view.renderbuttonControl = function (id) {
	nmp.view.renderbuttonControl (id);
}

nmp.view.renderbuttonControl = function (id) {
   var element = document.getElementById(id);
   var audio = document.querySelector("#audio");
   var br = document.createElement("br");
   var volume = audio.volume;
   var volumeInteger = 0;
   if (volume) {
      volumeInteger = Math.ceil(volume * 100);
   }
    if (element && audio) {
      var playPause = document.createElement("button");
      var volumeUp = document.createElement("button");
      var volumeDown = document.createElement("button");
      var www = document.createElement("button");
       playPause.setAttribute('type','button');
       playPause.setAttribute('class',nmp.view.class);
       playPause.setAttribute('id','playPause');
       volumeDown.setAttribute('id','volumeDown');
       volumeDown.setAttribute('type','button');
       volumeDown.setAttribute('class',nmp.view.class);
       volumeUp.setAttribute('type','button');
       volumeUp.setAttribute('id','volumeUp');
       volumeUp.setAttribute('class',nmp.view.class);
       www.setAttribute('type','button');
       www.setAttribute('id','www');
       www.setAttribute('class',nmp.view.class);
       www.dataset.www = nmp.storage.currentGet().www;
       //www.innerHTML = fxosnetzradio.localstorage.currentGet().www; 
       www.innerHTML = "www"; 
       www.addEventListener("click", function(e) {
    	window.open(this.getAttribute('data-www'),'_blank');  		
       }, false);
       playPause.addEventListener("click", function(e) {
	  if (audio.paused || audio.ended){
             var a = audio.src.substr(0,20) ;
             var b = nmp.storage.currentGet().src.substr(0,20) ;
             if (a == b) {audio.play();} 
             updateControl ();
          }
          else	{
		audio.pause(); 
               updateControl ();
          }		
       }, false);
       volumeUp.addEventListener("click", function(e) {
          var volume = audio.volume;
	  volume = volume + 0.05;
	  if (volume >= 1) { volume = 0.99; }
	  audio.volume = volume;
          updateControl ();
       }, false);
       volumeDown.addEventListener("click", function(e) {
          var volume = audio.volume;
	  if (volume == 0.99) {volume = volume - 0.04;}
	  else {volume = volume - 0.05;}
	  if (volume <= 0.1) {volume = 0.1;}
	  audio.volume = volume;
          updateControl ();
       }, false);
       element.appendChild(br);
       element.appendChild(playPause);
       if (nmp.storage.currentGet().www) {
          element.appendChild(www);
       }
       element.appendChild(volumeDown);
       element.appendChild(volumeUp);
       updateControl ();
       }
} 


nmp.view.renderSettings = function (id) {
   var element = document.getElementById(id);
   var current = nmp.storage.currentGet ();
    if (element && updateValidator() ) {
       for (var i in nmp.app.settings) {
          var newElement = document.createElement("button");
          newElement.id = i ;
          if (nmp.app.settings[i] == "click") { newElement.innerHTML = i+' '+nmp.app.settings[i];}
          for (var prop in current) {
             if (current.hasOwnProperty(prop) && prop == i) {
		newElement.innerHTML = prop+'='+current[prop] ;
                newElement.dataset.prop = prop ;
                newElement.dataset.boolean = current[prop] ;
             }
             if (current[prop] == "true" && nmp.app.settings[i] == "boolean") { newElement.setAttribute('checked','checked');}
            //if (nmp.app.settings[i] == "boolean") { newElement.dataset.boolean = current[prop]; } 
          }
       		      if (nmp.app.settings[i] == "boolean") { 
		         newElement.addEventListener("click", function(e) {
	                    var current = nmp.storage.currentGet();
			    var temp = '' +this.getAttribute('data-boolean');
      			    if (temp == "false" ){ current[this.getAttribute('data-prop')] = "true";}
                            else { current[this.getAttribute('data-prop')] = "false"; } 
                        console.log( 'nmp.view.renderSettings ' +JSON.stringify(current));
			nmp.storage.currentSet(current);
			nmp.app.update();
    		         }, false);
		     }
      if (nmp.app.settings[i] == "click" && i == "reset") { 
         newElement.addEventListener("click", function(e) {
            nmp.storage.currentReset();
         }, false);
      }
      element.appendChild(newElement);
      }
   } 
}; 






fxosnetzradio.view.renderbutton = function (id,obj,objStore) {
	nmp.view.renderbutton (id,obj,objStore);
} 


nmp.view.renderbutton = function (id,obj,objStore) {
if (nmp.db.radioValid(obj) && obj.objId !== null) {
   var element = document.getElementById(id);

    if (element && obj && obj !== 'undefined' && obj !== null) {
      var button= document.createElement("button");
      var buttonId= "button"+obj.view+obj.objId;
      var row = obj;
      //console.log("fxosnetzradio.view.render: " ,id, object,fxosnetzradio.localstorage.currentGet());
       button.innerHTML = obj.desc;
       button.name = obj.desc;
       button.dataset.key = obj.objId; 
       button.dataset.src = obj.src; 
       button.dataset.desc = obj.desc; 
       button.dataset.store = objStore; 
       button.setAttribute('type','button');
       button.setAttribute('class',nmp.view.class);
       button.setAttribute('id',buttonId);
       if (obj.desc == nmp.storage.currentGet().desc) {

          button.setAttribute('checked','checked');
       }
       button.addEventListener("click", function(e) {
    //fxosnetzradio.browserdb.objectUpdateStats(row.objId,objStore);
         //fxosnetzradio.localstorage.currentSet(obj);
         nmp.storage.currentUpdate(this.getAttribute('data-key'),objStore);
         nmp.db.objectUpdateStats(this.getAttribute('data-key'),this.getAttribute('data-store'));
      nmp.audio.prepare(this.getAttribute('data-src'));
      nmp.audio.play(this.getAttribute('data-src'));
         nmp.app.updateControl ();
         nmp.app.update ();
       }, false);
       element.appendChild(button);
       }
} 
} 

fxosnetzradio.view.renderStatus = function (id) {
	nmp.view.renderStatus (id);
} 

nmp.view.renderStatus = function (id) {
  var element = document.getElementById(id);
  var current = nmp.storage.currentGet ();
  var a = document.createElement("a");
  var hr = document.createElement("hr");
  var p = document.createElement("p");
  var br = document.createElement("br");
  var span = document.createElement("span");
  a.textContent = "desc="+current.desc+" - view="+current.view;
  a.setAttribute('id','nmpViewStatus');
  a.setAttribute('class',nmp.view.class);
  element.appendChild(a);
  //element.appendChild(hr);
  element.appendChild(br);
}







fxosnetzradio.view.renderAudioStatus = function (id) {
  var element = document.getElementById(id);
  var a = document.createElement("a");
  var li = document.createElement("li");
  var hr = document.createElement("hr");
  var br = document.createElement("br");
  a.textContent = nmp.audio.status;
  a.setAttribute('id','radioStatus');
  a.setAttribute('class',nmp.view.class);
  element.appendChild(a);
  element.appendChild(br);
  li.appendChild(a);
  element.appendChild(li);
}

fxosnetzradio.view.renderLocalstorageStatus = function (id) {
  var element = document.getElementById(id);
  var a = document.createElement("a");
  var li = document.createElement("li");
  var hr = document.createElement("hr");
  var br = document.createElement("br");
  nmp.storage.statusSet ();
  a.setAttribute('id','localstorageStatus');
  a.setAttribute('class',nmp.view.class);
  element.appendChild(a);
  li.appendChild(a);
  element.appendChild(li);
}

nmp.view.renderBrowserdbStatus = function (id) {
  var element = document.getElementById(id);
  var a = document.createElement("a");
  var li = document.createElement("li");
  var hr = document.createElement("hr");
  var text = "";
  text += "" +nmp.db.status;
  text += " updatevalidator?" +updateValidator() ;
  text += " nmp.db.ok?" +nmp.db.ok() ;
  a.textContent = text;
  a.setAttribute('id','browserdbStatus');
  a.setAttribute('class',nmp.view.class);
  li.appendChild(a);
  element.appendChild(li);
}


fxosnetzradio.view.renderlist = function (id,obj,objStore) {
  var li = document.createElement("li");
  var del = document.createElement("a");
  var edit = document.createElement("a");
  var pause = document.createElement("a");
  var www = document.createElement("a");
  var src = document.createElement("a");
  var desc = document.createElement("a");
  var objOwner = document.createElement("a");
  var format = document.createElement("a");
  var usageCounter = document.createElement("a");
  var lastUsed = document.createElement("a");
  var objId = document.createElement("a");
  if (id !== null) {
    var element = document.getElementById(id);
    var radioListAll = element;
  }
  if (fxosnetzradio.browserdb.radioValid(obj) && id !== null) {
          for (var prop in obj) {
             if (obj.hasOwnProperty(prop)) {
                //console.log('edit mode: ' +prop+': ' +oldObj[prop]);
                for (var i in nmp.db.radio.formField) {
	           if ( prop == nmp.view.list[i]){
        	      //console.log('edit mode: ' +prop+': ' +oldObj[prop]+nmp.db.radio.formField[i]);
  		      var newElement = document.createElement("a");
  		      newElement.dataset.this = obj[prop]; 
  		      newElement.dataset.view = view; 
  		      newElement.name = prop;
  		      newElement.defaultValue = obj[prop];
  		      newElement.id = id + prop; 
		      newElement.innerHTML = obj[prop]+' ' ;
  		      li.appendChild(newElement);
		   }
                } 
              } 
          } 
    //console.log("fxosnetzradio.view.render: " ,id, obj);
    var row = obj;
    www.addEventListener("click", function(e) {
      window.open(obj.www,'_blank');
    }, false);
    pause.addEventListener("click", function(e) {
	if('vibrate' in navigator) {
         	navigator.vibrate(100);
	}
      audio.pause(); 
      //update();
      updateControl ();
    });
    src.addEventListener("click", function(e) {
      console.log('src click', e, this.innerHTML, this.getAttribute('data-key'),this.getAttribute('data-src'));
      //audio.setAttribute('src',this.getAttribute('data-src').toString());
      nmp.app.vibrate();
      nmp.storage.currentUpdate(this.getAttribute('data-key'),objStore);
      nmp.db.objectUpdateStats(this.getAttribute('data-key'),objStore);
      nmp.audio.prepare(this.getAttribute('data-src'));
      nmp.audio.play(this.getAttribute('data-src'));
      //update();
      updateControl ();
  }, false);
  //www.textContent = " #" + row.www;
  www.textContent = " #www";
  src.textContent = " #" + row.src;
  src.dataset.key = row.objId; 
  src.dataset.src = obj.src; 
  src.dataset.desc = row.desc; 
  desc.textContent = " "+ row.desc + " ";
  format.textContent = " format: " + row.format;
  if (obj.lastUsed){lastUsed.textContent = " lastUsed=" + row.lastUsed;}
  if (obj.usageCounter){usageCounter.textContent = " count=" + obj.usageCounter;}
  pause.textContent = " #Pause";
  pause.dataset.id = row.objId; 
  objId.dataset.id = row.objId; 
  objId.textContent = "objId=" + row.objId;
  li.appendChild(objId);
  li.appendChild(usageCounter);
  //li.appendChild(desc);
  //li.appendChild(format);
  li.appendChild(src);
  //li.appendChild(pause);
  li.appendChild(www);
  //li.appendChild(owner);
  li.appendChild(lastUsed);
}
  if (typeof obj.objId !== 'undefined') {objId.textContent = " objId=" + obj.objId;}
  if (typeof obj.objOwner !== 'undefined') {objOwner.textContent = " objOwner=" + obj.objOwner;}
  del.textContent = " #Delete";
  del.dataset.id = obj.objId; 
  del.addEventListener("click", function(e) {
    fxosnetzradio.browserdb.objectDel(obj.objId,objStore);
  });
  if (typeof obj.objId !== 'undefined') {
     edit.textContent = " #edit";
     edit.dataset.id = obj.objId; 
     edit.addEventListener("click", function(e) {
        fxosnetzradio.browserdb.objectEdit(id,obj.objId,objStore);
  });

  }
  li.appendChild(objId);
  li.appendChild(objOwner);
  li.appendChild(del);
  li.appendChild(edit);
  radioListAll.appendChild(li);

}







