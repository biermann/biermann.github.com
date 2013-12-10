nmp.audio.init1 = function (e) {
   nmp.audio.statusSet = function (eventDescription) {
      var audio = document.querySelector("#audio");
      //var db = fxosnetzradio.browserdb.db;
      var	elementId = 'radioStatus';
      var	element = document.getElementById(elementId);
      var	className = 'nmpView';
      var 	currentdate = new Date(); 
      var text = "";
      text +=  currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds() + " ";
      text +=  JSON.stringify(eventDescription);
      text +=  ' oggSupport=' + audio.canPlayType('audio/ogg;'); 
      text +=  ' mp3Support=' + audio.canPlayType('audio/mpeg;'); 
      nmp.audio.status = text;
      if (element) { element.textContent = text; }
  }
}




nmp.audio.play = function(e) {
   var audio = document.querySelector("#audio");
   var audioSrcStr = audio.src.toString() ;
   var audioVolume = audio.volume ;
   var currentSrcStr = nmp.storage.currentGet().src.toString() ;
   var currentVolume = nmp.storage.currentGet().volume ;
   var currentTypeStr = nmp.storage.currentGet().type.toString() ;
   var fastlaneSrcStr;
   if (typeof e !== 'undefined') {fastlaneSrcStr = e.toString();}
   var a = audio.src.substr(0,20) ;
   var b = nmp.storage.currentGet().src.substr(0,20) ;
   if (updateValidator () && audio ) {
      if (currentVolume <= 1 && currentVolume > 0 && audioVolume !== currentVolume) {
         audio.setAttribute('volume',currentVolume);
      	 console.log( 'fxosnetzradio.audio.play.volume=' +currentVolume );
      }
      //console.log( 'fxosnetzradio.localstorage.radioCurrentSetAudio: ' +String(radioCurrent.src) );
      if (currentSrcStr !== audioSrcStr && typeof fastlaneSrcStr == 'undefined') {
	 audio.setAttribute('src',currentSrcStr);
	 audio.setAttribute('type',currentTypeStr);
      	 console.log( 'fxosnetzradio.audio.play.src=' +currentSrcStr );
      	 console.log( 'fxosnetzradio.audio.prepare.type=' +currentTypeStr );
      }
      if (fastlaneSrcStr !== audioSrcStr && typeof fastlaneSrcStr !== 'undefined') {
	 audio.setAttribute('src',fastlaneSrcStr);
      	 console.log( 'fxosnetzradio.audio.prepare.src=' +fastlaneSrcStr );
      }
      //if (audioSrcStr == "http://stop/") {fxosnetzradio.localstorage.radioCurrentSetAudio();}   
  audio.play();
  }
}

nmp.audio.prepare = function(e) {
   var audio = document.querySelector("#audio");
   var audioSrcStr = audio.src.toString() ;
   var audioVolume = audio.volume ;
   var currentSrcStr = nmp.storage.currentGet().src.toString() ;
   var currentVolume = nmp.storage.currentGet().volume ;
   var currentTypeStr = nmp.storage.currentGet().type.toString() ;
   var fastlaneSrcStr;
   if (typeof e !== 'undefined') {fastlaneSrcStr = e.toString();}
   var a = audio.src.substr(0,20) ;
   var b = nmp.storage.currentGet().src.substr(0,20) ;
      	 console.log( 'fxosnetzradio.audio.play.volume=' +currentVolume );
   if (updateValidator () && audio ) {
      	 console.log( 'fxosnetzradio.audio.prepare.volume=' +currentVolume );
      if (currentVolume <= 1 && currentVolume > 0 && audioVolume !== currentVolume) {
         audio.setAttribute('volume',currentVolume.toString());
      	 console.log( 'fxosnetzradio.audio.prepare.volume.set from '+audioVolume+" to " +currentVolume );
      }
      //console.log( 'fxosnetzradio.localstorage.radioCurrentSetAudio: ' +String(radioCurrent.src) );
      if (currentSrcStr !== audioSrcStr && typeof fastlaneSrcStr == 'undefined') {
	 audio.setAttribute('src',currentSrcStr);
	 audio.setAttribute('type',currentTypeStr);
      	 console.log( 'fxosnetzradio.audio.prepare.src=' +currentSrcStr );
      	 console.log( 'fxosnetzradio.audio.prepare.type=' +currentTypeStr );
      }
      if (fastlaneSrcStr !== audioSrcStr && typeof fastlaneSrcStr !== 'undefined') {
	 audio.setAttribute('src',fastlaneSrcStr);
      	 //console.log( 'fxosnetzradio.audio.prepare.src=' +fastlaneSrcStr );
      }
      //if (audioSrcStr == "http://stop/") {fxosnetzradio.localstorage.radioCurrentSetAudio();}   
  }
};

