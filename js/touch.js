nmp.touch.init = function () {
  console.log('nmp.touch.init: ');

var touchsurface = document.getElementById('headerStatus'),
  startX,
  startY,
  distX,
  distY,
  dist,
  threshold = 150, //required min distance traveled to be considered swipe
  allowedTime = 200, // maximum time allowed to travel that distance
  restraint = 100, // maximum distance allowed at the same time in perpendicular direction
  elapsedTime,
  startTime
 
 function handleswipe(isrightswipe){
  if (isrightswipe){
   nmp.view.rotate('right')
   //touchsurface.innerHTML = 'Congrats, you\'ve made a <span style="color:red">right swipe!</span>'
  }
  else{
   //touchsurface.innerHTML = 'Condition for right swipe not met yet'
  }
 }
 
 touchsurface.addEventListener('touchstart', function(e){
  //touchsurface.innerHTML = ''
  //alert(e.changedTouches[0].pageX) // alert pageX coordinate of touch point
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
  distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
  distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
  elapsedTime = new Date().getTime() - startTime // get time elapsed
  // check that elapsed time is within specified, horizontal dist traveled >= threshold, and vertical dist traveled <= 100
var swiperightBol = (elapsedTime <= allowedTime && dist >= threshold && Math.abs(touchobj.pageY - startY) <= 100)
var swipeleftBol = ((elapsedTime <= allowedTime) && (Math.abs(distX) >= threshold && Math.abs(distY)) && (distX < 0))

//handleswipe(swiperightBol)


  if (elapsedTime <= allowedTime){ // first condition for awipe met
   if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
    swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
    if (distX < 0) {nmp.view.rotate('left')} else {nmp.view.rotate('right')}
   }
   else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
    swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
    if (distY < 0) {nmp.view.rotate('up')} else {nmp.view.rotate('down')}
   }
  }

e.preventDefault()
}, false)

};




