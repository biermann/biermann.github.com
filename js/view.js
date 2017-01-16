nmp.view.rotate = function (direction) {
                var touchsurface = document.getElementById('headerStatus');
                touchsurface.innerHTML = ''+direction;
	        var current = nmp.storage.currentGet();
	        var oldObj = current;
		var newObj = {};
		var next = 0;
		var last = nmp.view.option.length - 1;
		var now = 0;
		var exist = false;
     		for (var i in nmp.view.option) {
     			if (nmp.view.option[i] == oldObj.view){exist = true;}
     		}
       		if (current.view === undefined || !exist || oldObj.view == '') {
			current.view = nmp.view.option[last];
		}
     		for (var i in nmp.view.option) {
     			if (nmp.view.option[i] == oldObj.view){now = i;}
     		}
 		console.log("nmp.view.rotate: "+direction+' now='+now+' next='+next+' last='+last+' '+current.view);
	        if (direction == "right") {
			if (now < last) {now++;next = now;current.view = nmp.view.option[next];}
			if (now == last) {current.view = nmp.view.option[next];}
		}	
	        if (direction == "left") {
			if (now > next) {now--;next = now;current.view = nmp.view.option[next];}
			if (now == 0) {current.view = nmp.view.option[last];}
		}	
		nmp.storage.currentSet(current);
		nmp.app.update();
                
 		console.log("nmp.view.rotate: "+direction+' now='+now+' next='+next+' last='+last+' '+current.view);

};


