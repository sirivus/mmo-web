 
  document.getElementById("demo").click(()=>{
    toggleFullScreen();
  });

 
 export function toggleFullScreen() {

    if (!document.fullscreenElement) {
        document.requestFullscreen = document.requestFullscreen || document.mozRequestFullScreen || document.webkitRequestFullscreen;
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen = document.exitFullscreen || document.mozexitFullScreen || document.webkitexitFullscreen;
      }
    }
  };

//export toggleFullScreen;

  /*
  document.addEventListener("keydown", function(e) {
    if (e.keyCode == 'a') {
      toggleFullScreen();
    }
  }, false);

  mozFullScreen = document.mozFullScreen;
document.requestFullscreen = document.requestFullscreen || document.mozRequestFullScreen || document.webkitRequestFullscreen;
*/