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
    
    this.build();
    this.bind();
    
  });
  
  TouchControls.prototype.build = (function(){
    
		this.$controls = document.createElement("div");
		this.$controls.className = "controls";
		document.body.appendChild(this.$controls);
		
		this.$dPad = document.createElement("div");
		this.$dPad.className = "dPad";
		this.$dPadStick = document.createElement("div");
		this.$dPadStick.className = "dPad-stick";
		this.$dPad.appendChild(this.$dPadStick);
		this.$controls.appendChild(this.$dPad);
		
		this.$action = document.createElement("a");
		this.$action.className = "action";
		this.$controls.appendChild(this.$action);
  
  });
  
  TouchControls.prototype.bind = (function(){
    
    var events = this.controls.events;
    var pan = this.controls.events.pan;
    var touch = this.touch;
    var dPad = this.$dPad;
    var action = this.$action;
    var self = this;
    
    // Disable default behavior
    
    document.body.addEventListener("touchstart", function() {
		  return event.preventDefault(); 
    }, false);
    
    // Camera rotation
    
    this.$controls.addEventListener("touchstart", function(e) {	
      touch.y = e.changedTouches[0].pageY;
      touch.x = e.changedTouches[0].pageX;
      touch.state = 'start';
		  return event.preventDefault(); 
    }, false);
    
    this.$controls.addEventListener("touchend", function(e) {	
      touch.state = 'end';
    }, false);
    
    this.$controls.addEventListener("touchmove", function(e) {	
  		if(touch.state == 'start'){
        var touchX = e.changedTouches[0].pageX;
        var touchY = e.changedTouches[0].pageY;
        pan.y = -(touch.y-touchY)*(window.innerHeight/50);
        pan.x = -(touch.x-touchX)*(window.innerWidth/50);
        touch.y = touchY;
        touch.x = touchX;
      }
    }, false);
    
    // Movement
    
    dPad.addEventListener("touchstart", function(){ 
      
			dPad.classList.add('active');
			
		}, false);
		
		dPad.addEventListener("touchmove", function(e) {
		
      var touchX = e.changedTouches[0].pageX;
      var touchY = e.changedTouches[0].pageY;
      
      var pos = { left : dPad.offsetLeft, top : dPad.offsetTop }; 
      var size = 160;
      var buttonSize = 80;
      var space = 40;
      
      events.up = false;
      events.down = false;
      events.right = false;
      events.left = false;
      
      var x = (touchX - pos.left)-buttonSize;
      var y = (touchY - pos.top)-buttonSize;
      
      if(x < -space) x = -space;
      if(x > space) x = space;
      if(y < -space) y = -space;
      if(y > space) y = space;
      
      self.translateStick(x,y);
      
      if(x < -(size/8)) events.left = true;
      if(x > (size/8)) events.right = true;
      if(y < -(size/8)) events.up = true;
      if(y > (size/8)) events.down = true;
      
		  return e.stopPropagation(); 
			 
		}, false);
		
		dPad.addEventListener("touchend", function(event) {
      
      events.up = false;
      events.down = false;
      events.right = false;
      events.left = false;
			dPad.classList.remove('active');
			self.translateStick(0,0);
			
		}, false);
		
		// Action button (Jump)
		
		action.addEventListener("touchstart", function(){
			events.jump = true;
			action.classList.add('active');
		});
		
		action.addEventListener("touchend", function(){
			events.jump = true;
			action.classList.remove('active');
		});
    
  
  });
  
  TouchControls.prototype.translateStick = (function(x,y){
	  this.$dPadStick.style.webkitTransform = "translate("+x+"px,"+y+"px)";
	});
  
  window.TouchControls = TouchControls; 
	
})();