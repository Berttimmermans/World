(function(){
  
  function Instance(){
    
    // Variables
    this.data = [];
    
    // Canvas 
    this.canvas = {
      "dom" : document.getElementById("world"),
      "context" : document.getElementById("world").getContext('2d')
    };
    
    // Map 
    this.map = {
      "grid": 20,
      "seed" : {
        "width": 12,
        "height": 18
      },
      "loops" : 4,
      "smoothLoops" : 1,
      "waterLevel" : 7,
      "color" : [ "#14142b","#21213d","#2b2b4a","#303056","#3D3D69","#5B66A7","#7784CF","#CBB361","#81BA84","#49A34d","#469A47","#408d3E","#346E29","#346E29","#6B5629","#6B5629","#564D39","#4D4D48","#7E7F82","#C4C4C4" ]
    }
    
  };
  
  Instance.prototype.Init = (function (){
  
    this.generator = new Generator(this.map);
    this.render = new Render(this.canvas, this.grid, this.map);
    
    // Generate map data
    this.data = this.generator.New();
    
    // Redraw on resize
    var self= this;
    window.onresize = function(event) {
      self.render.draw(self.data);
    }
    
    // Render map
    this.render.draw(this.data);
    
  });
  
  window.Instance = Instance;
  
})();
