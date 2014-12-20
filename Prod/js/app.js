"use strict";window.onload=function(){var a=new Instance;a.Init()},function(){function a(a){this.range=a.range,this.seed=a.seed,this.loops=a.loops,this.smoothLoops=a.smoothLoops}a.prototype.New=function(){for(var a=this.NewSeed(),b=0;b<this.loops;b++)a=this.Split(a);for(var b=0;b<this.smoothLoops;b++)a=this.smooth(a);return a},a.prototype.NewSeed=function(){for(var a=[],b=0;b<this.seed.height;b++){a[b]=[];for(var c=0;c<this.seed.width;c++)a[b][c]=Math.floor(Math.random()*this.range)}return a},a.prototype.Split=function(a){return a=this.Horizontal(a),a=this.Vertical(a)},a.prototype.NewTile=function(a,b){var c=b>=a?a:b,d=a>=b?a:b,e=d-c<this.range?d-c+1:this.range,f=Math.floor(Math.random()*e)+c;return f>=0?f:0},a.prototype.Horizontal=function(a){for(var b=[],c=0;c<a.length;c++){b[c]=[];for(var d=0;d<a[c].length;d++)b[c].push(a[c][d]),b[c].push(this.addHorizontal(a,c,d))}return b},a.prototype.addHorizontal=function(a,b,c){var d=0;d=void 0!=a[b][c-1]&&void 0!=a[b][c+1]?parseInt((a[b][c-1]+a[b][c+1])/2):void 0!=a[b][c-1]?a[b][c-1]:a[b][c+1];var e=0;return e=void 0!=a[b-1]&&void 0!=a[b+1]?parseInt((a[b-1][c]+a[b+1][c])/2):void 0!=a[b-1]?a[b-1][c]:a[b+1][c],this.NewTile(d,e)},a.prototype.Vertical=function(a){for(var b=[],c=0;c<a.length;c++){b[2*c]=a[c],b[2*c+1]=[];for(var d=0;d<a[c].length;d++)b[2*c+1].push(this.addVertical(a,c,d))}return b},a.prototype.addVertical=function(a,b,c){var d=[];void 0!=a[b]&&(void 0!=a[b][c-1]&&d.push(a[b][c-1]),void 0!=a[b][c+1]&&d.push(a[b][c+1])),void 0!=a[b+1]&&(void 0!=a[b+1][c-1]&&d.push(a[b+1][c-1]),void 0!=a[b+1][c+1]&&d.push(a[b+1][c+1]));var e=this.parseVertical(d),f=0;return f=void 0!=a[b-1]&&void 0!=a[b+1]?parseInt((a[b-1][c]+a[b+1][c])/2):void 0!=a[b-1]?a[b-1][c]:a[b+1][c],this.NewTile(e,f)},a.prototype.parseVertical=function(a){return 1==a.length?parseInt(a[0]):2==a.length?parseInt((a[0]+a[1])/2):4==a.length?parseInt((a[0]+a[1]+a[2]+a[3])/2):0},a.prototype.smooth=function(a){for(var b=[],c=0;c<a.length;c++){b[c]=[];for(var d=0;d<a[c].length;d++)b[c][d]=this.smoothX(a,c,d)}for(var c=0;c<b.length;c++)for(var d=0;d<b[c].length;d++)b[c][d]=this.smoothO(b,c,d);return b},a.prototype.smoothX=function(a,b,c){var d=[],e=0;void 0!=a[b-1]&&(void 0!=a[b-1][c-1]&&d.push(a[b-1][c-1]),void 0!=a[b-1][c+1]&&d.push(a[b-1][c+1])),d.push(a[b][c]),void 0!=a[b+1]&&(void 0!=a[b+1][c-1]&&d.push(a[b+1][c-1]),void 0!=a[b+1][c+1]&&d.push(a[b+1][c+1]));for(var b in d)e+=parseInt(d[b]);return parseInt(e/d.length)},a.prototype.smoothO=function(a,b,c){var d=[],e=0;void 0!=a[b-1]&&d.push(a[b-1][c]),void 0!=a[b][c-1]&&d.push(a[b][c-1]),void 0!=a[b][c+1]&&d.push(a[b][c+1]),void 0!=a[b+1]&&d.push(a[b+1][c]);for(var b in d)e+=parseInt(d[b]);return parseInt(e/d.length)},window.Generator=a}(),function(){function a(){this.data=[],this.canvas={dom:document.getElementById("world"),context:document.getElementById("world").getContext("2d")},this.map={grid:60,seed:{width:8,height:12},range:10,loops:2,smoothLoops:1}}a.prototype.Init=function(){this.generator=new Generator(this.map),this.render=new Render(this.canvas,this.grid,this.map),this.data=this.generator.New();var a=this;window.onresize=function(){a.render.draw(a.data)},this.render.draw(this.data)},window.Instance=a}(),function(){function a(a,b,c){this.canvas=a,this.grid=b,this.map=c}a.prototype.draw=function(a,b){function c(a){return a-b>=0?a-b:0}function d(a,b,d,i){if(b>=window.innerWidth*window.devicePixelRatio)return!1;if(d>=window.innerHeight*window.devicePixelRatio)return!1;var k=["#303056","#303056","#303056","#303056","#3D3D69","#5B66A7","#7784CF","#CBB361","#81BA84","#49A34d","#469A47","#408d3E","#346E29","#346E29","#6B5629","#6B5629","#564D39","#4D4D48","#7E7F82","#C4C4C4"];a.fillStyle=k[c(i)],a.strokeStyle=k[c(i)],a.beginPath(),a.moveTo(b+f,d),a.lineTo(b+h,d+e),a.lineTo(b+h,d+e+j),a.lineTo(b+f,d+g),a.lineTo(b,d+j+e),a.lineTo(b,d+e),a.closePath(),a.fill()}var e,f,g,h,b=b||0,i=.523598776,j=10*window.devicePixelRatio;e=Math.sin(i)*j,f=Math.cos(i)*j,g=j+2*e,h=2*f,this.canvas.dom.width=window.innerWidth,this.canvas.dom.height=window.innerHeight;var k=document.createElement("canvas"),l=k.getContext("2d");k.width=window.innerWidth*window.devicePixelRatio,k.height=window.innerHeight*window.devicePixelRatio,l.lineWidth=1;for(var m in a)for(var n in a[m])d(l,m*h+n%2*f,n*(j+e),a[m][n]);this.canvas.context.drawImage(k,0,0,k.width/window.devicePixelRatio,k.height/window.devicePixelRatio)},window.MapDrawer=a}(),function(){function a(a,b,c){this.canvas=a,this.grid=b,this.map=c,this.color=["#303056","#303056","#303056","#303056","#3D3D69","#5B66A7","#7784CF","#CBB361","#81BA84","#49A34d","#469A47","#408d3E","#346E29","#346E29","#6B5629","#6B5629","#564D39","#4D4D48","#7E7F82","#C4C4C4"]}a.prototype.draw=function(a){this.canvas.dom.width=window.innerWidth,this.canvas.dom.height=window.innerHeight;var b=document.createElement("canvas"),c=b.getContext("2d");b.width=window.innerWidth*window.devicePixelRatio,b.height=window.innerHeight*window.devicePixelRatio;for(var d in a){console.log(d%2);for(var e in a[d])this.drawBlock(c,d,e,a[d][e])}this.canvas.context.drawImage(b,0,0,b.width/window.devicePixelRatio,b.height/window.devicePixelRatio),this.canvas.context.drawImage(b,0,0,b.width/window.devicePixelRatio,b.height/window.devicePixelRatio)},a.prototype.drawBlock=function(a,b,c,d){var e=this.map.grid;c=e*c+b%2*(e/2),b=e*(b/2),a.strokeStyle=this.color[d],a.fillStyle=this.color[d],a.beginPath(),a.moveTo(c+e/2,b-e/2),a.lineTo(c+e,b),a.lineTo(c+e/2,b+e/2),a.lineTo(c,b),a.lineTo(c+e/2,b-e/2),a.closePath(),a.fill(),a.fillStyle=this.shadeColor(this.color[d],-.2),a.beginPath(),a.moveTo(c,b),a.lineTo(c+e/2,b+e/2),a.lineTo(c+e/2,b+e),a.lineTo(c,b+e/2),a.lineTo(c,b),a.closePath(),a.fill(),a.fillStyle=this.shadeColor(this.color[d],-.4),a.beginPath(),a.moveTo(c+e/2,b+e/2),a.lineTo(c+e/2,b+e),a.lineTo(c+e,b+e/2),a.lineTo(c+e,b),a.lineTo(c+e/2,b+e/2),a.closePath(),a.fill()},a.prototype.shadeColor=function(a,b){var c=parseInt(a.slice(1),16),d=0>b?0:255,e=0>b?-1*b:b,f=c>>16,g=c>>8&255,h=255&c;return"#"+(16777216+65536*(Math.round((d-f)*e)+f)+256*(Math.round((d-g)*e)+g)+(Math.round((d-h)*e)+h)).toString(16).slice(1)},window.Render=a}();