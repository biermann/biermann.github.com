function nmp.app.init  {

// Install app
if (navigator.mozApps) {
    var checkIfInstalled = navigator.mozApps.getSelf();
    checkIfInstalled.onsuccess = function () {
        if (checkIfInstalled.result) {
            // Already installed
            var installationInstructions = document.querySelector("#installation-instructions");
            if (installationInstructions) {
                installationInstructions.style.display = "none";
            }
        }
        else {
            var install = document.querySelector("#install"),
                manifestURL = location.href.substring(0, location.href.lastIndexOf("/")) + "/manifest.webapp";
            install.className = "show-install";
            install.onclick = function () {
                var installApp = navigator.mozApps.install(manifestURL);
                installApp.onsuccess = function(data) {
                    install.style.display = "none";
                };
                installApp.onerror = function() {
                    alert("Install failed\n\n:" + installApp.error.name);
                };
            };
        }
    };
}
else {
    console.log("Open Web Apps not supported");
}

nmp.app.vibrate = function (e) {
	if('vibrate' in navigator && nmp.storage.currentGet().vibrate == "true") {
        	navigator.vibrate(100);
	}
};

nmp.app.radio.valid = function (obj) {
  var result=false;
  var resultCount=0;
  for (var prop in obj) {
     if (obj.hasOwnProperty(prop)) {
        resultCount++;
	if (prop == "src") {resultCount = resultCount +10;}
	if (prop == "objOwner") {resultCount = resultCount +100;}
	//this[prop] = obj[prop];
        //console.log(resultCount+ 'fxosnetzradio.browserdb.objectAdd.obj.' +prop+': ' +this[prop]);
     } 
  } 
  if (resultCount > 113) {result = true;}
  else {result = false;console.log('nmp.app.radio.valid: count='+resultCount +' '+result);}
  //console.log( 'nmp.app.radio.valid '+result+' '+resultCount+' '+JSON.stringify(obj));
  return result;
};











};