nmp.view.update = function (view) {
 //var elementId = "fxosnetzradio.view.top"; 
 var elementId = "nmpView"; 
 var element = document.getElementById(elementId);
 var className = nmp.view.class;
 var text = "";
 var current = nmp.storage.currentGet ();
 console.log("nmp.view.update request=",view);
 nmp.db.statusSet ();
 nmp.view.renderStatus (elementId);
 //updateControl ();
  if (view == "n/a") {view = "settings";}	
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
      fxosnetzradio.view.renderAudioStatus (elementId);	
      nmp.view.renderLocalstorageStatus (elementId);	

    }


    if (view == "status") {
    current.view = "status";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      fxosnetzradio.view.renderAudioStatus (elementId);	
      nmp.view.renderBrowserdbStatus (elementId);	
      nmp.view.renderLocalstorageStatus (elementId);	
    }

    if (view == "settings") {
    current.view = "settings";
    current.store = "storage";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      nmp.view.renderStatus (elementId);	
      nmp.view.renderSettings (elementId);	
    }


    if (view == "import" && nmp.db.ok() ) {
    current.view = "import";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      var button= document.createElement("button");
       button.innerHTML = "import";
       button.addEventListener("click", function(e) {
             var pickAny = new MozActivity({
                 name: "pick",
		data: {
         		type: ["text/plain"]}
             });

            pickAny.onsuccess = function () {
                var picked = document.createElement("a");
                    picked.innerHTML = window.URL.createObjectURL(this.result.blob);
                    element.appendChild(picked);
                window.alert("success");
            };

            pickAny.onerror = function () {
                window.alert("error");
                console.log("An error occurred");
            };
       }, false);
     element.appendChild(button);
    }







    if (view == "listIndexedDB" && nmp.db.ok() ) {
      current.view = "listIndexedDB";
      current.store= "db";
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
    //	   console.log("fxosnetzradio.view.update: " ,view, result.value);
    	result.value.view = "listIndexedDB" ;  
    	result.value.store = "db" ;  
	nmp.view.renderList(elementId,result.value,nmp.app.radio.name,current.store);
           result.continue();
      };
    }


    if (view == "icecastOgg" ) {
      current.view = "icecastOgg";
      current.store= "icecast";
      var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      if (window.XMLHttpRequest){
        var xmlhttp=new XMLHttpRequest();
      }      
      xmlhttp.open("GET","dir.xiph.org/yp.xml",false);
      xmlhttp.send();
      var xmlDoc=xmlhttp.responseXML;
      var x=xmlDoc.getElementsByTagName("entry"); 
      //var x=xmlDoc.documentElement.childNodes;
      for (i=0;i<x.length;i++) {
        //var result = x[i].nodeValue;
	if (x[i].getElementsByTagName("server_type")[0].childNodes[0].nodeValue == "application/ogg") {
          var result = {};
          result.desc = x[i].getElementsByTagName("server_name")[0].childNodes[0].nodeValue;
          result.type = x[i].getElementsByTagName("server_type")[0].childNodes[0].nodeValue;
          result.src = x[i].getElementsByTagName("listen_url")[0].childNodes[0].nodeValue;
    	  result.view = "icecastOgg" ;  
    	  result.store = "icecast" ; 
    	  result.www = "n/a" ; 
    	  result.objOwner = "icecast" ; 
	  nmp.view.renderList(elementId,result,nmp.app.radio.name,current.store);
      }
     }
    }


    if (view == "icecastMpeg" ) {
      current.view = "icecastMpeg";
      current.store= "icecast";
      var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      if (window.XMLHttpRequest){
        var xmlhttp=new XMLHttpRequest();
      }      
      xmlhttp.open("GET","dir.xiph.org/yp.xml",false);
      xmlhttp.send();
      var xmlDoc=xmlhttp.responseXML;
      var x=xmlDoc.getElementsByTagName("entry"); 
      //var x=xmlDoc.documentElement.childNodes;
      for (i=0;i<x.length;i++) {
        //var result = x[i].nodeValue;
	if (x[i].getElementsByTagName("server_type")[0].childNodes[0].nodeValue == "audio/mpeg") {
          var result = {};
          result.desc = x[i].getElementsByTagName("server_name")[0].childNodes[0].nodeValue;
          result.type = x[i].getElementsByTagName("server_type")[0].childNodes[0].nodeValue;
          result.src = x[i].getElementsByTagName("listen_url")[0].childNodes[0].nodeValue;
    	  result.view = "icecastMpeg" ;  
    	  result.store = "icecast" ; 
    	  result.www = "n/a" ; 
    	  result.objOwner = "icecast" ; 
	  nmp.view.renderList(elementId,result,nmp.app.radio.name,current.store);
      }
     }
    }










    if (view == "edit" && nmp.db.ok() ) {
      current.view = "edit";
      current.store = "db";
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
	fxosnetzradio.view.renderList(elementId,result.value,radioDBstore,store);
           result.continue();
      };
      nmp.view.renderLocalstorageStatus (elementId);	
    }







    if (view == "recent" && nmp.db.ok()) {
    current.view = "recent";
    current.store = "db";
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
      var index = store.index("lastUsed");
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
	nmp.view.renderList(elementId,result.value,radioDBstore,current.store);
           result.continue();
      };
      fxosnetzradio.view.renderbuttonControl(elementId);
      nmp.view.renderLocalstorageStatus (elementId);	
    }

    if (view == "recent10" && nmp.db.ok()) {
      current.view = "recent10";
      var result = nmp.storage.current.updateField('view',current.view,'audio mpeg view update 86478432');
      current.store= "db";
      element = document.getElementById(elementId);
    	   console.log(":fxosnetzradio.view.update: " ,current.view);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      //fxosnetzradio.view.renderStatus (elementId);
      var store = db.transaction(nmp.db.radio.name).objectStore(nmp.db.radio.name);	
      var keyRange = IDBKeyRange.upperBound(new Date().getTime());
      var index = store.index("lastUsed");
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
      var newArray = [];
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
	   count++;
           if(!!result == false ) return;
           if(count > 9) return;
    	   //console.log(":fxosnetzradio.view.update: ",count ,view, result.value);
    	result.value.view = "recent10" ; 
        result.value.store = "db" ;
        nmp.tempArray.push (result.value);
        //nmp.view.renderList(elementId,result.value,nmp.app.radio.name,current.store); 
           result.continue();
      }
      var array = nmp.storage.radio.name;
      var objects = JSON.parse(localStorage.getItem(array));
      objects.sort(function(a, b){
        return b.lastUsed-a.lastUsed
      })
      current.store = "storage";
      for (var i in objects) {
    	objects[i].view = "recent10" ; 
        objects[i].store = current.store ;
        if (i<9){nmp.tempArray.push (objects[i]);}
      }
      nmp.tempArray.sort(function(a, b){
        return b.lastUsed-a.lastUsed
      })
      for (var i=0; i<nmp.tempArray.length; i++){
        if (i<9){nmp.view.renderList(elementId,nmp.tempArray[i],nmp.app.radio.name,nmp.tempArray[i].store);} 
      }
    

    }


    if (view == "biermann" && nmp.db.ok()) {
    current.view = "biermann";
    current.store= "db";
    nmp.storage.current.updateField('store',current.store,'biermann 47564656565656984');
    nmp.storage.current.updateField('view',current.view,'biermann 47564656565656984');
    //var result = nmp.storage.currentSet(current);
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
        result.value.store= "db";
	nmp.view.renderbutton(elementId,result.value,radioDBstore,current.store);
           result.continue();
      };
      nmp.view.renderbuttonControl(elementId);
    }

    if (view == "audio/ogg" && nmp.db.ok()) {
    current.view = "audio/ogg";
    current.store= "db";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      nmp.view.renderStatus (elementId);
	
      var array = nmp.storage.radio.name;
      var objects = JSON.parse(localStorage.getItem(array));
      current.store = "storage";
      for (var i in objects) {
    	objects[i].view = "audio/ogg" ; 
        objects[i].store = current.store ;
        if (objects[i].type == "audio/ogg"){ nmp.view.renderbutton(elementId,objects[i],array,current.store);}
      }

      current.store= "db";
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.only("audio/ogg");
      var index = store.index("type");
      var cursorRequest = index.openCursor(keyRange);
      index.openCursor(keyRange).onsuccess = function(e) {
         var cursor = e.target.result;
         if (cursor) {
    	    cursor.value.view = "audio/ogg" ;  
            cursor.value.store= "db";
	    nmp.view.renderbutton(elementId,cursor.value,radioDBstore,current.store);
            result.continue();
    	 }
      };
      nmp.view.renderbuttonControl(elementId);
    }
 
  if (view == "fav" && nmp.db.ok()) {
    current.view = "fav";
    current.store= "db";
    nmp.storage.current.updateField('store',current.store,'fav sdafsdfds');
    nmp.storage.current.updateField('view',current.view,'fav sdfsd');
    element = document.getElementById(elementId);
    while (element.firstChild) { element.removeChild(element.firstChild); }	
    nmp.view.renderStatus (elementId);	
    var store = db.transaction(nmp.db.radio.name).objectStore(nmp.db.radio.name);
    var keyRange = IDBKeyRange.only("true");
    var index = store.index("fav");
    var cursorRequest = index.openCursor(keyRange);
    var count = 0;
    cursorRequest.onsuccess = function(e) {
      var result = e.target.result;
      count++;
      if(!!result == false ) return;
 	result.value.view = "fav" ;  
        result.value.store= "db";
        nmp.view.renderbutton(elementId,result.value,radioDBstore,current.store);
        result.continue();
      }
      nmp.view.renderbuttonControl(elementId);
  }


    if (view == "listFav" && nmp.db.ok()) {
    current.view = "listFav";
    current.store= "db";
    nmp.storage.current.updateField('store',current.store,'lisFav sdasfsdf');
    nmp.storage.current.updateField('view',current.view,'listFav dfsdfdsa');
    element = document.getElementById(elementId);
    while (element.firstChild) { element.removeChild(element.firstChild); }
      nmp.view.renderStatus (elementId);
      nmp.view.renderbuttonControl(elementId);
      var store = db.transaction(nmp.db.radio.name).objectStore(nmp.db.radio.name);
      var keyRange = IDBKeyRange.only("true");
      var index = store.index("fav");
      var cursorRequest = index.openCursor(keyRange);
      var count = 0;
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
           count++;
           if(!!result == false ) return;
        result.value.view = "listFav" ;
        result.value.store= "db";
        nmp.view.renderList(elementId,result.value,nmp.app.radio.name,current.store);
           result.continue();
      }
    }




    if (view == "myRadio" && nmp.db.ok()) {
    current.view = "myRadio";
    current.store= "db";
    var result = nmp.storage.currentSet(current);
    element = document.getElementById(elementId);
    console.log(":fxosnetzradio.view.update: " ,current.view);
    while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.only("browser");
      var index = store.index("objOwner");
      var cursorRequest = index.openCursor(keyRange);
      var count = 0;
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
	   count++;
           if(!!result == false ) return;
    	result.value.view = "myRadio" ;  
        result.value.store= "db";
	nmp.view.renderbutton(elementId,result.value,radioDBstore,current.store);
           result.continue();
      }
      //current.store = "storage";
      var array = nmp.storage.radio.name;
      var objects = JSON.parse(localStorage.getItem(array)); 
      for (var i in objects) {
    	objects[i].view = "myRadio" ; 
        objects[i].store = current.store ;
        //if (objects[i].owner == "browser") { nmp.view.renderbutton(elementId,objects[i],array,current.store); }
      }
      nmp.view.renderbuttonControl(elementId);
    }



    if (view == "listMyRadio" && nmp.db.ok()) {
    current.view = "listMyRadio";
    current.store= "db";
    var result = nmp.storage.currentSet(current);
    element = document.getElementById(elementId);
    console.log(":fxosnetzradio.view.update: " ,current.view);
    while (element.firstChild) { element.removeChild(element.firstChild); }	
      nmp.view.renderStatus (elementId);	
      nmp.view.renderbuttonControl(elementId);
      //var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var store = db.transaction(nmp.db.radio.name).objectStore(nmp.db.radio.name);
      var keyRange = IDBKeyRange.only("browser");
      var index = store.index("objOwner");
      var cursorRequest = index.openCursor(keyRange);
      var count = 0;
      cursorRequest.onsuccess = function(e) {
           var result = e.target.result;
	   count++;
           if(!!result == false ) return;
    	result.value.view = "listMyRadio" ;  
        result.value.store= "db";
	nmp.view.renderList(elementId,result.value,nmp.app.radio.name,current.store);
           result.continue();
      }
      //current.store = "storage";
      var array = nmp.storage.radio.name;
      var objects = JSON.parse(localStorage.getItem(array)); 
      for (var i in objects) {
    	objects[i].view = "listMyRadio" ; 
        objects[i].store = current.store ;
        //if (objects[i].owner == "browser") { nmp.view.renderList(elementId,objects[i],array,current.store); }
      }
    }










    if (view == "top" && nmp.db.ok()) {
    current.view ="top";
    var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
    	   console.log(":fxosnetzradio.view.update: " ,current.view);
      while (element.firstChild) {
  	element.removeChild(element.firstChild);
      }
      fxosnetzradio.view.renderStatus (elementId);	
      current.store= "db";
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.lowerBound(0);
      var index = store.index("usageCounter");
      var cursorRequest = index.openCursor(keyRange);
      var count = 0;
      index.openCursor(keyRange).onsuccess = function(e) {
           var result = e.target.result;
	   count++;
           if(!!result == false ) return;
           if (result) {
    	     result.value.view = "top" ;  
    	     result.value.store = "db" ;  
             nmp.view.renderbutton(elementId,result.value,radioDBstore,current.store);
           result.continue();
      }
      }
      nmp.view.renderLocalstorageStatus (elementId);	
      nmp.view.renderBrowserdbStatus (elementId);	
    }









    if (view == "edit" && nmp.db.ok()) {
    current.view = "form";
    current.store = "db";
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
        result.value.store = "db";
	fxosnetzradio.view.renderList(elementId,result.value,radioDBstore,current.store);
           result.continue();
      };
      nmp.view.renderLocalstorageStatus (elementId);	
      nmp.view.renderBrowserdbStatus (elementId);	

    }






 
    if (view == "form" && nmp.db.ok()) {
    current.view = "form";
    current.store = "db";
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
	fxosnetzradio.view.renderList(elementId,result.value,radioDBstore,current.store);
           result.continue();
      };
      nmp.view.renderLocalstorageStatus (elementId);	
      nmp.view.renderBrowserdbStatus (elementId);	

    }


    if (view == "swipe" && nmp.storage.ok()) {
      current.view = "swipe";
      current.store = "storage";
      var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      console.log(":fxosnetzradio.view.update: " ,current.view);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);
      fxosnetzradio.view.renderbuttonControl(elementId);
    //alert(screen.width + "x" + screen.height);

      var swipeBox = document.createElement("div");
      swipeBox.setAttribute('id','swipeBox');
      swipeBox.setAttribute('name','swipeBox');
      swipeBox.setAttribute('class',nmp.view.class);
      //swipeBox.width = screen.width;
      //swipeBox.height = screen.availHeight;
      //swipeBox.height = screen.height;
      //swipeBox.innerHTML=screen.width + "x" + screen.height+' - '+screen.availWidth + "x" + screen.availHeight;
      element.appendChild(swipeBox);
      var array = nmp.storage.radio.name;
      var objects = JSON.parse(localStorage.getItem(array));
      for (var i in objects) {
    	 objects[i].view = "swipe" ; 
         fxosnetzradio.view.renderbutton('swipeBox',objects[i],array);
      }
	
    }


    if (view == "listStorage" ) {
      current.view = "listStorage";
      current.store = "storage";
      var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      var array = nmp.storage.radio.name;
      var objects = JSON.parse(localStorage.getItem(array)); 
      nmp.view.renderbuttonControl(elementId);
      for (var i in objects) {
    	objects[i].view = "listStorage" ; 
        objects[i].store = current.store ;
	nmp.view.renderList(elementId,objects[i],array,current.store);
      }
    }
    if (view == "drawer" ) {
      current.view = "drawer";
      current.store = "storage";
      var result = nmp.storage.current.updateField('view',current.view,'drawer view update 8474332');
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      nmp.view.renderStatus (elementId);	
      var array = nmp.storage.radio.name;
      var temp = {  view: "n/a" }
      for (var i in nmp.view.option) {
	temp.view = nmp.view.option[i];
      	nmp.view.renderDrawer2(elementId,temp);
      }
    }

    if (view == "audio/mpeg" ) {
      current.view = "audio/mpeg";
      var result = nmp.storage.current.updateField('view',current.view,'audio mpeg view update 8478432');
      //var result = nmp.storage.currentSet(current);
      element = document.getElementById(elementId);
      while (element.firstChild) { element.removeChild(element.firstChild); }	
      fxosnetzradio.view.renderStatus (elementId);	
      nmp.view.renderbuttonControl(elementId);
      var array = nmp.storage.radio.name;
      var objects = JSON.parse(localStorage.getItem(array));
      current.store = "storage";
      for (var i in objects) {
    	objects[i].view = "audio/mpeg" ; 
        objects[i].store = current.store ;
        if (objects[i].type == "audio/mpeg"){ nmp.view.renderbutton(elementId,objects[i],array,current.store);}
      }

      //nmp.view.renderLocalstorageStatus (elementId);	
      current.store= "db";
      var store = db.transaction(radioDBstore).objectStore(radioDBstore);
      var keyRange = IDBKeyRange.only("audio/mpeg");
      var index = store.index("type");
      var cursorRequest = index.openCursor(keyRange);
      index.openCursor(keyRange).onsuccess = function(e) {
         var result = e.target.result;
         if(!!result == false) return;
         if (result) {
            result.value.store= "db";
    	    result.value.view = "audio/mpeg" ;  
	    nmp.view.renderbutton(elementId,result.value,radioDBstore,current.store);
            result.continue();
    	 }
      }
    }



};



