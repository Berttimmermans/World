(function(){
  
  function Render(map){
    
    this.color = map.color;
    this.range = this.color.length;
    this.scale = 5;
    
    this.light = new THREE.Color( 0xFFFFFF );
    this.shadow = new THREE.Color( 0xCCCCCC );
    this.matrix = new THREE.Matrix4();
    
  }
  
  Render.prototype.Init = (function(data){
    
    // Setup Three Js renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true});
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.renderer.setClearColor( 0xaee7e4 );
		document.body.appendChild( this.renderer.domElement );
		
		// Setup Three Js scene
		this.scene = new THREE.Scene();
    this.scene.fog = new THREE.FogExp2( 0xaee7e4, 0.0008 );
    
    // Setup Three JS camera
		this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 1, 10000 );
		this.camera.position.set(0, 40*this.scale, 40*this.scale );
		this.camera.lookAt(new THREE.Vector3(0,0,0));
    this.scene.add(this.camera);
    
    // Setup Three JS Lights
    this.setupLights();
    
    // Setup Faces
    this.setupFaces();

    // Build world
		this.Build(data);
		
		// Set Resize
		var self = this;
    window.addEventListener( 'resize', function(){
      self.resize();
    }, false );
		
		this.render();
		
    //this.animate();
    
  });
  
  Render.prototype.setupLights = (function(){
    
    var hemiLight = new THREE.HemisphereLight( 0xaee7e4, 0x222222, 0.9);
    this.scene.add(hemiLight); 
    
    function setLight(x,y,z){
      var light = new THREE.DirectionalLight(0xFFFFFF, 0.3);
		  light.position.set(x,y,z);
		  light.lookAt(new THREE.Vector3(0,0,0));
      return light;
    }
    
    this.scene.add(setLight(0,10*this.scale,0));
    this.scene.add(setLight(0,-10*this.scale,0));
    this.scene.add(setLight(-10*this.scale,0,0));
    this.scene.add(setLight(10*this.scale,0,0));
  
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
  
  Render.prototype.Build = (function(data){
    
    var map = data;
		var width = parseInt(map[0].length/2);
		var depth = parseInt(map.length/2);
    
    // World
    var world = new THREE.Group();
    
    // Map
    
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
          
          var a = n > i || w > i || nw > i ? 0 : 1;
          var b = n > i || e > i || ne > i ? 0 : 1;
          var c = s > i || e > i || se > i ? 0 : 1;
          var d = s > i || w > i || sw > i ? 0 : 1;
          
          // Top
          
          if(map[y][x] == i) {
            
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
          cube.position.set((x-(width/2))*this.scale, i*this.scale, (y-(depth/2))*this.scale); 
          cube.updateMatrix();
        
          Geometry.merge( cube.geometry, cube.matrix );
        }
      }
      
      Geometry.mergeVertices();
      var Material = new THREE.MeshLambertMaterial({ color: this.color[i], ambient: 0x444444, vertexColors: THREE.VertexColors });
      /*material = new THREE.MeshBasicMaterial({
        wireframe: true,
        color: 'blue'
      })*/
      var layer = new THREE.Mesh( Geometry, Material);
      
      world.add(layer);
      
    }
    
    this.scene.add(world);
    
    
    // Water
    var material = new THREE.MeshLambertMaterial({ color: 0x30416B, ambient: 0x444444, transparent: true });
    material.opacity = 0.8;
    var water = new THREE.Mesh(new THREE.PlaneBufferGeometry(width*this.scale, depth*this.scale), material );
    water.rotation.x = -90 * Math.PI / 180;
    water.position.y = this.scale*6.7;
    water.position.x = -this.scale/2;
    water.position.z = -this.scale/2;
    this.scene.add(water);
      
  });
  
  Render.prototype.resize = (function(){
    
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize( window.innerWidth, window.innerHeight );
		this.render();
    
  });
  
  Render.prototype.render = (function(){
		
		this.renderer.render( this.scene, this.camera );
    
  });
  
  Render.prototype.animate = (function(){
    
    var self = this;
    requestAnimationFrame( function(){
      return self.animate 
    });       
    this.render();
    
  });
  
  
  window.Render = Render;
  
})();