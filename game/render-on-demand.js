import * as THREE from "three";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";

function main() {
  const canvas = document.querySelector("#c");
  const renderer = new THREE.WebGLRenderer({ canvas });

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 5;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 2;

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 0, 0);
  controls.update();

  const scene = new THREE.Scene();

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    scene.add(light);
  }

  const boxWidth = 1;
  const boxHeight = 1;
  const boxDepth = 1;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  function makeInstance(geometry, color, x) {
    const material = new THREE.MeshPhongMaterial({ color });

    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;

    return cube;
  }

  makeInstance(geometry, 0x44aa88, 0);
  makeInstance(geometry, 0x8844aa, -2);
  makeInstance(geometry, 0xaa8844, 2);

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    renderer.render(scene, camera);
  }
  render();

  //const _changeEvent = { type: 'change' };
  //const ??? = { type: 'resize' };
  //window.addEventListener('resize', reportWindowSize);
  //<p>Resize the browser window to fire the <code>resize</code> event.</p>
  //<p>Window height: <span id="height"></span></p>
  //<p>Window width: <span id="width"></span></p>
  controls.addEventListener("change", render);
  window.addEventListener("resize", render);

  // note: this is a workaround for an OrbitControls issue
  // in an iframe. Will remove once the issue is fixed in
  // three.js
  window.addEventListener("mousedown", (e) => {
    e.preventDefault();
    window.focus();
  });
  window.addEventListener("keydown", (e) => {
    e.preventDefault();
  });
}

main();