nmp.view.renderDrawer2 = function (id,entry) {
  if (id !== null) {
    var element = document.getElementById(id);
  }
  var button= document.createElement("button");
  var a = document.createElement("button");
  //var a = document.createElement("a");
  var li = document.createElement("li");
  var hr = document.createElement("hr");
  var br = document.createElement("br");
  if (entry !== null) {
    a.textContent = ""+entry.view;
  }
  a.setAttribute('id','nmpViewDrawer');
  a.setAttribute('type','drawer');
  a.setAttribute('class',nmp.view.class);
  a.dataset.id = id; 
  a.dataset.obj = JSON.stringify(entry); 
  a.dataset.descriptor = "drawer"; 
  a.dataset.store = "na"; 
  a.dataset.objstore = "na"; 
  //console.log('nmp.view.eventClick 1 '+test2+test+entry);
  a.addEventListener("click", function(e) {
    //console.log('nmp.view.eventClick 2'+entry.view);
    nmp.view.eventClick(this.getAttribute('data-id'),this.getAttribute('data-obj'),this.getAttribute('data-objstore'),this.getAttribute('data-store'),this.getAttribute('data-descriptor'));
  }, false);
  //li.appendChild(a);
  //element.appendChild(li);
  element.appendChild(a);
}



nmp.view.renderDrawer = function (id,entry) {
  if (id !== null) {
    var element = document.getElementById(id);
  }
  var a = document.createElement("a");
  var li = document.createElement("li");
  var hr = document.createElement("hr");
  var br = document.createElement("br");
  if (entry !== null) {
    a.textContent = ""+entry.view;
  }
  a.setAttribute('id','nmpViewDrawer');
  a.setAttribute('class',nmp.view.class);
  a.dataset.id = id; 
  a.dataset.obj = JSON.stringify(entry); 
  a.dataset.descriptor = "drawer"; 
  a.dataset.store = "na"; 
  a.dataset.objstore = "na"; 
  //console.log('nmp.view.eventClick 1 '+test2+test+entry);
  a.addEventListener("click", function(e) {
    //console.log('nmp.view.eventClick 2'+entry.view);
    nmp.view.eventClick(this.getAttribute('data-id'),this.getAttribute('data-obj'),this.getAttribute('data-objstore'),this.getAttribute('data-store'),this.getAttribute('data-descriptor'));
  }, false);
  li.appendChild(a);
  element.appendChild(li);
}

