
function update () {
    var volumeUp = document.querySelector("#volumeUp"),
	volumeDown = document.querySelector("#volumeDown"),
	playPause = document.querySelector("#playPause"),
	wwwButton = document.querySelector("#wwwButton"),
	radioListSelect = document.querySelector("#radioListSelect"),
	audio = document.querySelector("#audio"),
	fxosnetzradioViewStatus = document.querySelector("#fxosnetzradioViewStatus"),
     	toolbarPlayPause = document.querySelector("#toolbarPlayPause"),
	volume = audio.volume,
	src =  audio.src,
	myArrayObject = JSON.parse(localStorage.getItem(fxosnetzradio.localstorage.currentarray)),
	//myObject = myArrayObject[0],
	radioCurrentArray = JSON.parse(localStorage.getItem(fxosnetzradio.localstorage.currentarray)),
	//radioCurrent = radioCurrentArray[0],:
	//srcStr = '' + radioCurrent.src,
        //descriptionStr = '' + radioCurrent.description,
        radioCurrentDisplay = document.querySelector("#radioCurrentDisplay"),
	radioListArray = JSON.parse(localStorage.getItem("radioList")),
    	//radioListDisplay = document.querySelector("#radioListLink"),
	srcStr = '',
        descriptionStr = '',
        descStr = '',
        wwwStr = '',
	radioCurrent = [],
	volumeInteger = 0,
    	radioListDisplay = document.querySelector("#radioListDisplay");
    if (volume) {
	volumeInteger = Math.ceil(volume * 100);
    }
    //if('vibrate' in navigator) {
      //  navigator.vibrate(100);
    //}
    if (updateValidator() ) {
        radioCurrent = nmp.storage.currentGet();
	//srcStr = '' + radioCurrent.src;
        //descStr = '' + fxosnetzradio.localstorage.currentGet().desc;
        //wwwStr = '' + radioCurrent.www;
        for (var prop in radioCurrent) {
          if (radioCurrent.hasOwnProperty(prop)) {
            this[prop] = radioCurrent[prop];
            //console.log( 'update: ' +prop+': ' +this[prop]);
          if ( prop == "view" ) { 
           //console.log( 'update(): ' +prop+': ' +this[prop]);
	    setTimeout('nmp.view.update (this["view"])', 2000);
	    //fxosnetzradio.view.update (this[prop]);
	  } 
	} 
       }
    }

if (fxosnetzradioViewStatus && updateValidator()){
  var current = nmp.storage.currentGet ();
  fxosnetzradioViewStatus.textContent = "desc="+current.desc+" - view="+current.view;
}; 
 
    if (updateValidator()&& volume) {
       radioCurrent.volume = volume;
       var newObjects = [];
       var newObject = radioCurrent;
       //newObjects.push(newObject);
       //localStorage.removeItem(fxosnetzradio.localstorage.currentarray);
       //localStorage.setItem(fxosnetzradio.localstorage.currentarray, JSON.stringify(newObjects));
      //fxosnetzradio.localstorage.currentUpdate();
    } 

 
    if (volumeUp) {
	volumeUp.textContent = 'vol+:' + volumeInteger +'of100' ;
    }
    if (toolbarVolumeUp) {
	toolbarVolumeUp.textContent = 'vol+' ;
    }
    if (volumeDown) {
	volumeDown.textContent = 'vol-:' + volumeInteger +'of100' ;
    }
    if (toolbarVolumeDown) {
	toolbarVolumeDown.textContent = 'vol-' ;
    }
    if (toolbarPlayPause && playPause && audio.played && audio.src) {
		playPause.textContent = '| | ' ;
    		toolbarPlayPause.style.backgroundImage="url('images/toolbars/icons/pause.png')"; 
    		//toolbarPlayPause.style.backgroundColor="transparent"; 
    }
    if (playPause && audio.played && descriptionStr) {
		playPause.textContent = '| | ' + descriptionStr ;
    }
    if (toolbarPlayPause && playPause && audio.paused && audio.src) {
		playPause.textContent = '> ' ;
    		toolbarPlayPause.style.backgroundImage="url('images/toolbars/icons/play.png')"; 
    		//toolbarPlayPause.style.backgroundColor="transparent"; 
    }

    if (playPause && audio.paused && descriptionStr && audio.readyState) {
		playPause.textContent = '> ' + descriptionStr ;
    }
    
    if (playPause && !(audio.src)) {
		playPause.textContent = 'no audio.src' ;
    }
    if (playPause && audio.src && !(audio.readyState)) {
		playPause.textContent = '> no audio.readyState' ;
    }

    if (radioCurrentDisplay && descriptionStr) {
		radioCurrentDisplay.innerHTML = "sessionStorge.radioCurrent.description: <code>" + descriptionStr + "</code>";
                radioCurrentDisplay.style.display = "block";
    }
    if (radioCurrentDisplay && srcStr) {
		radioCurrentDisplay.innerHTML = "sessionStorge.radioCurrent.src: <code>" + srcStr + "</code>";
                radioCurrentDisplay.style.display = "block";
    }
    if (radioCurrentDisplay && srcStr && descriptionStr) {
		radioCurrentDisplay.innerHTML = "sessionStorge.radioCurrent.description: <code>" + descriptionStr + "</code> .src <code>" + srcStr + "</code>";
                radioCurrentDisplay.style.display = "block";
    }
    if (radioCurrentDisplay && src && descriptionStr) {
		radioCurrentDisplay.innerHTML = "sessionStorge.radioCurrent.description: <code>" + descriptionStr +    "</code> .src <code>" + srcStr + "</code> audio.src: <code>" + src + "</code>";
                radioCurrentDisplay.style.display = "block";
    }


    if (radioCurrentDisplay && radioCurrentArray) {
	radioCurrent = radioCurrentArray[0];
	if (typeof radioCurrent !== 'undefined' && radioCurrent !== null) {
	srcStr = '' + radioCurrent.src;
        descriptionStr = '' + radioCurrent.description;
        wwwStr = '' + radioCurrent.www;
	radioCurrentDisplay.innerHTML = '<code>' + descriptionStr +  '</code> - <code>' + wwwStr + '</code> - <code>' + srcStr + '</code> - <code>' + radioCurrentArray[0].owner + '</code>';
	}
   }  





    	if (updateValidator () && wwwButton) { 
		wwwButton.innerHTML = 'Web: ' + radioCurrentArray[0].description ;
	}  


//radioStatusUpdate ('test');
//radioStatusEventListener ('radioCurrent','radioStatus');

//radioListList();
//radioListListEventListener('radioList','tuneInButton');
//radioListListEventListener('radioList','wwwButton');
//radioListListEventListener('radioList','deleteButton');
//radioListListEventListener('radioList','radioListList');
radioListListZwei ('radioList','radioListAll','radioListAll');
radioListEventListener('radioList','radioListAllwww');
radioListEventListener('radioList','radioListAlldescription');
radioListEventListener('radioList','radioListAllsrc');
radioListEventListener('radioList','radioListAllpause');
radioListEventListener('radioList','radioListAlldelete');
radioListEventListener('radioCurrent','radioStatuswww');
radioListEventListener('radioCurrent','radioStatussrc');
radioListEventListener('radioCurrent','radioStatusdescription');
radioListEventListener('radioCurrent','radioStatuspause');
radioListEventListener('radioCurrent','radioStatusdelete');
nmp.storage.statusSet ();
};