nmp.audio.pause = function(e) {
  var audio = document.querySelector("#audio");
  if (updateValidator () && audio ) {
    audio.pause(); 
    if (typeof e !== 'undefined' && e == "stop") {
      audio.src = '';       
    }
  }
};


nmp.audio.volume = function(e) {
  var audio = document.querySelector("#audio");
  if (e >= 1) {
     e = 0.99;
  }
  if (e <= 0.1) {
     e = 0.1;
  }
  if (updateValidator () && audio && e ) {
    audio.volume = e;
  }
};




function prepareStreamLog(eventDescription) {

var srcStr = 'src: ' + audio.src;
var volumeInteger = Math.ceil(audio.volume * 100);
//var volumeStr = 'volume: ' + audio.volume;
//var volumeStr = 'volumechange - volume: ' + audio.volume;
var volumeStr = 'volume new: '+ volumeInteger +' of 100';
//var samplerate = audio.mozSrcObject.toString();
var readyStateStr = 'readyState: ' + audio.readyState;
var track = audio.track;
var textTracks = audio.textTracks;
//var textTrack = textTracks[0];
//var kind = textTrack.kind ;
//var mode = textTrack.mode;

//updateStreamLog(' ' + eventDescription + ' textTrack: ' + textTrack + ' src: ' + src +  ' mode: ' + mode + ' kind: ' + kind +'</strong>');
updateStreamLog(' ' + eventDescription + ' ' + srcStr + ' ' + readyStateStr + ' ' + volumeStr + '</strong>');
if('vibrate' in navigator) {
    navigator.vibrate(100);
}
}


function updateStreamLog(eventDescription) {
var newEvent = document.createElement('li');
newEvent.innerHTML = eventDescription;
var element = document.getElementById("stream");
//radioStatusUpdate (eventDescription);
//fxosnetzradio.audio.statusSet (eventDescription);
//while (element.firstChild) {
//  element.removeChild(element.firstChild);
//}
//stream.appendChild(newEvent);
}


function updateEventLog(eventDescription) {
var newEvent = document.createElement('li');
newEvent.innerHTML = 'Audioevent: ' + eventDescription;
var element = document.getElementById("debug");
nmp.audio.statusSet (eventDescription);
//while (element.firstChild) {
//  element.removeChild(element.firstChild);
//}
//debug.appendChild(newEvent);
}