fxosnetzradio.view.renderbuttonControl = function (id) {
	nmp.view.renderbuttonControl (id);
}

nmp.view.renderbuttonControl = function (id) {
   var element = document.getElementById(id);
   var audio = document.querySelector("#audio");
   var br = document.createElement("br");
   var current = nmp.storage.currentGet();
   var volume = current.volume;
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
       www.dataset.www = current.www;
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
          var volume = nmp.storage.currentGet().volume;
	  volume = volume + 0.05;
	  if (volume >= 1) { volume = 0.99; }
	  //audio.volume = volume;
          nmp.audio.volume(volume);
	  current.volume = volume;
          var result = nmp.storage.current.updateField('volume',current.volume,'renderbuttoncontrol  volumeUp update 84548432');
          nmp.app.updateControl ();
       }, false);
       volumeDown.addEventListener("click", function(e) {
          var volume = nmp.storage.currentGet().volume;
	  if (volume == 0.99) {volume = volume - 0.04;}
	  else {volume = volume - 0.05;}
	  if (volume <= 0.1) {volume = 0.1;}
	  //audio.volume = volume;
          nmp.audio.volume(volume);
	  current.volume = volume;
          var result = nmp.storage.current.updateField('volume',current.volume,'renderbuttoncontrol  volumeDown update 484548432');
          nmp.app.updateControl ();
       }, false);
       //element.appendChild(br);
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
             if (current[prop] == "true" && nmp.app.settings[i] == "boolean" && prop == i) { newElement.setAttribute('checked','checked');}
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
      if (nmp.app.settings[i] == "click" && i == "reset current") { 
         newElement.addEventListener("click", function(e) {
            nmp.storage.current.reset();
         }, false);
      }
      element.appendChild(newElement);
      }
   } 
}; 






