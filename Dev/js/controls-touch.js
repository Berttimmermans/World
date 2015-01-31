(function() {
  
  function TouchControls(controls){
    
    this.controls = controls;
    this.touch = {
      'state':'end',
      'x':0,
      'y':0
    }
  }
  
  TouchControls.prototype.init = (function(){
    
		var controls = document.createElement("div");
		controls.className = "controls";
		document.body.appendChild(controls);
    
    var pan = this.controls.events.pan;
    var touch = this.touch;
    
    document.body.addEventListener("touchstart", function() {
		  return event.preventDefault(); 
    }, false);
    
    controls.addEventListener("touchstart", function(e) {	
      touch.y = e.changedTouches[0].pageY;
      touch.x = e.changedTouches[0].pageX;
      touch.state = 'start';
		  return event.preventDefault(); 
    }, false);
    
    controls.addEventListener("touchend", function(e) {	
      touch.state = 'end';
    }, false);
    
    controls.addEventListener("touchmove", function(e) {	
  		
  		if(touch.state == 'start'){
      
        var touchX = e.changedTouches[0].pageX;
        var touchY = e.changedTouches[0].pageY;
    		
        pan.y = (touch.y-touchY)*(window.innerHeight/50);
        pan.x = (touch.x-touchX)*(window.innerWidth/50);
        
        touch.y = touchY;
        touch.x = touchX;
        
      }
    }, false);
    
  });
  
  window.TouchControls = TouchControls; 
	
})();