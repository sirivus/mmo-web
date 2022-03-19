var BG_COLOR = 0x000000;

var mycanvas;
var stage, renderer;
var stageWidth, stageHeight;

var spriteContainer;

var blob_texture, blob;
var blobArray = [];

var current_x_1, current_y_1;
var current_x_2, current_y_2;

var probability = 0;
var randomSpawnNumber = 0;

var marker_1, marker_2;

var bg, bg_texture;

var toucher_texture;

var tween_1, tween_2;

var twistFilter;

var arrow1, arrow2, arrow3, arrow4;
var arrow_tex;

//Initialize function
var init = function () {
   
    console.log("init() called");
    
    var assetsToLoad = ["images/arrow.png", "images/blob.png", "images/bg_landscape.png", "images/toucher.png"]; 
	
    // CREATE A NEW ASSET LOADER
	   loader = new PIXI.AssetLoader(assetsToLoad);
	// USE CALLBACK
	   loader.onComplete = onAssetsLoaded.bind(this);
	// BEGIN LOADING THE ASSETS
	   loader.load();
    
   function onAssetsLoaded() {
	   
	   console.log("ASSETS LOADED!");
	   
    // FETCH THE CANVAS ELEMENT 
	   mycanvas = document.getElementById("myCanvas");
    
    // SET THE STAGE WIDTH AND HEIGHT
	   stageWidth = window.innerWidth;
	   stageHeight = window.innerHeight;
	   
	// SET THE STARTING BEZIER THROUGH POINTS   
	   current_x_1 = Math.round(stageWidth/3);
	   current_y_1 = Math.round(stageHeight/2);
	   
	   current_x_2 = 2*Math.round(stageWidth/3);
	   current_y_2 = current_y_1;
    
    // CREATE A NEW PIXI.JS STAGE AND SET THE AUTOMATIC RENDERER DETECTION (WEBGL OR CANVAS)
	   stage = new PIXI.Stage(BG_COLOR);
	   renderer = PIXI.autoDetectRenderer(stageWidth, stageHeight, mycanvas);
	   
	   bg_texture = PIXI.Texture.fromImage("images/bg_landscape.png");
	   bg = new PIXI.Sprite(bg_texture);
	   
	   stage.addChild(bg);
	   
		   spriteContainer = new PIXI.DisplayObjectContainer();
		   
		   spriteContainer.x = 0;
		   spriteContainer.y = 0;
	   
	   stage.addChild(spriteContainer);
	   
	// BLUR THE CONTAINER WITH THE BLOBS!
	      
	   var blurFilter = new PIXI.BlurFilter();
	   
	   	   blurFilter.blurX = 50;
	       blurFilter.blurY = 50;
	       
	       spriteContainer.filters = [blurFilter];
	 
	   blob_texture = PIXI.Texture.fromImage("images/blob.png");
	   toucher_texture = PIXI.Texture.fromImage("images/toucher.png");
	   
	// *** SETUP THE ARROWS ***	   
	   
		   arrow_tex = PIXI.Texture.fromImage("images/arrow.png");
		   
		   arrow1 = new PIXI.Sprite(arrow_tex);
		   arrow2 = new PIXI.Sprite(arrow_tex);
		   arrow3 = new PIXI.Sprite(arrow_tex);
		   arrow4 = new PIXI.Sprite(arrow_tex);
		   
		   arrow1.anchor.x = 0.5;
		   arrow1.anchor.y = 1;
		   
		   arrow1.rotation = deg2rad(180);
		   
		   arrow2.anchor.x = 0.5;
		   arrow2.anchor.y = 1;
		   
		   arrow2.rotation = deg2rad(180);
		   
		   arrow3.anchor.x = 0.5;
		   arrow3.anchor.y = 1;
		   
		   arrow4.anchor.x = 0.5;
		   arrow4.anchor.y = 1;
		   
		   arrow1.x = 0;
		   arrow1.y = 0;
		   
		   arrow2.x = stageWidth;
		   arrow2.y = 0;
		   
		   arrow3.x = 0;
		   arrow3.y = stageHeight;
		   
		   arrow4.x = stageWidth;
		   arrow4.y = stageHeight;
		   
		   arrow1.alpha = arrow2.alpha = arrow3.alpha = arrow4.alpha = 0.5; 
			   
		   stage.addChild(arrow1);
		   stage.addChild(arrow2);
		   stage.addChild(arrow3);
		   stage.addChild(arrow4);
	   
    // *** SETUP THE MARKERS ***	   
		   
		   marker_1 = new PIXI.Sprite(toucher_texture);
		   marker_2 = new PIXI.Sprite(toucher_texture);
		   
		   marker_1.anchor.x = 0.5;
		   marker_1.anchor.y = 0.5;
		   
		   marker_2.anchor.x = 0.5;
		   marker_2.anchor.y = 0.5;
		   
		   stage.addChild(marker_1);
		   stage.addChild(marker_2);
		   
    // *************** APPLY THE TWIST FILTER TO THE BACKGROUND IMAGE **************** 
		   
		   twistFilter = new PIXI.TwistFilter();
		   bg.filters = [twistFilter];
   	   
	   //////////// USE STATS.JS FOR PERFORMANCE STATISTICS //////////////
	   
	   var stats = new Stats();
	   	   stats.setMode(0); // 0: fps, 1: ms
	
	    // Align to the top-left
		   stats.domElement.style.position = 'absolute';
		   stats.domElement.style.left = '0px';
		   stats.domElement.style.top = '0px';
		   
	    document.body.appendChild( stats.domElement );
	    
	    // ///////////////////////////////////////////////////////////
		   
	    marker_1.setInteractive(true);
	    marker_2.setInteractive(true);
	   
	    // ************ SETUP EVENT CONTROL FOR MARKER 1 ************
		
		    marker_1.mousedown = marker_1.touchstart = function(data)
			{
		
				this.data = data;
				this.alpha = 0.9;
				this.dragging = true;
				
			};
			
			marker_1.mouseup = marker_1.mouseupoutside = marker_1.touchend = marker_1.touchendoutside = function(data)
			{
				
				this.alpha = 1
				this.dragging = false;
				this.data = null;
			
				TweenMax.to(arrow1, 1, {x: marker_1.x, ease:Bounce.easeOut});
				TweenMax.to(arrow3, 1, {x: marker_1.x, ease:Bounce.easeOut});
				
			};
			
			marker_1.mousemove = marker_1.touchmove = function(data)
			{
				if(this.dragging)
				{
				
					var newPosition = this.data.getLocalPosition(this.parent);
					this.position.x = newPosition.x;
					this.position.y = newPosition.y;
					
					current_x_1 = this.position.x;
					current_y_1 = this.position.y;
				
				}
			};
		
		// ************ SETUP EVENT CONTROL FOR MARKER 2 ************
			
			marker_2.mousedown = marker_2.touchstart = function(data)
			{
			
					this.data = data;
					this.alpha = 0.9;
					this.dragging = true;
					
			};
				
			marker_2.mouseup = marker_2.mouseupoutside = marker_2.touchend = marker_2.touchendoutside = function(data)
			{
				this.alpha = 1
				this.dragging = false;
				this.data = null;
				
				TweenMax.to(arrow2, 1, {x: marker_2.x, ease:Bounce.easeOut});
				TweenMax.to(arrow4, 1, {x: marker_2.x, ease:Bounce.easeOut});
				
			};
			
			marker_2.mousemove = marker_2.touchmove = function(data)
			{
				if(this.dragging)
				{
					
					var newPosition = this.data.getLocalPosition(this.parent);
						this.position.x = newPosition.x;
						this.position.y = newPosition.y;
						
						current_x_2 = this.position.x;
						current_y_2 = this.position.y;
				
				}
			};
		   
	   ////////////////// BEGIN RENDERING ///////////////////
	
	   draw();
	   
	   function draw() { 
		  stats.begin();
		  
		  marker_1.x = current_x_1;
		  marker_1.y = current_y_1;
		  
		  marker_2.x = current_x_2;
		  marker_2.y = current_y_2;
		   
		  randomSpawnNumber = Math.round(Math.random()*probability);		  
		  
		  for (b=0; b < 4; b++) {
			  
			  var startY = Math.round(Math.random()*stageHeight);
			  var endY = Math.round(Math.random()*stageHeight);
			  
					   blob = new PIXI.Sprite(blob_texture);
					   
					   blob.anchor.x = 0.5;
					   blob.anchor.y = 0.5;
					   
					   blob.scale.x = 0.5;
					   blob.scale.y = 0.5;
					 
					   blob.position.y = startY;
					   blob.position.x = -blob.height;
					   
					   blob.blendMode = PIXI.blendModes.ADD
					   
					   blobArray.push(blob);
					   
					   spriteContainer.addChild(blob);
				   
				   if (current_x_1 != null && current_y_1 != null && current_x_2 != null && current_y_2 != null) {
					   
					   if (marker_1.x < marker_2.x) {

						   tween_1 = new TweenMax(blob, 0.7, {tint: 0xFF0000, orientToBezier:true, onComplete:kill, onCompleteParams:[blob],ease:Sine.easeInOut, bezier:{values:[{x:marker_1.x,y:marker_1.y},{x:marker_2.x,y:marker_2.y},{x:stageWidth + blob.height, y:endY}]}});
					   
					   }
					   else if (marker_1.x > marker_2.x) {

						   tween_2 = new TweenMax(blob, 0.7, {tint: 0xFF0000, orientToBezier:true, onComplete:kill, onCompleteParams:[blob],ease:Sine.easeInOut, bezier:{values:[{x:marker_2.x,y:marker_2.y},{x:marker_1.x,y:marker_1.y},{x:stageWidth + blob.height, y:endY}]}});
					   
					   }
				   }
				   
		  }

		  function kill(item) {
					   
			  if (spriteContainer != null) {
				  spriteContainer.removeChild(item);

				  if (blobArray.indexOf(item) != null) {
					  blobArray.splice(blobArray.indexOf(item), 1);
					 }
				  }
				    
			  }
			
		  	// ******** TWIST FILTER DEFORMATIONS *******
		  
					twistFilter.angle = angleBetweenPoints(marker_1.x, marker_1.y, marker_2.x, marker_2.y) * 0.03;
				
				var distanceToFilterRadius = (distanceBetweenPoints(marker_1.x, marker_1.y, marker_2.x, marker_2.y)/65)/10;
				
					twistFilter.radius = distanceToFilterRadius;
					
				var midPoint = midPointBetweenPoints(marker_1.x, marker_1.y, marker_2.x, marker_2.y);
					
				var offX = midPoint.x / stageWidth;
				var offY = midPoint.y / stageHeight;
				
					twistFilter.offset.x = offX;
					twistFilter.offset.y = 1 - offY;
				
			// ******************************************
				   
			    renderer.render(stage); 
		        requestAnimationFrame(draw); 
	      
	      stats.end();
	      
	   }
	   
   }
    
   // *********** HELPER FUNCTIONS *************
   
	   // Math.atan2() to calculate angle between 2 points
	   function angleBetweenPoints(x1, y1, x2, y2)
	   {
	       return Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
	   }
	
	   // distanceBetweenPoints
	   function distanceBetweenPoints(x1, y1, x2, y2)
	   {
		   
		   var xs = 0;
		   var ys = 0;
		    
		   xs = x2 - x1;
		   xs = xs * xs;
		    
		   ys = y2 - y1;
		   ys = ys * ys;
		    
		   return Math.sqrt( xs + ys );
		
	   }
	   
	   //Mid point between points
	   function midPointBetweenPoints(x1, y1, x2, y2) {
		   
		   var midX = (x1 + x2) / 2
		   var midY = (y1 + y2) / 2
		   
		   var rObj = new Object();
		   	   rObj.x = midX;
		   	   rObj.y = midY;
		   	   
		   	   return rObj;
		   
	   }
	   
	   // deg2rad
	   function deg2rad(angle) {
		   return (angle / 180) * Math.PI;
	   }
	   
	   // ******************************************
	  
	    // add eventListener for tizenhwkey
	    document.addEventListener('tizenhwkey', function(e) {
	        if(e.keyName == "back")
	            tizen.application.getCurrentApplication().exit();
	    });
	    
	};

// window.onload can work without <body onload="">
window.onload = init;