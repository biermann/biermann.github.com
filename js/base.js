var nmp = {};

nmp.app = {};
Object.defineProperty(nmp.app, 'version', {
  enumerable: true, 
  writable: false, 
  value: "20171004", 
  configurable: false
});

nmp.app.settings = {};
Object.defineProperty(nmp.app.settings, 'vibrate', {
  enumerable: true, 
  writable: false, 
  value: "boolean", 
  configurable: false
});
Object.defineProperty(nmp.app.settings, 'reset current', {
  enumerable: true, 
  writable: false, 
  value: "click", 
  configurable: false
});
Object.defineProperty(nmp.app.settings, 'debug', {
  enumerable: true, 
  writable: false, 
  value: "boolean", 
  configurable: false
});

nmp.app.radio = {};
Object.defineProperty(nmp.app.radio, 'name', {
  enumerable: true, 
  writable: false, 
  value: "radios", 
  configurable: false
});
Object.defineProperty(nmp.app.radio, 'field', {
  enumerable: true, 
  writable: false, 
  value: ["objId","objOwner","src","desc","www","type","usageCounter","lastUsed","fav"], 
  configurable: false
});
Object.defineProperty(nmp.app.radio, 'store', {
  enumerable: true, 
  writable: false, 
  //value: ["db","storage","icecast"], 
  value: ["db"], 
  configurable: false
});

Object.defineProperty(nmp.app.radio, 'readonlyObj', {
  enumerable: true, 
  writable: false, 
  configurable: false,
  value:   [
    
  { objId: "11", src: "https://audioasyl.net/m3u/live.php", desc: "Audioasyl.m3u for iOS11", www: 'http://audioasyl.net/', type: "audio/x-mpequrl", objOwner: "biermann" },
  { objId: "10", src: "http://stream.srg-ssr.ch/drsvirus/mp3_128.m3u", desc: "Virus.m3u for iOS11", www: 'http://www.virus.ch/', type: "audio/x-mpequrl", objOwner: "biermann" },
  { objId: "9", src: "http://stream.stadtfilter.net:8406/stadtfilter.mp3", desc: "Stadtfilter", www: 'http://stadtfilter.net/', type: "audio/mpeg", objOwner: "biermann" },
  { objId: "8", src: "http://ice.somafm.com/sf1033", desc: "SF 10-33", www: 'http://somafm.com/', type: "audio/mpeg", objOwner: "biermann" },
  { objId: "7", src: "http://internationalradiofestival.ice.infomaniak.ch/radio-live.mp3", desc: "IRF", www: 'http://www.internationalradiofest.com/', type: "audio/mpeg", objOwner: "biermann" },
  { objId: "5", src: "http://livestream.lora.ch/lora.mp3", desc: "LoRa", www: 'http://www.lora.ch/', type: "audio/mpeg", objOwner: "biermann" },
  { objId: "4", src: "http://radio.hbr1.com:19800/tronic.ogg", desc: "HBR1 Tronic", www: 'http://www.hbr1.com/', type: "audio/ogg", objOwner: "biermann" },
  { objId: "3", src: "http://stream-4.ssatr.ch:80/virus/mp3", desc: "Virus", www: "http://www.virus.ch/", type: "audio/mpeg", objOwner: "biermann" },
  { objId: "2", src: "http://radio1190.colorado.edu:8000/low.ogg", desc: "Radio 1190", www: "http://www.radio1190.org/", type: "audio/ogg", objOwner: "biermann" },
  { objId: "1", src: "http://trace.dnbradio.com/dnbradio.mp3", desc: "DNBRadio", www: 'http://dnbradio.com/', type: "audio/mpeg", objOwner: "biermann" }
]
});




nmp.audio = {};
Object.defineProperty(nmp.audio, 'status', {
  enumerable: true, 
  writable: true, 
  value: "", 
  configurable: false
});

nmp.storage = {};
Object.defineProperty(nmp.storage, 'name', {
  enumerable: true, 
  writable: false, 
  //value: "radioCurrent", 
  value: "n/a", 
  configurable: false
});
Object.defineProperty(nmp.storage, 'status', {
  enumerable: true, 
  writable: true, 
  value: "", 
  configurable: false
});
Object.defineProperty(nmp.storage, 'field', {
  enumerable: true, 
  writable: false, 
  value: ["objId","objOwner","src","desc","www","type","volume","vibrate","view","store"], 
  configurable: false
});

nmp.storage.current = {};
Object.defineProperty(nmp.storage.current, 'name', {
  enumerable: true, 
  writable: false, 
  value: "radioCurrent", 
  configurable: false
});
Object.defineProperty(nmp.storage.current, 'field', {
  enumerable: true, 
  writable: false, 
  value: ["objId","objOwner","src","desc","www","type","volume","vibrate","view","store","debug","storePrefered"], 
  configurable: false
});

nmp.storage.radio = {};
Object.defineProperty(nmp.storage.radio, 'name', {
  enumerable: true, 
  writable: false, 
  value: "radios", 
  configurable: false
});
Object.defineProperty(nmp.storage.radio, 'field', {
  enumerable: true, 
  writable: false, 
  value: ["objId","objOwner","src","desc","www","type","usageCounter","lastUsed"], 
  configurable: false
});

