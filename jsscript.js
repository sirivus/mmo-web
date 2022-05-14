let windowObjectReference;
let windowFeatures = "popup";

function openRequestedPopup() {
  windowObjectReference = window.open("http://www.mozilla.org/", "mozillaWindow", windowFeatures);
  
}
openRequestedPopup();
//works