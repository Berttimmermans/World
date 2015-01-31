(function() {
  
  function KeyboardControls(controls){
    
    this.controls = controls;
    this.mouse = {
      'state':'up',
      'x':0,
      'y':0
    }
  }
  
  KeyboardControls.prototype.init = (function(){
    
    var events = this.controls.events;
    var pan = this.controls.events.pan;
    var mouse = this.mouse;
		
		window.onkeydown = function(e){
		  var key = e.which;
		  if (key == 32) events.jump = true;
		  if (key == 39) events.right = true;
		  if (key == 37) events.left = true;
		  if (key == 38) events.down = true;
		  if (key == 40) events.up = true;
		}
		
		window.onkeyup = function(e){
		  var key = e.which;
		  if (key == 32) events.jump = false;
		  if (key == 39) events.right = false;
		  if (key == 37) events.left = false;
		  if (key == 38) events.down = false
		  if (key == 40) events.up = false;
		}
		
		window.onmousedown = function(e){
      mouse.y = e.pageY;
      mouse.x = e.pageX;
  		mouse.state = 'down';
		}
		
		window.onmouseup = function(e){
  		mouse.state = 'up';
		}
		
		window.onmousemove = function(e){
  		if(mouse.state == 'down'){
        pan.y = (mouse.y-e.pageY)*(window.innerHeight/200);
        pan.x = (mouse.x-e.pageX)*(window.innerWidth/200);
        mouse.y = e.pageY;
        mouse.x = e.pageX;
      }
		}
    
  });
  
  window.KeyboardControls = KeyboardControls; 
	
})();