(function(){
  
  function Render(canvas, map){
    this.canvas = canvas;
    this.map = map;
  }
  
  Render.prototype.draw = (function(data){
    
    this.level = 0;
    this.data = data;
    this.canvas.dom.width = window.innerWidth;
    this.canvas.dom.height = window.innerHeight;
    
    var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
    canvas.width = window.innerWidth*window.devicePixelRatio;
    canvas.height = window.innerHeight*window.devicePixelRatio;
    
    for(var l = 0; l < this.map.color.length; l++){
      
      var block = this.generateBlock(l);
      
      if(l  == this.map.waterLevel){
        context.fillStyle = "rgba(48, 65, 107, 0.8);";
        context.beginPath();
        context.rect(0,0,canvas.width,canvas.height);
        context.fill();
      }
      
      for(var y in this.data){
        for(var x in this.data[y]){
          if(this.data[y][x] == l || (this.data[y][x]-l) > 0 &&  (this.data[y][x]-l) <= 3) {
          //if(this.data[y][x] >= l) {
            this.placeBlock(context, y, x, l, block);
          }
        }
      }
    }
    
    this.canvas.context.drawImage(canvas,0,0, canvas.width/window.devicePixelRatio,  canvas.height/window.devicePixelRatio);
    
  });
  
  
  Render.prototype.generateBlock = (function(z){
    
    var grid = this.map.grid*window.devicePixelRatio;
    var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		
    canvas.width = grid*window.devicePixelRatio;
    canvas.height =(grid*1.5)*window.devicePixelRatio;
    
    if(z == this.map.waterLevel){
      this.drawHalfBlock(context, (grid/2), 0, z);
    } else {
      this.drawFullBlock(context, (grid/2), 0, z);
    }
    return canvas;
    
  }); 
   
  Render.prototype.drawFullBlock = (function(context, y, x, z){ 
    
    var grid = this.map.grid*window.devicePixelRatio;
    
    // draw top
    context.fillStyle = this.map.color[z];
    context.strokeStyle = this.map.color[z];
    context.beginPath();
    context.moveTo(x + grid/2, y - grid/2);
    context.lineTo(x + grid, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.lineTo(x, y);
    context.lineTo(x + grid/2, y - grid/2);
    context.closePath();
    context.fill();
    context.stroke();
    
    // draw left
    context.fillStyle = this.shadeColor(this.map.color[z], -0.2);
    context.strokeStyle = this.shadeColor(this.map.color[z], -0.3);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.lineTo(x + grid/2, y + grid);
    context.lineTo(x, y + grid/2);
    context.lineTo(x, y);
    context.closePath();
    context.fill();
    context.stroke();
    
    // draw right
    context.fillStyle = this.shadeColor(this.map.color[z], -0.4);
    context.strokeStyle = this.shadeColor(this.map.color[z], -0.5);
    context.beginPath();
    context.moveTo(x + grid/2, y + grid/2);
    context.lineTo(x + grid/2, y + grid);
    context.lineTo(x + grid, y + grid/2);
    context.lineTo(x + grid, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.closePath();
    context.fill();
    context.stroke();
    
  });
   
  Render.prototype.drawHalfBlock = (function(context, y, x, z){ 
    
    var grid = this.map.grid*window.devicePixelRatio;
    
    // draw top
    context.fillStyle = this.map.color[z];
    context.strokeStyle = this.map.color[z];
    context.beginPath();
    context.moveTo(x + grid/2, y - grid/2);
    context.lineTo(x + grid, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.lineTo(x, y);
    context.lineTo(x + grid/2, y - grid/2);
    context.closePath();
    context.fill();
    context.stroke();
    
    // draw left top
    context.fillStyle = this.shadeColor(this.map.color[z], -0.2);
    context.strokeStyle = this.shadeColor(this.map.color[z], -0.35);
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.lineTo(x + grid/2, y + grid*0.75);
    context.lineTo(x, y + grid*0.25);
    context.lineTo(x, y);
    context.closePath();
    context.fill();
    context.stroke();
    
    // draw left bottom
    context.fillStyle = this.shadeColor(this.map.color[z-1], -0.35);
    context.strokeStyle = this.shadeColor(this.map.color[z-1], -0.40);
    context.beginPath();
    context.moveTo(x, y + grid*0.25);
    context.lineTo(x + grid/2, y + grid*0.75);
    context.lineTo(x + grid/2, y + grid);
    context.lineTo(x, y + grid*0.5);
    context.lineTo(x, y + grid*0.25);
    context.fill();
    context.stroke();
    
    // draw right
    context.fillStyle = this.shadeColor(this.map.color[z], -0.4);
    context.strokeStyle = this.shadeColor(this.map.color[z], -0.45);
    context.beginPath();
    context.moveTo(x + grid/2, y + grid/2);
    context.lineTo(x + grid/2, y + grid*0.75);
    context.lineTo(x + grid, y + grid*0.25);
    context.lineTo(x + grid, y);
    context.lineTo(x + grid/2, y + grid/2);
    context.closePath();
    context.fill();
    context.stroke();
    
    // draw right bottom
    context.fillStyle = this.shadeColor(this.map.color[z-1], -0.5);
    context.strokeStyle = this.shadeColor(this.map.color[z-1], -0.55);
    context.beginPath();
    context.moveTo(x + grid, y + grid*0.25);
    context.lineTo(x + grid/2, y + grid*0.75);
    context.lineTo(x + grid/2, y + grid);
    context.lineTo(x + grid, y + grid*0.5);
    context.lineTo(x + grid, y + grid*0.25);
    context.closePath();
    context.fill();
    context.stroke();
    
  });
  
  Render.prototype.placeBlock = (function(context, y, x, l, block){
    
    var grid = this.map.grid*window.devicePixelRatio;
    
    x = grid*x+((y % 2)*(grid/2));
    y = grid*(y/2)-(l*(grid/2))+(0*grid);
    
    x = x-(grid/2);
    y = y-(grid/2);
    
    context.drawImage(block, x, y);
    
  });
  
  Render.prototype.shadeColor = (function(color, percent) {   
    
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
    
  });

  window.Render = Render;
  
})();