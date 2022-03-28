import _ from "lodash";
import Print from "./print.js";
import { cube } from "./math.js";

function component() {
  //const element = document.createElement("div");
  const element = document.createElement("pre");
  const btn = document.createElement("button");

  element.innerHTML = _.join(["Hello", "webpack"], " ");
  element.onclick = Print.bind(null, "Hello webpack!");
     element.innerHTML = [
       "Hello webpack!",

       "5 cubed is equal to " + cube(5),
     ].join("\n\n");

  btn.innerHTML = "Click me and check the console!";
  btn.onclick = Print;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());