nmp.app.updateControl = function (e) {
	updateControl ();
}

nmp.app.update = function (e) {
	update ();
}


function updateControl (){
    var volumeUp = document.querySelector("#volumeUp");
var	volumeDown = document.querySelector("#volumeDown");
var	playPause = document.querySelector("#playPause");
   var  	toolbarPlayPause = document.querySelector("#toolbarPlayPause");
   var  	www = document.querySelector("#www");
   var audio = document.querySelector("#audio");
   var volume = audio.volume;
   var volumeInteger = 0;
   if (www && fxosnetzradio.localstorage.currentGet().www) {
      www.innerHTML = fxosnetzradio.localstorage.currentGet().www ;
   }
   if (audio) {
      var volume = audio.volume;
      if (volume) {
         volumeInteger = Math.ceil(volume * 100);
      }
   }
       if (volumeUp) {
	  volumeUp.innerHTML = 'vol+:' + volumeInteger +'of100' ;
       }
       if (volumeDown) {
	  volumeDown.innerHTML = 'vol-:' + volumeInteger +'of100' ;
       }
    if (audio) {
       if (playPause && audio.src && !(audio.readyState)) {
          playPause.innerHTML = '> no audio.readyState' ;
       }
       if (playPause && audio.played) {
	  playPause.innerHTML = '| |' ;
       }
       if (playPause && audio.played && fxosnetzradio.localstorage.currentGet().desc) {
	  playPause.innerHTML = '| | '+ fxosnetzradio.localstorage.currentGet().desc ;
       }
       if (playPause && audio.paused && audio.readyState) {
          playPause.innerHTML = '>';
       }
       if (toolbarPlayPause && audio.played && audio.src) {
    	  toolbarPlayPause.style.backgroundImage="url('images/toolbars/icons/pause.png')"; 
       }
       if (toolbarPlayPause && audio.paused && audio.src) {
    	  toolbarPlayPause.style.backgroundImage="url('images/toolbars/icons/play.png')"; 
       }
       if (playPause && audio.paused && fxosnetzradio.localstorage.currentGet().desc && audio.readyState) {
          playPause.textContent = '> ' + fxosnetzradio.localstorage.currentGet().desc ;
       }
    }

}













 
function updateValidator() {
    	var 	result=false,
		radioCurrentArray = JSON.parse(localStorage.getItem(fxosnetzradio.localstorage.currentarray));
    	if (radioCurrentArray) {
		var radioCurrent = radioCurrentArray[0];
		if (typeof radioCurrent !== 'undefined' && radioCurrent !== null) {
            		result = true;
        	}
		else {
           		console.log( 'updateValidator problem');
		}
        }
    return result;
};


