(function(){
  
  function MapDrawer(canvas, grid, map){
    this.canvas = canvas;
    this.grid = grid;
    this.map = map;
  }
  
  MapDrawer.prototype.draw = (function(data, shift){
    
    var shift = shift || 0;
    var hexHeight,
        hexRadius,
        hexRectangleHeight,
        hexRectangleWidth,
        hexagonAngle = 0.523598776, // 30 degrees in radians
        sideLength = 10*window.devicePixelRatio,
        boardWidth = 5,
        boardHeight = 5;
        
    hexHeight = Math.sin(hexagonAngle) * sideLength;
    hexRadius = Math.cos(hexagonAngle) * sideLength;
    hexRectangleHeight = sideLength + 2 * hexHeight;
    hexRectangleWidth = 2 * hexRadius;
    
    this.canvas.dom.width = window.innerWidth;
    this.canvas.dom.height = window.innerHeight;
    
    var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
    canvas.width = window.innerWidth*window.devicePixelRatio;
    canvas.height = window.innerHeight*window.devicePixelRatio;
    context.lineWidth = 1;
    
    for(var i in data){
      for(var j in data[i]){
       drawHexagon(
          context, 
          i * hexRectangleWidth + ((j % 2) * hexRadius), 
          j * (sideLength + hexHeight),
          data[i][j]
        );
      }
    }
    
    function tweak(range){
      return ((range - shift) >= 0)? (range - shift) : 0;
    }
  
    function drawHexagon(context, x, y, range) {   
        
      if(x >= window.innerWidth*window.devicePixelRatio) return false;
      if(y >= window.innerHeight*window.devicePixelRatio) return false;
      
      var color = [
        "#303056",
        "#303056",
        "#303056",
        "#303056",
        "#3D3D69",
        "#5B66A7",
        "#7784CF",
        "#CBB361",
        "#81BA84",
        "#49A34d",
        "#469A47",
        "#408d3E",
        "#346E29",
        "#346E29",
        "#6B5629",
        "#6B5629",
        "#564D39",
        "#4D4D48",
        "#7E7F82",
        "#C4C4C4"
      ];
    
      context.fillStyle = color[tweak(range)];
      context.strokeStyle = color[tweak(range)];
      context.beginPath();
      context.moveTo(x + hexRadius, y);
      context.lineTo(x + hexRectangleWidth, y + hexHeight);
      context.lineTo(x + hexRectangleWidth, y + hexHeight + sideLength);
      context.lineTo(x + hexRadius, y + hexRectangleHeight);
      context.lineTo(x, y + sideLength + hexHeight);
      context.lineTo(x, y + hexHeight);
      context.closePath();
      context.fill();
    };
    
    this.canvas.context.drawImage(canvas,0,0, canvas.width/window.devicePixelRatio,  canvas.height/window.devicePixelRatio);
    
  });

  window.MapDrawer = MapDrawer;
  
})();