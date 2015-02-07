(function() {
  
  function KeyboardControls(controls){
    
    this.controls = controls;
    this.mouse = {
      'state':'up',
      'x':0,
      'y':0
    }
    this.hasPointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
    
  }
  
  KeyboardControls.prototype.init = (function(){
    
    var events = this.controls.events;
    var pan = this.controls.events.pan;
    var fullscreen = this.fullScreen;
		
		document.addEventListener('keydown', function(e){
		  var key = e.which;
		  if (key == 32) events.jump = true;
		  if (key == 39 || key == 68) events.right = true;
		  if (key == 37 || key == 81) events.left = true;
		  if (key == 40 || key == 83) events.down = true;
		  if (key == 38 || key == 90) events.up = true;
		});
		
		document.addEventListener('keyup', function(e){
		  var key = e.which;
		  if (key == 32) events.jump = false;
		  if (key == 39 || key == 68) events.right = false;
		  if (key == 37 || key == 81) events.left = false;
		  if (key == 40 || key == 83) events.down = false
		  if (key == 38 || key == 90) events.up = false;
		});
		
		if(this.hasPointerLock){
  		
  		document.body.requestPointerLock = document.body.requestPointerLock || document.body.mozRequestPointerLock || document.body.webkitRequestPointerLock;
			     
      window.onclick = function(e){
        document.body.requestPointerLock(); 
      };
      
      document.addEventListener('pointerlockchange', lockChange, false);
      document.addEventListener('mozpointerlockchange', lockChange, false);
      document.addEventListener('webkitpointerlockchange', lockChange, false);
      
      function lockChange(){
        if(document.pointerLockElement === document.body || document.mozPointerLockElement === document.body || document.webkitPointerLockElement === document.body) {
          document.addEventListener("mousemove", mouseMove, false);
        } else {
          document.removeEventListener("mousemove", mouseMove, false);
        }
      }
      
      function mouseMove(e){
        var x = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
        var y = e.movementY || e.mozMovementY || e.webkitMovementY || 0; 
        pan.y = y*(window.innerHeight/200);
        pan.x = x*(window.innerWidth/200);
      }
      
		} else {
    
      var mouse = this.mouse;
  		
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
          pan.y = -(mouse.y-e.pageY)*(window.innerHeight/200);
          pan.x = (mouse.x-e.pageX)*(window.innerWidth/200);
          mouse.y = e.pageY;
          mouse.x = e.pageX;
        }
  		}
  		
		} 
    
  });
  
  window.KeyboardControls = KeyboardControls; 
	
})();