function radioStatusUpdate (eventDescription) {
        var	radioCurrent = fxosnetzradio.localstorage.currentGet ();
	var	elementId = 'fxosnetzradio.view.botton';
	//var	elementId = 'radioStatus';
	var	className = 'fxosnetzradioView';
	var	view = 'myfirst';
	if (updateValidator() && (typeof radioCurrent.view !== 'undefined' && radioCurrent.view !== null)){
		view = radioCurrent.view;
		if (radioCurrent.view == "admin"){
			className = 'fxosnetzradio.view';
			elementId = 'fxosnetzradio.view.top';
		}
	}

	//var	array = fxosnetzradio.localstorage.currentarray;
	var	element = document.getElementById(elementId);
        var currentdate = new Date(); 
	var text ="";
	//var	text = + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + " " ;
		//text += '<code>' + eventDescription + '</code> ';
		//text += 'Current settings: '; 
		//text += '<hr> '; 
		text += + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + " " ;
//    	while (element.firstChild) {
  //		element.removeChild(element.firstChild);
    //	}	
  	var newElement = document.createElement("a");
	newElement.innerHTML = text;
  	//element.appendChild(newElement);
        for (var prop in radioCurrent) {
          if (radioCurrent.hasOwnProperty(prop)) {
  		var newElement = document.createElement("a");
  		newElement.dataset.this = radioCurrent[prop]; 
  		newElement.dataset.view = view; 
  		newElement.id = elementId + prop; 
		newElement.innerHTML = ' '+prop+'='+radioCurrent[prop]+' ' ;
                newElement.setAttribute('class',className);
		//text += '<a id=' + elementId + prop  + '  data-src=0 class=' + className + '>  #' + prop + ':<code>' + radioCurrent[prop] + '</code></a>';
  		//element.appendChild(newElement);
            //console.log( 'update: ' +prop+': ' +this[prop]);
	} 
       }
fxosnetzradio.localstorage.statusSet ();
		//text += radioinnerHTML (array,elementId,className);
  		var newElement = document.createElement("a");
		text = '<hr> '; 
    		text += " updatevalidator=" +updateValidator() ;
    		text += " fxosnetzradio.browserdb.ok=" +fxosnetzradio.browserdb.ok() ;
		text = '<hr> '; 
		text += " " +fxosnetzradio.browserdb.status;
		newElement.innerHTML = text ;
  		//element.appendChild(newElement);
		//element.innerHTML =  text ;
		//radioListEventListener('radioCurrent',className);
		//radioListEventListener('radioCurrent','radioStatussrc');
		//radioListEventListener('radioCurrent','radioStatusdescription');
		//radioListEventListener('radioCurrent','radioStatuspause');
        var elements = document.getElementsByClassName(className);
	for (var key in elements){
   		if(elements.hasOwnProperty(key) ){
   		var keyStr = JSON.stringify(key);
			if(JSON.stringify(key).indexOf("www") > 0 ){
    				//console.log( 'for ' + key +' in '+ elements +' classname='+ className + ' document.' + key + ' Eigenschaft: ' + elements[key] );
    				//console.log( 'for in: ' + className + ' document.' + key + ' Eigenschaft: ' + elements[key] );
    				elements[key].addEventListener('click', function(){window.open(radioCurrent.www,'_blank');}, false);   		
			}	
   			if(JSON.stringify(key).indexOf("src") > 0){
    				//console.log( 'for ' + key +' in '+ elements +' classname='+ className + ' document.' + key + ' Eigenschaft: ' + elements[key] );
    				elements[key].addEventListener('click', function(){fxosnetzradio.localstorage.radioCurrentSetAudio();audio.play();console.log( 'click: ' +key);}, false);  	
			}		
		}	
   		if(elements.hasOwnProperty(key)){
    			//console.log( 'for in: ' + className + ' document.' + key + ' Eigenschaft: ' + elements[key] );
		}	
   	}	
		
};





