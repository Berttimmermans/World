(function(){
  
  function events(){
    return {
      'jump' : false,
      'right' : false,
      'left' : false,
      'down' : false,
      'up' : false,
      'pan': {
        'x' : 0, 
        'y' : 0 
      }
    }
  }
  
  function Controls(instance){
    
    this.instance = instance;
    this.speed = instance.speed;
    this.camera = this.instance.camera;
    this.events = events();
    this.input = (this.instance.touch)? new TouchControls(this) : new KeyboardControls(this);
    this.input = new TouchControls(this);
    this.input.init();
    
  }
  
  Controls.prototype.validate = (function(){
    
    // Movement
    
    if(this.events.right) this.camera.x += 1*this.speed;
    if(this.events.left) this.camera.x -= 1*this.speed;
    if(this.events.up) this.camera.z += 1*this.speed;
    if(this.events.down) this.camera.z -= 1*this.speed;
    
    // Camera rotation
    
    if(this.events.pan.x != 0) this.camera.ry -= (this.events.pan.x/1000);
    if(this.camera.ry < -Math.PI) this.camera.ry += Math.PI*2;
    if(this.camera.ry > Math.PI) this.camera.ry -= Math.PI*2;
    
    if(this.events.pan.y != 0) this.camera.rx -= (this.events.pan.y/1000);
    if(this.camera.rx < -(Math.PI/2)) this.camera.rx = -(Math.PI/2);
    if(this.camera.rx > (Math.PI/2)) this.camera.rx = (Math.PI/2);
    
    this.events.pan.x = 0;
    this.events.pan.y = 0;
    
  });

  window.Controls = Controls;
  
})();