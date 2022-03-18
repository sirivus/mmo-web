var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
 (window.innerWidth - _winmargin )/ window.innerHeight,
  0.1,
  1000
);

var renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setSize(window.innerWidth - _winmargin, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(20, 20, 20);
var material = new THREE.MeshLambertMaterial({ color: 0xfd59d7 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 100;

var light = new THREE.PointLight(0xffff00);
light.position.set(10, 0, 25);
scene.add(light);

let clock = new THREE.Clock();
let delta = 0;
// _fps = 30
let interval = 1 / _fps;

function update() {
  var render = function () {
    requestAnimationFrame(render);
    delta += clock.getDelta();
    cube.rotation.x += .06;
    cube.rotation.y += .06;
    camera.updateProjectionMatrix();
    if (delta > interval) {
      // The draw or time dependent code are here
      renderer.render(scene, camera);
      delta = delta % interval;
    }
  };
  render();
}
update();

// dat gui
var gui = new dat.GUI();
var cameraGui = gui.addFolder("camera position");
cameraGui.add(camera.position, "x");
cameraGui.add(camera.position, "y");
cameraGui.add(camera.position, "z");
cameraGui.open();

var cameraGui = gui.addFolder("camera projection");
cameraGui.add(camera, "fov");
cameraGui.open();

var lightGui = gui.addFolder("light position");
lightGui.add(light.position, "x");
lightGui.add(light.position, "y");
lightGui.add(light.position, "z");
lightGui.open();

var cubeGui = gui.addFolder("cube position");
cubeGui.add(cube.position, "x");
cubeGui.add(cube.position, "y");
cubeGui.add(cube.position, "z");
cubeGui.open();
