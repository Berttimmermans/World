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
      "grid": 80,
      "seed" : {
        "width": 30,
        "height": 25
      },
      "range" : 10,
      "loops" : 3,
      "smoothLoops" : 1
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
