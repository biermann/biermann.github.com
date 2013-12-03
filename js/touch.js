nmp.touch.init = function(e) {


window.addEventListener('load', function(){ // on page load
 
 document.body.addEventListener('touchstart', function(e){
  alert(e.changedTouches[0].pageX) // alert pageX coordinate of touch point
 }, false)
 
}, false)




}