function radioStatusEventListener (array,className){
    var elements = document.getElementsByClassName(className),
	objects = JSON.parse(localStorage.getItem(array));
    if (elements && objects && updateValidator()) {
	for(var key in elements){
   		if(elements.hasOwnProperty(key) && className == 'radioStatus' && (key == 'radioStatusdescription' || key == 'radioStatuswww')){
    			//console.log( 'for in: ' + className + ' document.' + key + ' Eigenschaft: ' + elements[key] );
    			elements[key].addEventListener('click', function(){window.open(objects[0].www,'_blank');}, false);   		
		}	
   		if(elements.hasOwnProperty(key) && className == 'radioStatus' && key == 'radioStatussrc'){
    			//console.log( 'for in: ' + className + ' document.' + key + ' Eigenschaft: ' + elements[key] );
    			elements[key].addEventListener('click', function(){radioListTuneIn ('radioCurrent','0');}, false);   		
		}	
   	}	
    }

};





 


function radioCurrentSetAudio () {
fxosnetzradio.localstorage.radioCurrentSetAudio ();
	//var audio = document.querySelector("#audio");
	//if (updateValidator () && audio) {
	//	var radioCurrent = fxosnetzradio.localstorage.currentGet();
	 //	var srcStr = '' + fxosnetzradio.localstorage.currentGet().src;
          //      var descriptionStr = '' + fxosnetzradio.localstorage.currentGet().desc;
	//	if (radioCurrent.volume <= 1 && radioCurrent.volume > 0) {
	//	   audio.volume = radioCurrent.volume;
	//	}
	//	audio.setAttribute('src',srcStr);  
	//}
};


