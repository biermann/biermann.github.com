nmp.touch.init = function(e) {


var touchsurface = document.getElementById('main'),
  startX,
  startY,
  dist,
  threshold = 150, //required min distance traveled to be considered swipe
  allowedTime = 200, // maximum time allowed to travel that distance
  elapsedTime,
  startTime
 
 function handleswipe(isrightswipe){
  if (isrightswipe){
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
			nmp.storage.currentSet(current);
			nmp.app.update();
                        nmp.storage.statusSet();
			break;
		   }	
    		}
       		if (nmp.view.option[last] == oldObj.view) {
			newObj.view = nmp.view.option[0];
			current.view = nmp.view.option[0];
			nmp.storage.currentSet(current);
			nmp.app.update();
                        nmp.storage.statusSet();
			nmp.db.statusSet ();
        	}
       		if (current.view === undefined || !exist || oldObj.view == '') {
			current.view = "biermann";
			nmp.storage.currentSet(current);
			nmp.app.update();
                        nmp.storage.statusSet();
                }

   //touchsurface.innerHTML = 'Congrats, you\'ve made a <span style="color:red">right swipe!</span>'

  }
  else{
   //touchsurface.innerHTML = 'Condition for right swipe not met yet'
  }
 }
 
 touchsurface.addEventListener('touchstart', function(e){
  touchsurface.innerHTML = ''
  var touchobj = e.changedTouches[0]
  dist = 0
  startX = touchobj.pageX
  startY = touchobj.pageY
  startTime = new Date().getTime() // record time when finger first makes contact with surface
  e.preventDefault()
 
 }, false)
 
 touchsurface.addEventListener('touchmove', function(e){
  e.preventDefault() // prevent scrolling when inside DIV
 }, false)
 
 touchsurface.addEventListener('touchend', function(e){
  var touchobj = e.changedTouches[0]
  dist = touchobj.pageX - startX // get total dist traveled by finger while in contact with surface
  elapsedTime = new Date().getTime() - startTime // get time elapsed
  // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
handleswipe(swiperightBol)
e.preventDefault()
}, false)




}