nmp.audio.init2 = function (e) {
   var audio = document.getElementById('audio');
   var text = '';
   if (audio) {
      audio.addEventListener('abort',function () {
	 text = 'abort';
         nmp.audio.statusSet (text);
      }, false);
      audio.addEventListener('canplay',function () {
         updateEventLog('canplay');
         text = 'canplay' + audio.src + '' ;
         nmp.audio.statusSet (text);
      }, false);
      audio.addEventListener('canplaythrough',function () {
	 text = 'canplaythrough - The file ' + audio.src +' is loaded' ;
         nmp.audio.statusSet (text);
      }, false);
audio.addEventListener('canshowcurrentframe',function () {
updateEventLog('canshowcurrentframe');
}, false);
audio.addEventListener('dataunavailable',function () {
updateEventLog('dataunavailable');
}, false);
audio.addEventListener('durationchange',function () {
updateEventLog('durationchange');
}, false);
audio.addEventListener('loadedmetadata',function () {
	var 	channels          = audio.mozChannels,
		rate              = audio.mozSampleRate,
		frameBufferLength = audio.mozFrameBufferLength, 
		loadedmetadataStr = 'loadedmetadata: ' + channels + rate + frameBufferLength ;
		updateEventLog(''+ loadedmetadataStr +'');
}, false);

audio.addEventListener('emptied',function () {
updateEventLog('emptied');
}, false);

audio.addEventListener('empty',function () {
updateEventLog('empty');
}, false);

audio.addEventListener('ended',function () {
updateEventLog('ended');
}, false);

audio.addEventListener('error',function () {
var newError = document.createElement('li');
	 text = '';
         nmp.audio.statusSet (text);
newError.innerHTML = '<strong>error code: ' + audio.error.code + '</strong>';
//report additional detail in a nested <ul>
var errorDetail = document.createElement('ul');

//error code (in text)
var errorCode = document.createElement('li');
switch (audio.error.code) {
case audio.error.MEDIA_ERR_ABORTED:
text += 'Error: MEDIA_ERR_ABORTED';
break;
case audio.error.MEDIA_ERR_NETWORK:
text += 'Error: MEDIA_ERR_NETWORK';
break;
case audio.error.MEDIA_ERR_DECODE:
text += 'Error: MEDIA_ERR_DECODE';
break;
case audio.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
text += 'Error: MEDIA_ERR_SRC_NOT_SUPPORTED';
break;
default:
text += 'Error: unknown';
break;
}

//networkState
var networkState = document.createElement('li');
var networkStateStr = 'networkState: ' + audio.networkState;
switch (audio.networkState) {
case 0:
networkStateStr += ' (NETWORK_EMPTY)';
break;
case 1:
networkStateStr += ' (NETWORK_IDLE)';
break;
case 2:
networkStateStr += ' (NETWORK_LOADING)';
break;
case 3:
networkStateStr += ' (NETWORKING_NO_SOURCE)';
break;
default:
networkStateStr += ' (unknown networkState)';
break;
}
text += networkStateStr;

         nmp.audio.statusSet (text);
}, false);

audio.addEventListener('loadeddata',function () {
updateEventLog('loadeddata');
}, false);

audio.addEventListener('loadedmetadata',function () {
updateEventLog('loadedmetadata');
}, false);

audio.addEventListener('loadstart',function () {
updateEventLog('loadstart');
}, false);

audio.addEventListener('mozaudioavailable',function () {
updateEventLog('mozaudioavailable');
}, false);

audio.addEventListener('pause',function () {
var src = audio.src.toString();
updateEventLog('pause: ' + src + '');
}, false);

audio.addEventListener('play',function () {
var src = audio.src.toString();
updateEventLog('play: '  + src + '');
}, false);

audio.addEventListener('ratechange',function () {
var src = audio.src.toString();
updateEventLog('ratechange '  + src + '');
//updateEventLog('ratechange');
}, false);

audio.addEventListener('seeked',function () {
updateEventLog('seeked');
}, false);

audio.addEventListener('seeking',function () {
updateEventLog('seeking');
}, false);

audio.addEventListener('suspend',function () {
updateEventLog('suspend');
}, false);

audio.addEventListener('volumechange',function () {
var volumeInteger = Math.ceil(audio.volume * 100);
//var volumeStr = 'volumechange - volume: ' + audio.volume;
updateEventLog('volumechange: new: '+ volumeInteger +' of 100');
//updateEventLog('volumechange');
}, false);

audio.addEventListener('waiting',function () {
updateEventLog('waiting');
}, false);  

}
}


