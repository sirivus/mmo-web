var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(
  75,
  (window.innerWidth - _winmargin) / window.innerHeight,
  0.1,
  1e3
);
var renderer = new THREE.WebGLRenderer();
document.body.appendChild(renderer.domElement);
var geometry = new THREE.BoxGeometry(20, 20, 20);
var material = new THREE.MeshLambertMaterial({ color: 16603607 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 100;
var light = new THREE.PointLight(16776960);
light.position.set(10, 0, 25);
scene.add(light);
let clock = new THREE.Clock();
let delta = 0;
function update() {
  var e = function () {
    requestAnimationFrame(e);
    renderer.setSize(window.innerWidth - _winmargin, window.innerHeight);
    cube.rotation.x += 0.06;
    cube.rotation.y += 0.06;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  };
  e();
}
update();
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