fxosnetzradio.view.renderbutton = function (id,obj,objStore) {
	nmp.view.renderbutton (id,obj,objStore);
} 


nmp.view.renderbutton = function (id,obj,objStore,store) {
if (nmp.db.radioValid(obj) && obj.objId !== null) {
   var element = document.getElementById(id);

    if (element && obj && obj !== 'undefined' && obj !== null) {
      var button= document.createElement("button");
      var buttonId= "button"+obj.view+obj.objId;
      var row = obj;
      if (nmp.storage.currentGet().debug == "true") {
          console.log ("debug ",nmp.storage.currentGet().debug,":");
          console.log (id,obj,objStore,store);
      }
       button.innerHTML = obj.desc;
       button.name = obj.desc;
       button.dataset.descriptor = "desc"; 
       button.dataset.key = obj.objId; 
       button.dataset.id = id; 
       button.dataset.src = obj.src; 
       button.dataset.desc = obj.desc; 
       button.dataset.objstore = objStore; 
       button.dataset.store = store; 
       button.dataset.obj = JSON.stringify(obj); 
       button.setAttribute('type','button');
       button.setAttribute('class',nmp.view.class);
       button.setAttribute('id',buttonId);
       if (obj.desc == nmp.storage.currentGet().desc) {

          button.setAttribute('checked','checked');
       }
       button.addEventListener("click", function(e) {
    	  nmp.view.eventClick(this.getAttribute('data-id'),this.getAttribute('data-obj'),this.getAttribute('data-objstore'),this.getAttribute('data-store'),this.getAttribute('data-descriptor'));
    //fxosnetzradio.browserdb.objectUpdateStats(row.objId,objStore);
         //fxosnetzradio.localstorage.currentSet(obj);
         //nmp.storage.currentUpdate(this.getAttribute('data-key'),objStore);
         //nmp.db.objectUpdateStats(this.getAttribute('data-key'),this.getAttribute('data-store'));
      //nmp.audio.prepare(this.getAttribute('data-src'));
      //nmp.audio.play(this.getAttribute('data-src'));
         //nmp.app.updateControl ();
         //nmp.app.update ();
       }, false);
       element.appendChild(button);
       }
} 
} 

