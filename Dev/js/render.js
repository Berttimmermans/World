(function(){
  
  function Render(map, camera, physics, touch){
    
    this.size = map.size;
    this.color = map.color;
    this.skyColor = map.skyColor;
    this.brightness = map.brightness;
    this.waterLevel = map.waterLevel;
    this.range = this.color.length;
    this.scale = 1;
    
    this.light = new THREE.Color( 0xFFFFFF );
    this.shadow = new THREE.Color( 0xCCCCCC );
    this.matrix = new THREE.Matrix4();
    
    this.cameraData = camera;
    this.physics = physics;
    this.touch = touch;
    
  }
  
  Render.prototype.init = (function(data){
    
    // Setup Three Js renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColor( this.skyColor );
		document.body.appendChild( this.renderer.domElement );
		
		// Setup Three Js scene
		this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog( this.skyColor, 0, 200 );
    
    // Setup Three JS camera
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.05, 10000 );
		this.cameraData.x = parseInt((data[0].length/2)*this.size);
		this.cameraData.z = parseInt((data.length/2)*this.size);
		console.log(this.cameraData);
		this.camera.rotation.order = "YXZ";
    this.scene.add(this.camera);
    
    // Setup Three JS Lights
    this.setupLights();
    
    // Setup Faces
    this.setupFaces();

    // Build world
		this.build(data);
		
		// Set Resize
		var self = this;
    window.addEventListener('resize', function(){
      self.resize();
    }, false );
    
    window.addEventListener('orientationchange', function(){
      self.resize();
    }, false );
    
  });
  
  Render.prototype.setupLights = (function(){
    
    var brightness = this.brightness;
    this.hemiLight = new THREE.HemisphereLight( 0xaee7e4, 0x222222, (0.9*brightness));
    this.scene.add(this.hemiLight); 
    
    function setLight(x,y,z,brightness){
      var light = new THREE.DirectionalLight(0xFFFFFF, (0.3*brightness));
		  light.position.set(x,y,z);
		  light.lookAt(new THREE.Vector3(0,0,0));
      return light;
    }
    
    this.scene.add(setLight(0,10*this.scale,0,brightness));
    this.scene.add(setLight(0,-10*this.scale,0,brightness));
    this.scene.add(setLight(-10*this.scale,0,0,brightness));
    this.scene.add(setLight(10*this.scale,0,0,brightness));
  
  });
  
  Render.prototype.setupFaces = (function(){
    
    var matrix = this.matrix;
    
    function createFace(w, h, rx, ry, tx, ty, tz){
      var Geometry =  new THREE.PlaneGeometry( w, h );
      Geometry.applyMatrix( matrix.makeRotationX( rx ) );
      Geometry.applyMatrix( matrix.makeRotationY( ry ) );
      Geometry.applyMatrix( matrix.makeTranslation( tx, ty, tz ) );
      return Geometry;
    }
    
    this.nGeometry = createFace( this.scale, this.scale, 0, Math.PI, 0, 0, -this.scale/2 );
    this.sGeometry = createFace( this.scale, this.scale, 0, 0, 0, 0, this.scale/2 );
    this.eGeometry = createFace( this.scale, this.scale, 0, Math.PI/2, this.scale/2, 0, 0 );
    this.wGeometry = createFace( this.scale, this.scale, 0, -Math.PI/2, -this.scale/2, 0, 0 );
    this.tGeometry = createFace( this.scale, this.scale, -Math.PI/2, 0, 0, this.scale/2, 0 );
    this.t2Geometry = createFace( this.scale, this.scale, -Math.PI/2, Math.PI/2, 0, this.scale/2, 0 );
    this.bGeometry = createFace( this.scale, this.scale, Math.PI/2, 0, 0, -this.scale/2, 0 );
    
  });
  
  Render.prototype.build = (function(data){
    
    var map = data;
		var width = parseInt(map[0].length*this.size);
		var depth = parseInt(map.length*this.size);
    
    var world = new THREE.Group();
    
    for(var i = 0; i < this.range; i++){
      
      var Geometry =  new THREE.Geometry(); 
      
      for(var y = 0; y < depth; y++){
        for(var x = 0; x < width; x++){
          
          var cubeGeometry = new THREE.Geometry();
          
          var n = (map[y-1] != undefined) ? map[y-1][x] : this.range;
          var ne = (map[y-1] != undefined && map[y-1][x+1] != undefined && x != (width-1)) ? map[y-1][x+1] : this.range;
          var e = (map[y][x+1] != undefined && x != (width-1)) ? map[y][x+1] : this.range;
          var se = (map[y+1] != undefined && map[y+1][x+1] != undefined && y != (depth-1)) ? map[y+1][x+1] : this.range;
          var s = (map[y+1] != undefined && y != (depth-1)) ? map[y+1][x] : this.range;
          var sw = (map[y+1] != undefined && map[y+1][x-1] != undefined)? map[y+1][x-1] : this.range;
          var w = (map[y][x-1] != undefined) ? map[y][x-1] : this.range;
          var nw = (map[y-1] != undefined && map[y-1][x-1] != undefined ) ? map[y-1][x-1] : this.range;
          
          // Top
          
          if(map[y][x] == i) {
          
            var a = n > i || w > i || nw > i ? 0 : 1;
            var b = n > i || e > i || ne > i ? 0 : 1;
            var c = s > i || e > i || se > i ? 0 : 1;
            var d = s > i || w > i || sw > i ? 0 : 1;
            
            if ( 
              a + c < d + b && (a+b+c+d) < 2
              || (a+b+c) == 3 && d == 0
              || (a+d+c) == 3 && b == 0
            ) {
            
              var colors = this.t2Geometry.faces[ 0 ].vertexColors;
							colors[ 0 ] = d === 0 ? this.shadow : this.light;
							colors[ 1 ] = c === 0 ? this.shadow : this.light;
							colors[ 2 ] = a === 0 ? this.shadow : this.light;
              
              var colors = this.t2Geometry.faces[ 1 ].vertexColors;
							colors[ 0 ] = c === 0 ? this.shadow : this.light;
							colors[ 1 ] = b === 0 ? this.shadow : this.light;
							colors[ 2 ] = a === 0 ? this.shadow : this.light;
              
              cubeGeometry.merge( this.t2Geometry, this.matrix);
              
            } else {
            
              var colors = this.tGeometry.faces[ 0 ].vertexColors;
							colors[ 0 ] = a === 0 ? this.shadow : this.light;
							colors[ 1 ] = d === 0 ? this.shadow : this.light;
							colors[ 2 ] = b === 0 ? this.shadow : this.light;
              
              var colors = this.tGeometry.faces[ 1 ].vertexColors;
							colors[ 0 ] = d === 0 ? this.shadow : this.light;
							colors[ 1 ] = c === 0 ? this.shadow : this.light;
							colors[ 2 ] = b === 0 ? this.shadow : this.light;
              
              cubeGeometry.merge( this.tGeometry, this.matrix);
            }
            
          }
          
          // Sides
          
          if(map[y][x] >= i ){
            
            // Back
            
            if( map[y-1] != undefined && map[y-1][x] < i ) {
              
              var colors = this.nGeometry.faces[ 0 ].vertexColors;
							colors[ 0 ] = ne >= i ? this.shadow : this.light;
							colors[ 1 ] = n == i-1 || ne == i-1 || ne == this.range ? this.shadow : this.light;
							colors[ 2 ] = nw >= i ? this.shadow : this.light;
              
              var colors = this.nGeometry.faces[ 1 ].vertexColors;
							colors[ 0 ] = n == i-1 || ne == i-1 || ne == this.range ? this.shadow : this.light;
							colors[ 1 ] = n == i-1 || nw == i-1 || nw == this.range ? this.shadow : this.light;
							colors[ 2 ] = nw >= i ? this.shadow : this.light;
							
              cubeGeometry.merge( this.nGeometry, this.matrix);
            }
            
            // Front
            
            if( map[y+1] != undefined && map[y+1][x] < i ) {
              
              var colors = this.sGeometry.faces[ 0 ].vertexColors;
							colors[ 0 ] = sw >= i ? this.shadow : this.light;
							colors[ 1 ] = s == i-1 || sw == i-1 || sw == this.range ? this.shadow : this.light;
							colors[ 2 ] = se >= i ? this.shadow : this.light;
              
              var colors = this.sGeometry.faces[ 1 ].vertexColors;
							colors[ 0 ] = s == i-1 || sw == i-1 || sw == this.range ? this.shadow : this.light;
							colors[ 1 ] = s == i-1 || se == i-1 || se == this.range ? this.shadow : this.light;
							colors[ 2 ] = se >= i ? this.shadow : this.light;
							
              cubeGeometry.merge( this.sGeometry, this.matrix);
            }
            
            // Right
            
            if( map[y][x+1] != undefined && map[y][x+1] < i ) {
              
              var colors = this.eGeometry.faces[ 0 ].vertexColors;
							colors[ 0 ] = se >= i ? this.shadow : this.light;
							colors[ 1 ] = e == i-1 || se == i-1 || se == this.range? this.shadow : this.light;
							colors[ 2 ] = ne >= i ? this.shadow : this.light;
              
              var colors = this.eGeometry.faces[ 1 ].vertexColors;
							colors[ 0 ] = e == i-1 || se == i-1 || se == this.range ? this.shadow : this.light;
							colors[ 1 ] = e == i-1 || ne == i-1 || ne == this.range ? this.shadow : this.light;
							colors[ 2 ] = ne >= i ? this.shadow : this.light;
              
              cubeGeometry.merge( this.eGeometry, this.matrix);
            }
            
            // Left
            
            if( map[y][x-1] != undefined && map[y][x-1] < i ) {
              
              var colors = this.wGeometry.faces[ 0 ].vertexColors;
							colors[ 0 ] = nw >= i ? this.shadow : this.light;
							colors[ 1 ] = w == i-1 || nw == i-1 || nw == this.range? this.shadow : this.light;
							colors[ 2 ] = sw >= i ? this.shadow : this.light;
              
              var colors = this.wGeometry.faces[ 1 ].vertexColors;
							colors[ 0 ] = w == i-1 || nw == i-1 || nw == this.range ? this.shadow : this.light;
							colors[ 1 ] = w == i-1 || sw == i-1 || sw == this.range ? this.shadow : this.light;
							colors[ 2 ] = sw >= i ? this.shadow : this.light;
        
              cubeGeometry.merge( this.wGeometry, this.matrix);
            }
            
          }
        
          // Bottom
        
          if(i == 0) {
            
            // cubeGeometry.merge( this.bGeometry, this.matrix);
            
          }
          
          var cube =  new THREE.Mesh(cubeGeometry);
          cube.position.set(x*this.scale, i*this.scale, y*this.scale); 
          cube.updateMatrix();
        
          Geometry.merge( cube.geometry, cube.matrix );
        }
      }
      
      Geometry.mergeVertices();
      var Material = new THREE.MeshLambertMaterial({ color: this.color[i], ambient: 0x444444, vertexColors: THREE.VertexColors });
      //var Material = new THREE.MeshBasicMaterial({ wireframe: true, color: 'blue' });
      var layer = new THREE.Mesh( Geometry, Material);
      
      world.add(layer);
      
    }
    
    world.add(this.addWater(width, depth));
    
    this.scene.add(world);
      
  });
  
  Render.prototype.addWater = (function(width, depth){
    
    var material = new THREE.MeshLambertMaterial({ color: 0x30416B, ambient: 0x444444, transparent: true });
    material.opacity = 0.9;
    
    var water = new THREE.Mesh(new THREE.BoxGeometry(width*this.scale, depth*this.scale, this.scale*this.waterLevel ), material );
    water.material.side = THREE.DoubleSide;
    water.rotation.x = -90 * Math.PI / 180;
    water.position.set(((width*this.scale)/2)-0.5, (this.scale*this.waterLevel)/2, ((width*this.scale)/2)-0.5);
    return water;
    
  });
  
  Render.prototype.resize = (function(){
    
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		var multiplier = (this.touch)? window.devicePixelRatio : 1;
		this.renderer.setSize( window.innerWidth*multiplier, window.innerHeight*multiplier );
		this.render(this.cameraData);
    
  });
  
  Render.prototype.render = (function(camera){
		
		this.updateCamera(camera);
		
		if(camera.y+this.physics.get() < this.waterLevel-camera.height){
			this.hemiLight.color.setHex(0x000000 );
			this.hemiLight.groundColor.setHex( 0x000000 );
      this.scene.fog = new THREE.Fog( 0x30416B, -5, 6 );
		} else {
			this.hemiLight.color.setHex(0xaee7e4 );
			this.hemiLight.groundColor.setHex( 0x222222 );
      this.scene.fog = new THREE.Fog( this.skyColor, 0, 200 );
		}
		
		this.renderer.render( this.scene, this.camera );
    
  });
  
  Render.prototype.updateCamera = (function(camera){
    
    var y = camera.y+camera.height+this.physics.get(); 
    
		this.camera.position.set( (camera.x*this.scale)-0.5, y*this.scale, (camera.z*this.scale)-0.5 );
		this.camera.rotation.set(camera.rx, camera.ry, camera.rz );
		this.camera.updateProjectionMatrix();
  
  });
  
  window.Render = Render;
  
})();