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
    
    var pan = this.controls.events.pan;
    var touch = this.touch;
    
    window.ontouchstart = function(e){
    		
      touch.y = e.pageY;
      touch.x = e.pageX;
      touch.state = 'start';
    		
		}
		
		window.ontouchend = function(e){
  		
      touch.state = 'end';
  		
		}
  		
		window.ontouchmove = function(e){
  		
  		
  		if(touch.state == 'start'){
    		
        pan.y = (touch.y-e.pageY)*(window.innerHeight/100);
        pan.x = (touch.x-e.pageX)*(window.innerWidth/100);
        
        touch.y = e.pageY;
        touch.x = e.pageX;
        
      }
  		
		}
    
  });
  
  window.TouchControls = TouchControls; 
	
})();