fxosnetzradio.view.renderStatus = function (id) {
	nmp.view.renderStatus ("fxosnetzradio.view.renderStatus");
} 

nmp.view.renderStatus = function (desc) {
	nmp.view.renderHeaderStatus (desc+" ->nmp.view.renderStatus");
  	nmp.view.renderHeaderFav(desc+ " ->nmp.view.renderStatus");
} 


nmp.view.renderHeaderStatus = function (desc) {
  var header = document.getElementById("headerStatus");
  var element = document.getElementById("headerStatus");
  var current = nmp.storage.currentGet ();
  var a = document.createElement("a");
  var hr = document.createElement("hr");
  var p = document.createElement("p");
  var br = document.createElement("br");
  var span = document.createElement("span");
  var current = nmp.storage.currentGet ();
  a.textContent = "desc="+current.desc+" - view="+current.view;
  //element.innerHTML = ""+current.desc+" ("+current.view+" view)";
  //element.innerHTML = ""+current.desc+"";
  a.setAttribute('id','nmpViewStatus');
  a.setAttribute('class',nmp.view.class);
  //element.appendChild(a);
  //element.appendChild(hr);
  //element.appendChild(hr);
  //element.appendChild(br);
}

nmp.view.renderHeaderFav = function (desc) {
  var element = document.getElementById("headerFav");
  var headerStatus = document.getElementById("headerStatus");
  var headerFav = document.getElementById("headerFav");
  //var headerFavObjId = document.getElementById("headerFavObjId");
  var current = nmp.storage.currentGet ();
  var objId = nmp.storage.currentGet().objId;
  var db = nmp.db.db;
  var obj = {};
  var objStore = nmp.db.radio.name;
  var key = objId;
  if (nmp.db.ok() && objStore !== null && key !== null && desc && element){
    console.log( 'nmp.view.renderFav key='+key+' store='+objStore+' requestor='+desc);
    var store = db.transaction(objStore).objectStore(objStore);
    var myKey = objId;
    var request = store.get(myKey);
    request.onsuccess = function(e) {
      obj  = e.target.result;
      if (obj == null) {
        console.log("nmp.view.renderFav: error "+key+objStore+' requestor='+desc);
      }
      else {
        for (var i in nmp.db.radio.field) {
          if (typeof obj[nmp.db.radio.field[i]] == 'undefined'){obj[nmp.db.radio.field[i]]  = 'n/a';}
        }
        for (var prop in obj) {
          if (obj.hasOwnProperty(prop) && prop == 'fav' && obj[prop] == "true") {
            headerFav.style.backgroundImage="url('image/header/icon/fav-on.png')";
            headerStatus.innerHTML = current.view+" -  "+current.desc+" "+obj.objId+"";
            console.log('nmp.view.renderFav: ' +prop+': ' +obj[prop]);
          }
          if (obj.hasOwnProperty(prop) && prop == 'fav' && obj[prop] != "true") {
            headerFav.style.backgroundImage="url('image/header/icon/fav-off.png')";
            headerStatus.innerHTML = current.view+" -  "+current.desc+" "+obj.objId+"";
            console.log('nmp.view.renderFav: ' +prop+': ' +obj[prop]);
          }
        }
      }
    }
  } 
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

nmp.view.renderLocalstorageStatus = function (id) {
  var element = document.getElementById(id);
  var a = document.createElement("a");
  var li = document.createElement("li");
  var hr = document.createElement("hr");
  var br = document.createElement("br");
  var text = "";
  text += "" +nmp.storage.status;
  a.textContent = text;
  a.setAttribute('id','localstorageStatus');
  a.setAttribute('class',nmp.view.class);
  li.appendChild(a);
  element.appendChild(li);
  //nmp.storage.statusSet ();
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


nmp.view.renderList = function (id,obj,objStore,store) {
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
  if (nmp.app.radio.valid(obj) && id !== null) {
      if (nmp.storage.currentGet().debug == "true") {
          console.log ("debug ",nmp.storage.currentGet().debug,":");
          console.log (id,obj,objStore,store);
      }

  for (var i in nmp.view.list) {
    if (obj.hasOwnProperty(nmp.view.list[i])) {
      //console.log('nmp.view.renderlist: 2' +i+': ' +obj[nmp.view.list[i]]);
      var newElement = document.createElement("a");
      newElement.dataset.value = obj[nmp.view.list[i]]; 
      newElement.dataset.descriptor = nmp.view.list[i]; 
      newElement.dataset.view = view; 
      newElement.dataset.id = id; 
      newElement.dataset.objstore = objStore; 
      newElement.dataset.store = store; 
      newElement.dataset.obj = JSON.stringify(obj); 
      newElement.name = nmp.view.list[i];
      newElement.defaultValue = obj[nmp.view.list[i]];
      newElement.id = id + nmp.view.list[i] ; 
      newElement.innerHTML = ' '+obj[nmp.view.list[i]]+' ' ;
      newElement.setAttribute('class',nmp.view.class);
      newElement.addEventListener("click", function(e) {
    	  nmp.view.eventClick(this.getAttribute('data-id'),this.getAttribute('data-obj'),this.getAttribute('data-objstore'),this.getAttribute('data-store'),this.getAttribute('data-descriptor'));
      }, false);
    }
    else if (!obj.hasOwnProperty(nmp.view.list[i]) && !nmp.db.readOnly(nmp.view.list[i],obj) ) {
      //console.log('nmp.view.renderlist: 2' +i+': ' +nmp.view.list[i]);
      var newElement = document.createElement("a");
      newElement.dataset.descriptor = nmp.view.list[i]; 
      newElement.dataset.view = view; 
      newElement.dataset.id = id; 
      newElement.dataset.objstore = objStore; 
      newElement.dataset.store = store; 
      newElement.dataset.obj = JSON.stringify(obj); 
      newElement.name = nmp.view.list[i];
      newElement.id = id + nmp.view.list[i]; 
      newElement.setAttribute('class',nmp.view.class);
      newElement.innerHTML = ' '+nmp.view.list[i]+' ';
      newElement.addEventListener("click", function(e) {
    	  nmp.view.eventClick(this.getAttribute('data-id'),this.getAttribute('data-obj'),this.getAttribute('data-objstore'),this.getAttribute('data-store'),this.getAttribute('data-descriptor'));
      }, false);

    }
    else {
      //console.log('nmp.view.renderlist: 2' +i+': ' +nmp.view.list[i]);
      var newElement = document.createElement("a");
      newElement.dataset.descriptor = nmp.view.list[i]; 
      newElement.dataset.view = view; 
      newElement.dataset.id = id; 
      newElement.dataset.store = objStore; 
      newElement.dataset.obj = JSON.stringify(obj); 
      newElement.name = nmp.view.list[i];
      newElement.id = id + nmp.view.list[i]; 
      newElement.setAttribute('class',nmp.view.class);
      newElement.innerHTML = '"no '+nmp.view.list[i]+'"';
      newElement.addEventListener("click", function(e) {
    	  nmp.view.eventClick(this.getAttribute('data-id'),this.getAttribute('data-obj'),this.getAttribute('data-store'),this.getAttribute('data-descriptor'));
      }, false);
    }







   li.appendChild(newElement);
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
  //src.textContent = " #" + row.src;
  //src.dataset.key = row.objId; 
  //src.dataset.src = obj.src; 
  //src.dataset.desc = row.desc; 
  desc.textContent = " "+ row.desc + " ";
  //format.textContent = " format: " + row.format;
  if (obj.lastUsed){lastUsed.textContent = " lastUsed=" + row.lastUsed;}
  if (obj.usageCounter){usageCounter.textContent = " count=" + obj.usageCounter;}
  //pause.textContent = " #Pause";
  //pause.dataset.id = row.objId; 
  //objId.dataset.id = row.objId; 
  //objId.textContent = "objId=" + row.objId;
}
  if (typeof obj.objId !== 'undefined') {objId.textContent = " objId=" + obj.objId;}
  if (typeof obj.objOwner !== 'undefined') {objOwner.textContent = " objOwner=" + obj.objOwner;}
  del.textContent = " #Delete";
  //del.dataset.id = obj.objId; 
  del.addEventListener("click", function(e) {
    fxosnetzradio.browserdb.objectDel(obj.objId,objStore);
  });
  if (typeof obj.objId !== 'undefined') {
     edit.textContent = " #edit";
     //edit.dataset.id = obj.objId; 

  }
  radioListAll.appendChild(li);

};



nmp.view.eventClick = function (id,objStr,objStore,store,descriptor){
  console.log('nmp.view.eventClick id=',id,'objStr=',objStr,'objStore=',objStore,'store=',store,'descriptor=',descriptor);
  var obj = JSON.parse(objStr);
  console.log('nmp.view.eventClick id=',id,'obj=',obj,'objStore=',objStore,'store=',store,'descriptor=',descriptor);
  nmp.app.vibrate();
  if (descriptor == "www") {
    window.open(obj.www,'_blank'); 
  }
  if (descriptor == "src" || descriptor == "desc") {
    if (store == "db") {nmp.storage.currentUpdate(obj.objId,objStore);}
    if (store == "db") {nmp.db.objectUpdateStats(obj.objId,objStore,'nmp.view.eventClick stats update 47564');}
    if (store == "icecast") {nmp.storage.current.updateObj(obj,'fdgf');}
    nmp.storage.current.updateField('store',obj.store,'nmp.view.eventClick store update 47565656565656984');
    if (store == "storage") {nmp.storage.current.updateRadio(obj,'nmp.view.eventclick radio update 4345375');}
    if (store == "storage") {nmp.storage.radio.updateStats(obj,'nmp.view.eventclick stats update 4345775');}
    nmp.audio.prepare(obj.src);
    nmp.audio.play(obj.src);
    if (store !== "icecast") {nmp.app.update();}
  }
  if (descriptor == "delete") {
    if (store == "db") {nmp.db.objectDel(obj.objId,objStore);}
    if (store == "storage") {nmp.storage.radio.objectDel(obj);}
    nmp.app.update();
  }
  if (descriptor == "duplicate") {
    obj.objOwner =  "browser";
    obj.objId =  JSON.stringify(new Date().getTime());
    if (store == "db") {nmp.db.radio.objectAdd(obj);}
    if (store == "storage") {nmp.storage.radio.objectAdd(obj);}
    nmp.app.update();
  }
  if (descriptor == "edit") {
    //console.log('nmp.view.eventClick2',obj,descriptor,objStore,id);
    if (store == "db") {
      nmp.db.objectEdit(id,obj.objId,objStore);
    }
  }
  if (descriptor == "pause") {
    nmp.audio.pause("pause");
    nmp.app.updateControl();
  }
  if (descriptor == "stop") {
    nmp.audio.pause("stop");
    nmp.app.updateControl();
  }
  if (descriptor == "drawer") {
    var current = nmp.storage.currentGet();
    current.view = obj.view;
    nmp.storage.currentSet(current);
    nmp.app.update();
  }
};


