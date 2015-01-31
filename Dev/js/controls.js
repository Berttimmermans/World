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
    this.input.init();    
    
    console.log( '---- 0' );

    console.log( 'Cos ' + Math.cos((90 * Math.PI) / 180) );
    console.log( 'Sin ' + Math.sin((90 * Math.PI) / 180) );
    

    console.log( '---- 90' );

    console.log( 'Cos ' + Math.cos((0 * Math.PI) / 180) );
    console.log( 'Sin ' + Math.sin((0 * Math.PI) / 180) );
    
    
    console.log( '---- 180' );
    
    console.log( 'Cos ' + Math.cos((-90 * Math.PI) / 180) );
    console.log( 'Sin ' + Math.sin((-90 * Math.PI) / 180) );

    
    console.log( '---- 270' );

    console.log( 'Cos ' + Math.cos((-180 * Math.PI) / 180) );
    console.log( 'Sin ' + Math.sin((-180 * Math.PI) / 180) );
    
    console.log( '---- 359' );

    console.log( 'Cos ' + Math.cos((-270 * Math.PI) / 180) );
    console.log( 'Sin ' + Math.sin((-270 * Math.PI) / 180) );
    
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
    
    var angle = ((((this.camera.ry+Math.PI)/2)/Math.PI)*-360)+180;
    
    // Movement
    
    if(this.events.down) {
      this.camera.x += -1*(this.speed * Math.sin((-angle) * Math.PI / 180));
      this.camera.z += -1*(this.speed * Math.cos((-angle) * Math.PI / 180));
    }
    if(this.events.up) {
      this.camera.x += 1*(this.speed * Math.sin((-angle) * Math.PI / 180));
      this.camera.z += 1*(this.speed * Math.cos((-angle) * Math.PI / 180));
    }
    if(this.events.right) {
      this.camera.x += 1*(this.speed * Math.cos((angle) * Math.PI / 180));
      this.camera.z += 1*(this.speed * Math.sin((angle) * Math.PI / 180));
    }
    if(this.events.left) {
      this.camera.x += -1*(this.speed * Math.cos((angle) * Math.PI / 180));
      this.camera.z += -1*(this.speed * Math.sin((angle) * Math.PI / 180));
    }
    
  });

  window.Controls = Controls;
  
})();