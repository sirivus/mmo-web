function countto10(){
    var i = 0;
    while(i < 10){
        i++;
            console.log(i);
    }

}countto10();


//count to 50
function countto50(){
    var i = 0;
    while(i < 50){
        i++;
            console.log(i);
    }

}countto50();

//draw a cube
function drawCube(){
    var i = 0;
    while(i < 10){
        i++;
            console.log("*");
    }

}   drawCube();             

//  function addLight(...pos) {
//    const color = 0xffffff;
//    const intensity = 1;
//    const light = new THREE.DirectionalLight(color, intensity);
//    light.position.set(...pos);
//    scene.add(light);
//  }
//  addLight(-1, 2, 4);
//  addLight(2, -2, 3);
//
//    function addGround() {
//    const color = 0xffffff;
//    const intensity = 1;
//    const light = new THREE.DirectionalLight(color, intensity);
//    light.position.set(0, -1, 0);
//    scene.add(light);
//  } addGround();        //add a ground  //add a ground      //add a ground
  

  function asd () {
      x = 15;
      y: 5
      function aok () {
          q = 9;
      }
      //return 5
  }
    asd();
    //asd;

    //if use var declare inside function, is private scope. there is publc scope.

  console.log(x);

        // use the world matrix of the position helper to
      // position this mesh.
      positionHelper.updateWorldMatrix(true, false);
      mesh.applyMatrix4(positionHelper.matrixWorld);