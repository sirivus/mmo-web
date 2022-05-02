var express = require('express'),
app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server);

server.listen(3000);

app.use(express.static('./'));

app.get('/',function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection',function(socket){
  console.log('SOMEONE CONNECTED:', socket.id);

  socket.on('send', function(data){
    console.log(data);
    io.sockets.emit('new', data);
  });
});