function radioListAdd (array,object) {
    	//console.log('' + array + '' + object.src );
	var 	radioListArray = JSON.parse(localStorage.getItem(array));
	for (var i=0; i<radioListArray.length; i++){
    		var radioList = radioListArray[i];
		if ((object.description == radioListArray[i].description) && (object.www == radioListArray[i].www) && (object.src == radioListArray[i].src) && (object.owner == radioListArray[i].owner) ) {
    			//console.log('no add' + array + ' ' + object.www + object.src + object.description );
			return;
		}
	}
	radioListArray.push(object);
    	//console.log('add' + array + ' ' + object.www + object.src + object.description );
	localStorage.setItem(array, JSON.stringify(radioListArray));
};



function radioListDel (array,selectedIndex) {
    	//console.log('' + array + '' + object.src );
	var 	radioListArray = JSON.parse(localStorage.getItem(array));
	radioListArray.splice(selectedIndex, 1);
	localStorage.setItem(array, JSON.stringify(radioListArray));
	//update();
};








function radioCurrentChangeOOS (array,object) {
	var tempArray = [];
	if (!window.localStorage.array){
		tempArray.push(object);
		localStorage.setItem(array, JSON.stringify(tempArray));
    		console.log('1 localStorage  radioCurrent set' );
    		console.log('2 change' + array + ' ' + object.www + object.src + object.description );
		return;
	}
	else {
		tempArray = JSON.parse(localStorage.getItem(array));
		if ( (object.description == tempArray.description) ) {
    			console.log('3 no change' + array + ' ' + object.www + object.src + object.description );
		}
		else {
			tempArray.push(object);
			sessionStorage.removeItem(array);
			localStorage.setItem(array, JSON.stringify(tempArray));
    			console.log('4 localStorage  radioCurrent set' );
    			console.log('5 change' + array + ' ' + object.www + object.src + object.description );
		}

	}
};



function radioListTuneIn (array,selectedIndex) {
    	console.log('radioListtuneIn: ' + array + ' ' + selectedIndex );
	radioListSelectSet (selectedIndex)
	audio.play();
};

function radioTuneIn (array,selectedIndex) {
    	console.log('radioTuneIn: ' + array + ' ' + selectedIndex );
	if (array == 'radioCurrent'){ radioCurrentSetAudio ();audio.play();}
	else if (array == 'radioList'){ radioListSelectSet (selectedIndex);audio.play();}
	else if (array == 'radios'){ audio.play();}
	else {radioListSelectSet (selectedIndex);audio.play();}
};




function radioListPause (array,selectedIndex) {
    	console.log('radioListPause: ' + array + ' ' + selectedIndex );
	//radioListSelectSet (selectedIndex)
	audio.pause();
};



