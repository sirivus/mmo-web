
    var elem = document.documentElement;
    function openFullscreen() {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) { /* Safari */
            elem.webkitRequestFullscreen();
            elem.webkitEnterFullscreen(); // add
            document.webkitEnterFullscreen(); // add
        } else if (elem.msRequestFullscreen) { /* IE11 */
            elem.msRequestFullscreen();
        }
    }

    function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
            elem.webkitExitFullscreen(); //add
            document.webkitExitFullscreen(); //add
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
    }

document.querySelector("div.lightbox").addEventListener("keydown", function (e) {
    var charCode = e.charCode || e.keyCode || e.which;
    if (charCode == 27) {
      alert("Escape is not suppressed for lightbox!");
      return e.preventDefault;
    }
  });