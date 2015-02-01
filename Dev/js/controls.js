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
    this.collision = this.instance.collision;
    this.events = events();
    this.input = (this.instance.touch)? new TouchControls(this) : new KeyboardControls(this);
    this.input.init();    
  }
  
  Controls.prototype.validate = (function(){
    
    // Camera rotation
    
    if(this.events.pan.x != 0) this.camera.ry -= (this.events.pan.x/1000);
    if(this.camera.ry < -Math.PI) this.camera.ry += Math.PI*2;
    if(this.camera.ry > Math.PI) this.camera.ry -= Math.PI*2;
    
    if(this.events.pan.y != 0) this.camera.rx -= (this.events.pan.y/1000);
    if(this.camera.rx < -(Math.PI/2)) this.camera.rx = -(Math.PI/2);
    if(this.camera.rx > (Math.PI/2)) this.camera.rx = (Math.PI/2);
    
    this.events.pan.x = 0;
    this.events.pan.y = 0;
    
    // Define angle
    
    var angle = ((((this.camera.ry+Math.PI)/2)/Math.PI)*-360)+180;
    
    // Movement
    
    var x, z;
    
    if(this.events.down) {
      x = this.camera.x + (-1*(this.speed * Math.sin((-angle) * Math.PI / 180)));
      z = this.camera.z + (-1*(this.speed * Math.cos((-angle) * Math.PI / 180)));
    }
    if(this.events.up) {
      x = this.camera.x + (1*(this.speed * Math.sin((-angle) * Math.PI / 180)));
      z = this.camera.z + (1*(this.speed * Math.cos((-angle) * Math.PI / 180)));
    }
    if(this.events.right) {
      x = this.camera.x + (1*(this.speed * Math.cos((angle) * Math.PI / 180)));
      z = this.camera.z + (1*(this.speed * Math.sin((angle) * Math.PI / 180)));
    }
    if(this.events.left) {
      x = this.camera.x + (-1*(this.speed * Math.cos((angle) * Math.PI / 180)));
      z = this.camera.z + (-1*(this.speed * Math.sin((angle) * Math.PI / 180)));
    }
    if(this.events.down || this.events.up || this.events.left || this.events.right){
      if(this.collision.validateX(x)) this.camera.x = x;
      if(this.collision.validateZ(z)) this.camera.z = z;
      this.camera.y = this.collision.setY(this.camera.x, this.camera.z);
    }
    
  });

  window.Controls = Controls;
  
})();