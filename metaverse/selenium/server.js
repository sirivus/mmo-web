var http = require('http');
var fs = require('fs');

//location.port = port
//const PORT = location.port || 8080; 
let port = window.location.port;
//let port = location.port;

fs.readFile('./index.html', function (err, html) {

    if (err) throw err;    

    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(PORT);
});