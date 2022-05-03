{
    let age = 25
    console.log(age)
}
console.log(age)

/*
lhlh@lhs-MacBook-Pro example1 % node deadzone.js
25
/Users/lhlh/mmo-web/metaverse/browserify/main-py/socketio/example1/deadzone.js:5
console.log(age)
            ^

ReferenceError: age is not defined
    at Object.<anonymous> (/Users/lhlh/mmo-web/metaverse/browserify/main-py/socketio/example1/deadzone.js:5:13)
    at Module._compile (node:internal/modules/cjs/loader:1103:14)
    at Object.Module._extensions..js (node:internal/modules/cjs/loader:1157:10)
    at Module.load (node:internal/modules/cjs/loader:981:32)
    at Function.Module._load (node:internal/modules/cjs/loader:822:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:77:12)
    at node:internal/main/run_main_module:17:47
lhlh@lhs-MacBook-Pro example1 % 
*/