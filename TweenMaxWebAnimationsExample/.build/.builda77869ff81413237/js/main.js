var logo;
var mainText;
var body;
var bgImage;
var restart;

var screenWidth, screenHeight;

var timeline;

	screenWidth = window.innerWidth;
	screenHeight = window.innerHeight;

//Initialize function
var init = function () {
    // TODO:: Do your initialization job

	// assign the DOM objects to the variables
	
	body = document.body;
    logo = document.getElementById("imagelogo");
    mainText = document.getElementById("maintext");
    restart = document.getElementById("restartClip");
    bgImage = document.getElementById("bg");
    
    timeline = new TimelineMax(); // Create a new TimelineMax object
    
    // next append TweenMax animations to play one after another using TimelineMax and the DOM objects
    
	    timeline.append(new TweenMax(mainText, 0.75, {css:{opacity:"1"}, ease:Quad.easeIn}));
	    timeline.append(new TweenMax(mainText, 1, {css:{left:screenWidth/2 - mainText.offsetWidth/2 + "px"}, ease:Elastic.easeInOut }));
	    timeline.append(new TweenMax(mainText, 0.75, {delay: 0.4, css:{top:screenHeight/2 - mainText.offsetHeight/2 + "px"}, ease:Bounce.easeOut}));
	    timeline.append(new TweenMax(mainText, 0.75, {delay: 1, css:{color:"#ffffff"}, ease:Sine.easeOut}));
	    
	    timeline.append(new TweenMax(body, 0.75, {css:{backgroundColor:"#000000"}, ease:Sine.easeOut}),-0.75);
	    
	    timeline.append(new TweenMax(logo, 0.25, {css:{scale: 2, rotation:360, opacity:1}, ease:Sine.easeInOut}));
	    timeline.append(new TweenMax(logo, 0.5, {css:{scale: 1, rotation:0}, ease:Sine.easeInOut}));
	    
	    timeline.append(new TweenMax(bgImage, 0.5, {delay:0.5, clip:"rect(0px 100px 100px 0px)", ease:Sine.easeOut}));
	    timeline.append(new TweenMax(bgImage, 0.75, {delay:1, clip:"rect(0px 600px 100px 0px)", ease:Sine.easeOut}));
	    timeline.append(new TweenMax(bgImage, 0.75, {delay:0.75, clip:"rect(540px 600px 640px 0px)", ease:Bounce.easeOut}));
	    timeline.append(new TweenMax(bgImage, 0.75, {delay:1, css:{opacity:"0.5"}, ease: Sine.easeOut}));
	    timeline.append(new TweenMax(bgImage, 0.75, {delay:1, clip:"rect(0px 600px 640px 0px)",  ease:Bounce.easeOut}), -1.75);
	    
	    timeline.append(new TweenMax(restart, 0.75, {delay:0.75, clip:"rect(0px 600px 640px 0px)", ease:Sine.easeOut}));
	    
	    timeline.append(new TweenMax.to(mainText, 0.5, {css:{scale:1.2}, repeat:-1, yoyo:true}));
	    
	// add a listener to the restart image to restart the animation
	    restart.onclick = restart.ontap = function() {
			timeline.restart();
		}
	
    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });
    
};
// window.onload can work without <body onload="">
window.onload = init;