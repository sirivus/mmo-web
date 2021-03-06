//blue two line

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth -20, window.innerHeight);
//
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  500
);
camera.position.set(0, 0, 100);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );

const points = [];
points.push(new THREE.Vector3(-10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);

async function redirect(a) {
  let result;
 
  if (a > 0) {
    result = "positive";
    window.location = await "game2.html";
  } else {
    result = "NOT positive";
  }
  return result;
}
redirect( 0 );
