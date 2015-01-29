(function(){
  
  function input(){
    return {
      'jump' : false,
      'right' : false,
      'left' : false,
      'down' : false,
      'up' : false
    }
  }
  
  function Controls(instance){
    
    this.instance = instance;
    this.speed = instance.speed;
    this.camera = this.instance.camera;
    this.keys = input();
    this.input = (this.instance.touch)? new TouchControls(this) : new KeyboardControls(this);
    this.input.init();
    
  }
  
  Controls.prototype.validate = (function(){
    
    //console.log(this.keys.up);
    
    if(this.keys.right) this.camera.x += 1*this.speed;
    if(this.keys.left) this.camera.x -= 1*this.speed;
    if(this.keys.up) this.camera.z += 1*this.speed;
    if(this.keys.down) this.camera.z -= 1*this.speed;
    
  });

  window.Controls = Controls;
  
})();