function radioListListEventListener (array,buttonClass){
    var buttons = document.getElementsByClassName(buttonClass),
	objects = JSON.parse(localStorage.getItem(array));
    if (buttons && objects) {
	for(var b in buttons){
    		//console.log( 'for in: ' + buttonClass + ' document.' + b + ' Eigenschaft: ' + buttons[b] );
   		if(buttons.hasOwnProperty(b) && buttonClass == 'wwwButton' && b >= 'wwwButton0'){
    			//console.log( 'for in: ' + buttonClass + ' document.' + b + ' Eigenschaft: ' + buttons[b] );
    			//buttons[b].addEventListener('click', function(){console.log( 'EventListner: ' + this.id+ ' ' + this.innerHTML + ' ' + this.name + ' ' + this.type + this.getAttribute('data-href'));}, false);   		}	
    			//buttons[b].addEventListener('click', function(){window.open(this.getAttribute('data-href'),'_blank');}, false);   		
    			buttons[b].addEventListener('click', function(){window.open(objects[this.getAttribute('data-index')].www,'_blank');}, false);   		
		}	
   		
   		if(buttons.hasOwnProperty(b) && buttonClass == 'deleteButton' && b >= 'deleteButton0'){
    			//console.log( 'for in: ' + buttonClass + ' document.' + b + ' Eigenschaft: ' + buttons[b] );
    			//buttons[b].addEventListener('click', function(){console.log( 'EventListner: ' + this.id+ ' ' + this.innerHTML + ' ' + this.name + ' ' + this.type + this.getAttribute('data-href')); window.open(this.getAttribute('data-href'),'_blank');}, false);   		}	
    			buttons[b].addEventListener('click', function(){radioListDel ('radioList',this.getAttribute('data-index'));}, false);   		
		}	
   		if(buttons.hasOwnProperty(b) && buttonClass == 'tuneInButton' && b >= 'tuneInButton0'){
    			//console.log( 'for in: ' + buttonClass + ' document.' + b + ' Eigenschaft: ' + buttons[b] );
    			//buttons[b].addEventListener('click', function(){console.log( 'EventListner: ' + this.id+ ' ' + this.innerHTML + ' ' + this.name + ' ' + this.type + this.getAttribute('data-href')); window.open(this.getAttribute('data-href'),'_blank');}, false);   		}	
    			buttons[b].addEventListener('click', function(){radioListTuneIn ('radioList',this.getAttribute('data-index'));}, false);   		
		}	
   	}	
    }

};






function radioListList(){
	var	radioListArray = JSON.parse(localStorage.getItem("radioList")),
    		radioListDisplay = document.querySelector("#radioListDisplay");
    	if (radioListDisplay && radioListArray) {
    		while (radioListDisplay.firstChild) {
  			radioListDisplay.removeChild(radioListDisplay.firstChild);
    		}	
    		for (var i=0; i<radioListArray.length; i++){
    			var radioList = radioListArray[i],
		    	arrayStr = '' + i,
		    	wwwStr = '' + radioList.www,
		    	srcStr = '' + radioList.src,
		    	ownerStr = '' + radioList.owner,
                    	descriptionStr = '' + radioList.description + '',
		    	text = '',	
		    	newEvent  = document.createElement('li');
	        	text += '<button id=wwwButton' + arrayStr + ' data-index=' + arrayStr +   ' class=wwwButton type=button>Web: ' + descriptionStr + ' [' + arrayStr + ']</button>';
	        	text += '<button id=tuneInButton' + arrayStr + ' data-index=' + arrayStr + ' class=tuneInButton type=button>Tune in: ' + descriptionStr + ' [' + arrayStr + ']</button>';
	        	text += '<button id=deleteButton' + arrayStr + ' data-index=' + arrayStr + ' class=deleteButton type=button>Delete: ' + descriptionStr + ' [' + arrayStr + ']</button>';
	        	text += '<br>[' + arrayStr + '] Audio source:<code> ' + srcStr + '</code>';
	        	text += '<br>[' + arrayStr + '] Owner: <code>' + ownerStr + '</code>';
	        	text += '<br>[' + arrayStr + ']';
			//for (var key in radioList) {
			//	text += ' - <a id=radioList' + key + arrayStr + '  data-index=' + arrayStr + ' class=radioListList>' + key + ': <code>' + radioList[key] + '</code></a>';
			//}
			newEvent.innerHTML = text;
			radioListDisplay.appendChild(newEvent);
		}  

    	}

};



