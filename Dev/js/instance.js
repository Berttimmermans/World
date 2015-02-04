(function(){
  
  function Instance(){
    
    // Variables
    this.data = [];
    
    // Map 
    this.map = {
      "size": 0.5,
      "seed" : { "width": 15, "height": 15 },
      "loops" : 4,
      "smoothLoops" : 1,
      "waterLevel" : 7,
      "color" : [ "#14142b","#21213d","#2b2b4a","#303056","#3D3D69","#5B66A7","#7784CF","#CBB361","#81BA84","#49A34d","#469A47","#408d3E","#346E29","#346E29","#6B5629","#6B5629","#564D39","#4D4D48","#7E7F82","#C4C4C4" ]
    };
    
    this.camera = {
      "x" : 0, "y" : 0, "z" : 0,
      "rx" : 0, "ry" : -Math.PI*0.75, "rz" : 0,
      "height" : 2
    };
    
    this.speed = 0.08;
    
    this.gravity = 1;
    
    this.touch = ('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)? true : false;
    
  };
  
  Instance.prototype.Init = (function (){
  
    this.generator = new Generator(this.map);
    
    this.physics = new Physics(this.camera, this.gravity);
    this.collision = new Collision(this.map, this.camera, this.physics);
    this.render = new Render(this.map, this.camera, this.physics);
    this.controls = new Controls(this, this.physics);
    
    // Generate map data
    this.data = this.generator.New();
    
    // Build map
    this.render.init(this.data); 
    
    // Build collision map
    this.collision.init(this.data);
    
    // Render map
    this.animate();
    //this.render.render(this.camera);
    
  });
  
  Instance.prototype.animate = (function(){
    
    var self = this;
    requestAnimationFrame( function(){
      return self.animate();
    });  
    this.controls.validate();
    this.physics.update();
    this.render.render(this.camera);
    
  });
  
  window.Instance = Instance;
  
})();
