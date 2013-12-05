nmp.app.toolbar = function (e) {
	var audio = document.querySelector("#audio");

// menu
    	var menu = document.querySelector("#toolbarMenu");
    	if (audio && menu) {
        	menu.onclick = function () {		
	         	nmp.view.rotate('left');	
	        var oldObj = nmp.storage.currentGet();
	        var current = nmp.storage.currentGet();
		var newObj ={};
		var next = 0;
		var last = nmp.view.option.length - 1;
		var exist = false;
		nmp.app.vibrate();
     		for (var i in nmp.view.option) {
     			if (nmp.view.option[i] == oldObj.view){exist = true;}
     		}
		for (var i=0; i<last; i++){
		next++;
		   if (nmp.view.option[i] == oldObj.view){
			newObj.view = nmp.view.option[next];
	                current = nmp.storage.currentGet();
			current.view = nmp.view.option[next];
			//nmp.storage.currentSet(current);
			//nmp.app.update();
                        nmp.storage.statusSet();
			break;
		   }	
    		}
       		if (nmp.view.option[last] == oldObj.view) {
			newObj.view = nmp.view.option[0];
			current.view = nmp.view.option[0];
			//nmp.storage.currentSet(current);
			//nmp.app.update();
                        nmp.storage.statusSet();
			nmp.db.statusSet ();
       		}
       		if (current.view === undefined || !exist || oldObj.view == '') {
			current.view = "biermann";
			//nmp.storage.currentSet(current);
			//nmp.app.update();
                        nmp.storage.statusSet();
       		}
        };
    }

// play pause radio
    var playPause = document.querySelector("#toolbarPlayPause");
    if (audio && playPause) {
        playPause.onclick = function () {			
		nmp.app.vibrate();
		if (audio.paused || audio.ended){
			nmp.audio.play();
                        updateControl ();
                }
		else	{
			nmp.audio.pause('pause');
                        nmp.storage.statusSet();
                        updateControl ();
			}		
        };
    }


// volumeDown
    var volumeDown = document.querySelector("#toolbarVolumeDown");
    if (volumeDown && audio) {
        volumeDown.onclick = function () {
		nmp.app.vibrate();
		var volume = audio.volume;
		if (volume == 0.99) {
		volume = volume - 0.04;
		}
		else {
		volume = volume - 0.05;
		}
		if (volume <= 0.1) {
		volume = 0.1;
		}
		audio.volume = volume;
		nmp.storage.currentUpdate();
                updateControl ();
                nmp.storage.statusSet();
        };
    }


// volumeUp
    var volumeUp = document.querySelector("#toolbarVolumeUp");
	audio = document.querySelector("#audio");
    if (volumeUp && audio) {
        volumeUp.onclick = function () {
		nmp.app.vibrate();
		var volume = audio.volume;
		volume = volume + 0.05;
		if (volume >= 1) {
		volume = 0.99;
		}
		audio.volume = volume;
		nmp.storage.currentUpdate();
                updateControl ();
                nmp.storage.statusSet();
        }

    }



// Reload content
	var reload = document.querySelector("#reload");
	if (reload) {
    		reload.onclick = function () {
		nmp.app.vibrate();
        		location.reload(true);
    		}
	}

// stop radio
	var stop = document.querySelector("#toolbarStop");
    	if (audio && stop) {
        	stop.onclick = function () {			
			nmp.app.vibrate();
			nmp.audio.pause("stop");
			nmp.app.updateControl ();
                        nmp.storage.statusSet();
        	}
    	}

};

