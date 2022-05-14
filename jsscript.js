let windowObjectReference;
let windowFeatures = "popup";

//async 
function openRequestedPopup() {
  //windowObjectReference = window.open("http://www.mozilla.org/", "mozillaWindow", windowFeatures);
  //element.fullscreen();

let addr = new URL("https://example.com/login?user=someguy&page=news");
try {
  loginUser(addr.searchParams.get("user"));
  gotoPage(addr.searchParams.get("page"));
} catch(err) {
  showErrorMessage(err);
}

  //await window.goto('https://www.youtube.com/');
}
openRequestedPopup();
//works