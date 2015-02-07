(function(){
  
  function Physics(camera, gravity){
    
    this.gravity = gravity;
    
    this.jump = {
      'active' : false,
      'height' : 1.5,
      'step' : 0
    }
    
    this.fall = 0;
    
    this.camera = camera;
    
  }
  
  // Init values
  
  Physics.prototype.initJump = (function(){
    if(this.jump.active == false && this.getFall() == 0) {
      this.jump.active = true;
    }
    return false;
  });
  
  Physics.prototype.initFall = (function(y){
    if(this.camera.y > y) this.fall += this.camera.y-y;
  });
  
  // Update values
  
  Physics.prototype.update = (function(){
    this.updateFall();
    this.updateJump();
  });
  
  Physics.prototype.updateFall = (function(){
    if(this.fall > 0) this.fall -= 0.1*this.gravity;
    if(this.fall < 0) this.fall = 0;
  });
  
  Physics.prototype.updateJump = (function(){
    if(this.jump.active){
      this.jump.step += 0.04*this.gravity;
      if(this.jump.step >= 1) {
        this.jump.active = false;
        this.jump.step = 0;
      }
    }
  });
  
  // Get values
  
  Physics.prototype.get = (function(){
    return this.getFall()+this.getJump();
  });
  
  Physics.prototype.getJump = (function(){
    
    if(this.jump.active){
      return this.jump.height * Math.sin((this.jump.step)*Math.PI);
    } else {
      return 0;
    }
    
  });
  
  Physics.prototype.getFall = (function(){
    return this.fall;
  });
  
  window.Physics = Physics;
  
})();