function radioListSelectSet (selectedIndex){

// select radio
    //var radioListSelect = document.querySelector("#radioListSelect"),
  	//radioListSelection = radioListSelect.selectedIndex,
    var audio = document.querySelector("#audio"),
	radioCurrentArray = JSON.parse(sessionStorage.getItem("radioCurrent")),
	radioListArray = JSON.parse(localStorage.getItem("radioList"));
    //if (radioListSelect && audio && radioListArray && radioCurrentArray) {
    if (audio && radioListArray) {
	//var myArrayObject = JSON.parse(localStorage.getItem("radioList")),
	//radioListArray = JSON.parse(localStorage.getItem("radioList")),
	//radioCurrentArray = JSON.parse(sessionStorage.getItem("radioCurrent")),
  	//radioListSelection = radioListSelect.selectedIndex,
	var 	radioListSelectedArray = radioListArray[selectedIndex],
		tempArray = [];
	tempArray.push(radioListSelectedArray);
	//sessionStorage.removeItem("radioCurrent");
	//sessionStorage.clear();
	localStorage.removeItem("radioCurrent");
	//sessionStorage.setItem("radioCurrent", JSON.stringify(tempArray));
	localStorage.setItem("radioCurrent", JSON.stringify(tempArray));
	var 	radioCurrentArray = JSON.parse(localStorage.getItem("radioCurrent")),
		radioCurrent = radioCurrentArray[0],
		srcStr = '' + radioCurrent.src,
                descriptionStr = '' + radioCurrent.description;
       	audio.setAttribute('src',srcStr);
    	console.log( 'radioListSelectSet: ' + selectedIndex + srcStr );

    }

};


function radioListListZwei (array,elementId,className ){
	var	objects = JSON.parse(localStorage.getItem(array)),
		element = document.getElementById(elementId),
	 	radioStatus = document.querySelector("#radioStatus");
    	if (objects && element) {
		var text = '';	
		text += radioinnerHTML (array,elementId,className);
		element.innerHTML =  text ;
    	}

};

//radioListEventListener('radioCurrent','radioStatus');
function radioListEventListener (array,className){
    var buttons = document.getElementsByClassName(className),
	objects = JSON.parse(localStorage.getItem(array)),
     	buttonClass = className,
	elements = document.getElementsByClassName(className);
    if (elements && objects && className) {
	for(var b in elements){
    		//console.log( 'for in: ' + className + ' document.' + b + ' Eigenschaft: ' + elements[b] );
   		if(elements.hasOwnProperty(b) 
		&& (className == 'radioListAlldescription' || className == 'radioListAllwww' || className == 'radioStatuswww' || className == 'radioStatusdescription') 
		&& ( b >= 'radioListAlldescription0' || b >= 'radioListAllwww0' || b >= 'radioListAlldescription0' || b >= 'radioStatusdescription0' || b >= 'radioStatuswww0')){
    			//console.log( 'for in if: ' + className + ' document.' + b + ' Eigenschaft: ' + elements[b] );
    			buttons[b].addEventListener('click', function(){window.open(objects[this.getAttribute('data-index')].www,'_blank');}, false);   		
		}	
   		if(elements.hasOwnProperty(b) 
		&& (className == 'radioListAlldelete' ) 
		&& ( b >= 'radioListAlldescription0' || b >= 'radioListAllwww0' || b >= 'radioListAlldescription0' || b == 'radioStatusdescription' || b == 'radioStatuswww')){
   		
    			//console.log( 'for in if: ' + className + ' document.' + b + ' Eigenschaft: ' + elements[b] );
    			buttons[b].addEventListener('click', function(){radioListDel (array,this.getAttribute('data-index'));}, false);   		
		}	
   		if(elements.hasOwnProperty(b)
		&& (className == 'radioListAllsrc' || className == 'radioStatussrc') 
		&& ( b >= 'radioListAllsrc0' || b == 'radioStatussrc0')){
    			//console.log( 'for in if: ' + className + ' document.' + b + ' Eigenschaft: ' + elements[b] );
    			elements[b].addEventListener('click', function(){radioTuneIn (array,this.getAttribute('data-index'));}, false);   		
		}	
   		if(elements.hasOwnProperty(b) && JSON.stringify(className).indexOf("pause") > 0) {
    			//console.log( 'for in if: ' + className + ' document.' + b + ' Eigenschaft: ' + elements[b] );
    			elements[b].addEventListener('click', function(){radioListPause (array,this.getAttribute('data-index'));}, false);   		
		}	
   		if(elements.hasOwnProperty(b) && JSON.stringify(className).indexOf("delete") > 0) {
    			//console.log( 'for in if: ' + className + ' document.' + b + ' Eigenschaft: ' + elements[b] );
    			elements[b].addEventListener('click', function(){radioListDel (array,this.getAttribute('data-index'));}, false);   		
		}	
   	}	
    }

};


