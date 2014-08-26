var nmp = {};

nmp.app = {};
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
  value: ["objId","objOwner","src","desc","www","type","usageCounter","lastUsed"], 
  configurable: false
});
Object.defineProperty(nmp.app.radio, 'store', {
  enumerable: true, 
  writable: false, 
  value: ["db","storage","icecast"], 
  configurable: false
});

Object.defineProperty(nmp.app.radio, 'readonlyObj', {
  enumerable: true, 
  writable: false, 
  configurable: false,
  value:   [
  { objId: "7", src: "http://internationalradiofestival.ice.infomaniak.ch/radio-live.mp3", desc: "IRF", www: 'http://www.internationalradiofest.com/', type: "audio/mpeg", objOwner: "biermann" },
  { objId: "6", src: "http://germany-rinse.it.two.dnbradio.com:10128", desc: "DNBRadio", www: 'http://dnbradio.com/', type: "audio/mpeg", objOwner: "biermann" },
  { objId: "5", src: "http://livestream.lora.ch/lora.mp3", desc: "LoRa", www: 'http://www.lora.ch/', type: "audio/mpeg", objOwner: "biermann" },
  { objId: "4", src: "http://radio.hbr1.com:19800/tronic.ogg", desc: "HBR1 Tronic", www: 'http://www.hbr1.com/', type: "audio/ogg", objOwner: "biermann" },
  { objId: "3", src: "http://stream-4.ssatr.ch:80/virus/mp3", desc: "Virus", www: "http://www.virus.ch/", type: "audio/mpeg", objOwner: "biermann" },
  { objId: "2", src: "http://radio1190.colorado.edu:8000/low.ogg", desc: "Radio 1190", www: "http://www.radio1190.org/", type: "audio/ogg", objOwner: "biermann" },
  { objId: "1", src: "http://88.198.34.209:13128/nometa.ogg", desc: "DNBRadio", www: 'http://dnbradio.com/', type: "audio/ogg", objOwner: "biermann" }
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
  value: "radioCurrent", 
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
  value: ["objId","objOwner","src","desc","www","type","volume","vibrate","view","store","debug"], 
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
  value: ["drawer","recent10","listIndexedDB","listStorage","biermann","myRadio","listMyRadio","audio/ogg","audio/mpeg","status","settings"], 
  configurable: false
});
Object.defineProperty(nmp.view, 'list', {
  enumerable: true, 
  writable: false, 
  //value: ["desc","src","type","www","delete","edit","pause","stop","duplicate","lastUsed","usageCounter","objId","store"], 
  value: ["desc","src","type","www","delete","edit","pause","stop","duplicate"], 
  configurable: false
});
Object.defineProperty(nmp.view, 'class', {
  enumerable: true, 
  writable: false, 
  value: 'nmpView', 
  configurable: false
});

nmp.db = {};
Object.defineProperty(nmp.db, 'version', {
  enumerable: true, 
  writable: false, 
  value: "43", 
  configurable: false
});
Object.defineProperty(nmp.db, 'name', {
  enumerable: true, 
  writable: false, 
  value: "radio", 
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
  value: ["objId","objOwner","src","desc","www","type","usageCounter","lastUsed"], 
  configurable: false
});
Object.defineProperty(nmp.db.radio, 'formField', {
  enumerable: true, 
  writable: false, 
  value: ["src","desc","www","type"], 
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

