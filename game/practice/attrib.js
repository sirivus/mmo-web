function gl(){
    return {
        createBuffer: function(){
            return {
                bindBuffer: function(){
                    return {
                        bufferData: function(){
                            return {
                                bindBuffer: function(){
                                    return {
                                        vertexAttribPointer: vertexAttribPointer
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

function vertexAttribPointer(dumb, dum){
    //console.log(dumb, dum);
    gl.vertexAttribPointer= 123;
    return gl.vertexAttribPointer;
}
gl.vertexAttribPointer = vertexAttribPointer

console.log(gl.vertexAttribPointer('123'));
function asd()
// a function with a nest function

//gl.vertexAttribPointer(
//  positionAttributeLocation,
//  size,
//  type,
//  normalize,
//  stride,
//  offset
//);


