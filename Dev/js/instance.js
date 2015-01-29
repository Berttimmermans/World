(function(){
  
  function Instance(){
    
    // Variables
    this.data = [];
    
    // Map 
    this.map = {
      "grid": 20,
      "size": 0.75,
      "seed" : {
        "width": 20,
        "height": 20
      },
      "loops" : 4,
      "smoothLoops" : 1,
      "waterLevel" : 7,
      "color" : [ "#14142b","#21213d","#2b2b4a","#303056","#3D3D69","#5B66A7","#7784CF","#CBB361","#81BA84","#49A34d","#469A47","#408d3E","#346E29","#346E29","#6B5629","#6B5629","#564D39","#4D4D48","#7E7F82","#C4C4C4" ]
    };
    
    this.camera = {
      "x" : 0,
      "y" : 50,
      "z" : 20
    };
    
  };
  
  Instance.prototype.Init = (function (){
  
    this.generator = new Generator(this.map);
    this.render = new Render(this.map, this.camera);
    
    // Generate map data
    this.data = this.generator.New();
    //console.log(JSON.stringify(this.data));
    
    // Draw map
    this.render.init(this.data); 
    
    this.render.render();
    //this.animate();
    
  });
  
  Instance.prototype.animate = (function(){
    
    var self = this;
    requestAnimationFrame( function(){
      return self.animate 
    });       
    this.render.render();
    
  });
  
  window.Instance = Instance;
  
})();