//radioinnerHTML ( 'radioCurrent' , 'radioStatus', 'radioStatus');
function radioinnerHTML ( array , elementId ,className ){
	var	objects = JSON.parse(localStorage.getItem(array)),
		element = document.getElementById(elementId),
		text = '';
    	if (objects && element && className) {
    		for (var i=0; i<objects.length; i++){
			for (var key in objects[i]) {
            			//console.log( 'render: ' +key+': ' +this[key]);
				//text += '<a id=' + elementId + key + i + '  data-index=' + i + ' class=' + className + key + '>  #' + array +'.[' + i + '].' + key + ':<code>' + (objects[i])[key] + '</code></a>';
				text += '<a id=' + elementId + key + i + '  data-index=' + i + ' class=' + className + key + '>  #' + key + ':<code>' + (objects[i])[key] + '</code></a>';
			}
			text += '<a id=' + elementId + 'pause' + i + '  data-index=' + i + ' class=' + className + 'pause' + '>  #pause</a>';
			text += '<a id=' + elementId + 'delete' + i + '  data-index=' + i + ' class=' + className + 'delete' + '>  #delete</a>';
		text += '<br>';
		}  
    	}
	else{ 
		return text;
	}
	return text;

};


function radioListFormRadio () {
	var 	radioListArray = JSON.parse(localStorage.getItem("radioList")),
    		radioListDisplay = document.querySelector("#radioListDisplay"),
    		radioCurrentArray = JSON.parse(localStorage.getItem("radioCurrent")),
		radioCurrent = radioCurrentArray[0],
		element = document.getElementById('radioListFormRadio'),
		text = '',
    		radioListSelect = document.querySelector("#radioListFormRadio");
	if (element) {
    		while (element.firstChild) {
  		element.removeChild(element.firstChild);
    		}	
		for (var i=0; i<radioListArray.length; i++){
    			var 	radioList = radioListArray[i],
				arrayStr = '' + i,
				srcStr = '' + radioList.src,
                		descriptionStr = '' + radioList.description,
				elementType = 'radio',
				elementName = 'radioListFormRadios',
				elementId = 'radioListFormRadio' + i;
    			//console.log("Array: " + i, " description: " + radioList.description + " src: " + radioList.src);
			if (radioCurrent && radioCurrent !== 'undefined' && radioCurrent !== null) {
				if (radioList.description == radioCurrent.description) {
					text += '<input id=' + elementId + ' type=' + elementType + ' name=' + elementName + ' value=' + i + ' checked=checked> </input>';
				}
				else {
					text += '<input id=' + elementId + ' type=radio name=' + elementName + ' value=' + i + '> </input>';
				
				}
			}
			text += '<label for=' + elementId + ' form=radioListFormRadio>' + descriptionStr + '</label>';
			element.innerHTML =  text ;
		}  
		if (updateValidator ()) {
			var rad = document.radioListFormRadio.radioListFormRadios;
            		var prev = null;
            		for(var i = 0; i < rad.length; i++) {
                		rad[i].onclick = function() {
                		(prev)? console.log(prev.value):null;
                    		if(this !== prev) {
                        		prev = this;
                    		}
                		console.log(this.value)
    				radioTuneIn ('radioList',this.value);   		
                		};
            		}
		}  

	}  

};

