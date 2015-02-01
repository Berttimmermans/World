(function(){
  
  function Collision(map, camera){
    
    this.size = map.size;
    this.range = map.color.length;
    this.camera = camera;
    
  }
  
  Collision.prototype.init = (function(data){
    
    this.data = data;
    this.render(this.data);
    this.camera.y = this.setY(this.camera.x, this.camera.z);
    
  });
  
  Collision.prototype.render = (function(data){
    
    this.heightMap = document.createElement('canvas');
		this.heightMap.className = "collision";
    this.heightMapContext = this.heightMap.getContext('2d');	
    
    this.squareSize = 10;
    
    this.heightMap.width = parseInt(this.data[0].length*this.size)*this.squareSize;
    this.heightMap.height = parseInt(this.data.length*this.size)*this.squareSize;
    
    for(var y in this.data){
      for(var x in this.data[y]){
        var color = parseInt(255-((255/this.range)*this.data[y][x]));
        this.heightMapContext.beginPath();
        this.heightMapContext.rect(this.squareSize*x, this.squareSize*y, this.squareSize, this.squareSize);
        this.heightMapContext.fillStyle = 'rgba('+color+','+color+','+color+',1)';
        this.heightMapContext.fill();
        this.heightMapContext.closePath();
      }
    }
    
		//document.body.appendChild(this.heightMap);
    
  });
  
  Collision.prototype.validateX = (function(x){
  
    if(x >= 0 && x <= parseInt(this.data[0].length*this.size)-1) return true;
    return false; 
  
  });
  
  Collision.prototype.validateZ = (function(z){
  
    if(z >= 0 && z <= parseInt(this.data.length*this.size)-1) return true;
    return false; 
  
  });
  
  Collision.prototype.setY = (function(x, z){
  
    x = parseInt(x*10);
    z = parseInt(z*10);
    var data = this.heightMapContext.getImageData(x, z, 1, 1).data;
    var y = parseInt((1-(data[0]/255))*this.range) + 2;
  
    return y;
  
  });
  
  
  window.Collision = Collision;
  
})();