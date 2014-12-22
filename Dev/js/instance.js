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
        "width": 15,
        "height": 20
      },
      "range" : 12,
      "loops" : 4,
      "smoothLoops" : 2
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
