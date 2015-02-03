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
    
    this.angle = ((((this.camera.ry+Math.PI)/2)/Math.PI)*-360)+180;
    
    // Movement
    
    this.move(); 
    
  });
  
  Controls.prototype.move = (function(){
    
    var x, z;
    
    if(this.events.down) {
      x = this.camera.x + (-1*(this.speed * Math.sin((-this.angle) * Math.PI / 180)));
      z = this.camera.z + (-1*(this.speed * Math.cos((-this.angle) * Math.PI / 180)));
    }
    if(this.events.up) {
      x = this.camera.x + (1*(this.speed * Math.sin((-this.angle) * Math.PI / 180)));
      z = this.camera.z + (1*(this.speed * Math.cos((-this.angle) * Math.PI / 180)));
    }
    if(this.events.right) {
      x = this.camera.x + (1*(this.speed * Math.cos((this.angle) * Math.PI / 180)));
      z = this.camera.z + (1*(this.speed * Math.sin((this.angle) * Math.PI / 180)));
    }
    if(this.events.left) {
      x = this.camera.x + (-1*(this.speed * Math.cos((this.angle) * Math.PI / 180)));
      z = this.camera.z + (-1*(this.speed * Math.sin((this.angle) * Math.PI / 180)));
    }
    
    if(this.events.jump) this.camera.jump = 1.5;
    
    if(this.events.down || this.events.up || this.events.left || this.events.right) this.collision.validateOptions(x,z);
    
  });

  window.Controls = Controls;
  
})();