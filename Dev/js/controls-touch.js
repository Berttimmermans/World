(function() {
  
  function TouchControls(controls){
    
    this.controls = controls;
    console.log('touch');
  }
  
  TouchControls.prototype.init = (function(){
    
  });
  
  window.TouchControls = TouchControls; 
	
})();