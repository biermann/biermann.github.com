nmp.app.toolbar = function (e) {
	var audio = document.querySelector("#audio");

// menu
    	var menu = document.querySelector("#toolbarMenu");
    	if (audio && menu) {
        	menu.onclick = function () {		
		   	nmp.app.vibrate();
	         	//nmp.view.rotate('right');
			nmp.view.update('drawer');	
       		}
        }

// play pause radio
    var playPause = document.querySelector("#toolbarPlayPause");
    if (audio && playPause) {
        playPause.onclick = function () {			
		nmp.app.vibrate();
		if (audio.paused || audio.ended){
			nmp.audio.play();
                        nmp.app.updateControl ();
                }
		else	{
			nmp.audio.pause('pause');
                        nmp.storage.statusSet();
                        nmp.app.updateControl ();
			}		
        };
    }


// volumeDown
    var volumeDown = document.querySelector("#toolbarVolumeDown")
    var current = nmp.storage.currentGet();
    if (volumeDown && current) {
        volumeDown.onclick = function () {
		nmp.app.vibrate();
                var volume = nmp.storage.currentGet().volume;
		//var volume = current.volume;
		if (volume == 0.99) {
		volume = volume - 0.04;
		}
		else {
		volume = volume - 0.05;
		}
		if (volume <= 0.1) {
		volume = 0.1;
		}
		nmp.audio.volume(volume);
		current.volume = volume;
<<<<<<< HEAD
                var result = nmp.storage.current.updateField('volume',current.volume,'toolbar volumeDown update 85478432');
=======
		nmp.storage.currentSet(current);
>>>>>>> b44cfadfc4e184016e8cc2b20b3e3613dc2c702e
                nmp.app.updateControl ();
                nmp.storage.statusSet();
        };
    }


// volumeUp
    var volumeUp = document.querySelector("#toolbarVolumeUp");
    var current = nmp.storage.currentGet();
    if (volumeUp) {
        volumeUp.onclick = function () {
		nmp.app.vibrate();
                var volume = nmp.storage.currentGet().volume;
		//var volume = current.volume;
		volume = volume + 0.05;
		if (volume >= 1) {
		volume = 0.99;
		}
		nmp.audio.volume(volume);
		current.volume = volume;
<<<<<<< HEAD
                var result = nmp.storage.current.updateField('volume',current.volume,'toolbar volumeUp update 8548432');
=======
		nmp.storage.currentSet(current);
>>>>>>> b44cfadfc4e184016e8cc2b20b3e3613dc2c702e
                nmp.app.updateControl ();
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

