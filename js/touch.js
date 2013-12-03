nmp.touch.init = function(e) {


 
 document.body.addEventListener('touchstart', function(e){
  alert(e.changedTouches[0].pageX) // alert pageX coordinate of touch point
   console.log( 'nmp.touch');
 }, false)
 




}

