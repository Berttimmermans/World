(function(){
  
  function Render(canvas, grid, map){
    this.canvas = canvas;
    this.grid = grid;
    this.map = map;
    this.color = [ "#14142b","#21213d","#2b2b4a","#303056","#3D3D69","#5B66A7","#7784CF","#CBB361","#81BA84","#49A34d","#469A47","#408d3E","#346E29","#346E29","#6B5629","#6B5629","#564D39","#4D4D48","#7E7F82","#C4C4C4" ];
  }
  
  Render.prototype.draw = (function(data){
    
    this.level = 0;
    this.canvas.dom.width = window.innerWidth;
    this.canvas.dom.height = window.innerHeight;
    
    var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
    canvas.width = window.innerWidth*window.devicePixelRatio;
    canvas.height = window.innerHeight*window.devicePixelRatio;
    
    
    for(var l = 0; l < this.color.length; l++){
      for(var y in data){
        for(var x in data[y]){
          if(data[y][x] >= l) {
            this.drawBlock( context, l, y, x, data[y][x] )
          }
        }
      }
    }
    
    this.canvas.context.drawImage(canvas,0,0, canvas.width/window.devicePixelRatio,  canvas.height/window.devicePixelRatio);
    this.canvas.context.drawImage(canvas,0,0, canvas.width/window.devicePixelRatio,  canvas.height/window.devicePixelRatio);
    
  });
  
  Render.prototype.drawBlock = (function(context, l, y, x, z){
    
    var grid = this.map.grid;
    
    x = grid*x+((y % 2)*(grid/2));
    y = grid*(y/2)-(l*(grid/2))+(0*grid);
    
    x = x-(grid/2);
    y = y-(grid/2);
    
    context.strokeStyle = this.color[z];
    
    // draw top
    context.fillStyle = this.color[z];
    context.beginPath();
    context.moveTo(x + grid/2, y - grid/2);
    context.lineTo(x + grid, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.lineTo(x, y);
    context.lineTo(x + grid/2, y - grid/2);
    context.closePath();
    context.fill();
    
    // draw left
    context.fillStyle = this.shadeColor(this.color[z], -0.2);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.lineTo(x + grid/2, y + grid);
    context.lineTo(x, y + grid/2);
    context.lineTo(x, y);
    context.closePath();
    context.fill();
    
    // draw right
    context.fillStyle = this.shadeColor(this.color[z], -0.4);
    context.beginPath();
    context.moveTo(x + grid/2, y + grid/2);
    context.lineTo(x + grid/2, y + grid);
    context.lineTo(x + grid, y + grid/2);
    context.lineTo(x + grid, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.closePath();
    context.fill();
    
    
  });
  
  Render.prototype.shadeColor = (function(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
  });

  window.Render = Render;
  
})();