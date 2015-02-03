(function(){
  
  function Collision(map, camera){
    
    this.size = map.size;
    this.range = map.color.length;
    this.camera = camera;
    this.squareSize = 20;
    
  }
  
  Collision.prototype.init = (function(data){
    
    this.data = data;
    this.render(this.data);
    this.camera.y = this.getY(this.camera.x, this.camera.z);
    
  });
  
  Collision.prototype.render = (function(data){
    
    this.heightMap = document.createElement('canvas');
		this.heightMap.className = "collision";
    this.heightMapContext = this.heightMap.getContext('2d');	
    
    this.heightMap.width = parseInt(this.data[0].length*this.size)*this.squareSize;
    this.heightMap.height = parseInt(this.data.length*this.size)*this.squareSize;
    
    for(var y in this.data){
      for(var x in this.data[y]){
        var color = this.data[y][x]*10;
        this.heightMapContext.beginPath();
        this.heightMapContext.rect(this.squareSize*x, this.squareSize*y, this.squareSize, this.squareSize);
        this.heightMapContext.fillStyle = 'rgba('+color+','+color+','+color+',1)';
        this.heightMapContext.fill();
        this.heightMapContext.closePath();
      }
    }
    
		//document.body.appendChild(this.heightMap);  
    
  });
  
  Collision.prototype.getY = (function(x, z){
  
    x = parseInt(x*this.squareSize);
    z = parseInt(z*this.squareSize);
    var data = this.heightMapContext.getImageData(x, z, 1, 1).data;
    return data[0]/10;
  
  });
  
  Collision.prototype.validateOptions = (function(x, z){
    
    if(this.validatePosition(x,z) || this.validatePosition(this.camera.x,z) || this.validatePosition(x,this.camera.z)){
      return true;
    }
  
  });
  
  Collision.prototype.validatePosition = (function(x,z){
    
    x = (this.validateX(x))? x : this.camera.x;
    z = (this.validateZ(z))? z : this.camera.z;
    var y = this.getY(x,z);
    
    if(this.validateY(y)){
      this.camera.x = x;
      this.camera.z = z;
      if(this.camera.y > y) this.camera.drop = this.camera.y-y;
      this.camera.y = y;
      return true;
    } else {
      return false;
    }
    
  });
  
  Collision.prototype.validateX = (function(x){
  
    if(x >= 0 && x <= parseInt(this.data[0].length*this.size)-1) return true;
    return false; 
  
  });
  
  Collision.prototype.validateZ = (function(z){
  
    if(z >= 0 && z <= parseInt(this.data.length*this.size)-1) return true;
    return false; 
  
  });
  
  Collision.prototype.validateY = (function(y){
  
    if(this.camera.y+this.camera.jump >= y) return true;
    return false;
  
  });
  
  
  window.Collision = Collision;
  
})();