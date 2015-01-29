(function() {
  
  function KeyboardControls(controls){
    
    this.controls = controls;
    console.log('keyboard');
  }
  
  KeyboardControls.prototype.init = (function(){
    
      var keys = this.controls.keys;
			
			window.onkeydown = function (e) {
			
			  var key = e.which;
			  if (key == 32) keys.jump = true;
			  if (key == 39) keys.right = true;
			  if (key == 37) keys.left = true;
			  if (key == 38) keys.down = true;
			  if (key == 40) keys.up = true;
  		
  		}
			
			window.onkeyup = function (e) {
			
			  var key = e.which;
			  if (key == 32) keys.jump = false;
			  if (key == 39) keys.right = false;
			  if (key == 37) keys.left = false;
			  if (key == 38) keys.down = false
			  if (key == 40) keys.up = false;
  		
  		}
    
  });
  
  window.KeyboardControls = KeyboardControls; 
	
})();