nmp.view = {};
Object.defineProperty(nmp.view, 'option', {
  enumerable: true, 
  writable: false, 
  //value: ["recent10","listIndexedDB","listStorage","icecastOgg","icecastMpeg","biermann","myRadio","listMyRadio","audio/ogg","audio/mpeg","status","settings"], 
  //value: ["drawer","recent10","listIndexedDB","listStorage","biermann","myRadio","listMyRadio","fav","audio/ogg","audio/mpeg","status","settings"], 
  //value: ["drawer","listIndexedDB","biermann","fav","listMyRadio","status","settings"], 
  value: ["Launchpad","listIndexedDB","biermann","fav","listMyRadio","status","settings"], 
  configurable: false
});
Object.defineProperty(nmp.view, 'list', {
  enumerable: true, 
  writable: false, 
  //value: ["desc","src","type","www","delete","edit","pause","stop","duplicate","lastUsed","usageCounter","objId","store"], 
  //value: ["desc","src","type","www","delete","edit","pause","stop","duplicate"], 
  value: ["desc","src","type","www","delete","edit","pause","stop","duplicate","store","objId","fav"], 
  configurable: false
});
Object.defineProperty(nmp.view, 'class', {
  enumerable: true, 
  writable: false, 
  value: 'nmpView', 
  configurable: false
});

nmp.toolbar = {};
Object.defineProperty(nmp.toolbar, 'class', {
  enumerable: true, 
  writable: false, 
  value: 'nmpToolbar', 
  configurable: false
});


nmp.db = {};
Object.defineProperty(nmp.db, 'version', {
  enumerable: true, 
  writable: false, 
  value: "45", 
  configurable: false
});
Object.defineProperty(nmp.db, 'name', {
  enumerable: true, 
  writable: false, 
  //value: "radio", 
  value: "n/a", 
  configurable: false
});
Object.defineProperty(nmp.db, 'status', {
  enumerable: true, 
  writable: true, 
  value: "", 
  configurable: false
});


nmp.db.radio = {};
Object.defineProperty(nmp.db.radio, 'name', {
  enumerable: true, 
  writable: false, 
  value: "radios", 
  configurable: false
});
Object.defineProperty(nmp.db.radio, 'field', {
  enumerable: true, 
  writable: false, 
  value: ["objId","objOwner","src","desc","www","type","usageCounter","lastUsed","fav"], 
  configurable: false
});
Object.defineProperty(nmp.db.radio, 'formField', {
  enumerable: true, 
  writable: false, 
  value: ["src","desc","www","type","fav"], 
  configurable: false
});
Object.defineProperty(nmp.db.radio, 'checksumField', {
  enumerable: true, 
  writable: false, 
  value: ["src","desc","www","type","fav"], 
  configurable: false
});
Object.defineProperty(nmp.db.radio, 'readonlyObjOwner', {
  enumerable: true, 
  writable: false, 
  value: ["biermann"],
  configurable: false
});

Object.defineProperty(nmp.db.radio, 'readonlyObj', {
  enumerable: true, 
  writable: false, 
  configurable: false,
  value:   [
  { objId: "5", src: "http://livestream.lora.ch/lora.mp3", desc: "LoRa", www: 'http://www.lora.ch/', type: "audio/mpeg", objOwner: "biermann" },
  { objId: "4", src: "http://radio.hbr1.com:19800/tronic.ogg", desc: "HBR1 Tronic", www: 'http://www.hbr1.com/', type: "audio/ogg", objOwner: "biermann" },
  { objId: "3", src: "http://stream-4.ssatr.ch:80/virus/mp3", desc: "Virus", www: "http://www.virus.ch/", type: "audio/mpeg", objOwner: "biermann" },
  { objId: "2", src: "http://radio1190.colorado.edu:8000/low.ogg", desc: "Radio 1190", www: "http://www.radio1190.org/", type: "audio/ogg", objOwner: "biermann" },
  { objId: "1", src: "http://88.198.34.209:13128/nometa.ogg", desc: "DNBRadio", www: 'http://dnbradio.com/', type: "audio/ogg", objOwner: "biermann" }
]
});

nmp.touch = {};

nmp.tempArray = [];

//to delete
var fxosnetzradio = {};
const radioDBrecent = "recent";
const radioDBbookmark = "bookmark";
fxosnetzradio.indexedDB = {};
fxosnetzradio.indexedDB.db = null;
//const fxosnetzradioView = ["recent10","myfirst","list","form","top","biermann","myRadio","recent"];
//fxosnetzradio.view.option = fxosnetzradioView;
//fxosnetzradio.view.option = ["recent10","myfirst","list","form","top","biermann","myRadio","recent"];
fxosnetzradio.localstorage = {};
fxosnetzradio.browserdb = {};
fxosnetzradio.browserdb.db = null;
fxosnetzradio.browserdb.status = null;
const radioDBstore = "radios";
const radioDBname = "radio";
const radioDBversion = 39;
fxosnetzradio.browserdb.radioDBname = radioDBname;
fxosnetzradio.view = {};
fxosnetzradio.localstorage.currentarray = "radioCurrent";
nmp.storage.currentarray = "radioCurrent";



window.onload = function prepatory() {


//audio = document.getElementById('audio');
//if (audio) {audio.volume = .5;}


nmp.audio.init1();
nmp.app.init();
nmp.db.init();
nmp.app.toolbar();
nmp.storage.init();
nmp.storage.init2();
nmp.audio.init2();
nmp.touch.init();
nmp.audio.prepare();
nmp.app.update();
//nmp.view.update();
nmp.app.updateControl();

};

